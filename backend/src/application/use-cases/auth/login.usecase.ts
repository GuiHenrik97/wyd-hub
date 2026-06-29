import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserRepositoryPort, USER_REPOSITORY } from '../../ports/user.repository.port'

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private userRepo: UserRepositoryPort,
    @Inject('BCRYPT_SERVICE') private bcrypt: any,
    private jwtService: JwtService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email)
    if (!user) throw new UnauthorizedException('Credenciais inválidas')

    const valid = await this.bcrypt.compare(password, user.passwordHash)
    if (!valid) throw new UnauthorizedException('Credenciais inválidas')

    const payload = { sub: user.id, email: user.email }

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' })
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    })

    await this.userRepo.updateRefreshToken(user.id, refreshToken)

    return { accessToken, refreshToken, userId: user.id, emailVerified: user.emailVerified ?? false }
  }
}
