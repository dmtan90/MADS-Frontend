import ApiService from '@/services/api.service'

const resource = '/tasks'

const taskService = {
  create: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + '/users/' + config.userId + resource, payload)

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default taskService
