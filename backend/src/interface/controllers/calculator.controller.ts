import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { CurrentUser } from '../decorators/current-user.decorator'
import { PrismaService } from '../../infrastructure/database/prisma.service'

@Controller('calculator')
export class CalculatorController {
  constructor(private prisma: PrismaService) {}

  @Get('resources')
  async getResources() {
    return this.prisma.resource.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    })
  }

  @Get('processes')
  async getProcesses() {
    return this.prisma.process.findMany({
      include: {
        resources: {
          include: { resource: true }
        }
      },
      orderBy: [{ category: 'asc' }, { name: 'asc' }]
    })
  }

  @Get('processes/:id')
  async getProcess(@Param('id') id: string) {
    return this.prisma.process.findUnique({
      where: { id },
      include: {
        resources: {
          include: { resource: true }
        }
      }
    })
  }

  @Get('inventory')
  @UseGuards(JwtAuthGuard)
  async getInventory(@CurrentUser() user: any) {
    return this.prisma.playerInventory.findMany({
      where: { userId: user.id },
      include: { resource: true }
    })
  }

  @Patch('inventory')
  @UseGuards(JwtAuthGuard)
  async updateInventory(
    @CurrentUser() user: any,
    @Body() body: { resourceId: string; quantity: number }
  ) {
    return this.prisma.playerInventory.upsert({
      where: { userId_resourceId: { userId: user.id, resourceId: body.resourceId } },
      update: { quantity: body.quantity },
      create: { userId: user.id, resourceId: body.resourceId, quantity: body.quantity }
    })
  }
}
