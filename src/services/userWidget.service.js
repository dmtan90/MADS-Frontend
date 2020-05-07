import ApiService from '@/services/api.service'

const userWidgetService = {
  read: async function (config, params) {
    try {
      const response = await ApiService.get(`/orgs/${config.orgId}/users/${config.userId}/widgets`, { params })

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  create: async function (config, params) {
    try {
      const response = await ApiService.post(`/orgs/${config.orgId}/users/${config.userId}/widgets`, params)

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default userWidgetService
