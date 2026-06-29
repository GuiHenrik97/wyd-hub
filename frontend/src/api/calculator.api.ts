import { api } from './client'

export const calculatorApi = {
  getProcesses: () => api.get('/calculator/processes'),
  getProcess: (id: string) => api.get(`/calculator/processes/${id}`),
  getResources: () => api.get('/calculator/resources'),
  getInventory: () => api.get('/calculator/inventory'),
  updateInventory: (resourceId: string, quantity: number) =>
    api.patch('/calculator/inventory', { resourceId, quantity }),
}
