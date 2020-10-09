import ApiService from '@/services/api.service'

const resource = '/tasks'

const taskService = {
  read: async function (config, params) {
    try {
      const response = await ApiService.get('/orgs/' + config.orgId + '/users/' + config.userId + resource, { params })

      return response.data
    } catch (error) {
      return error.data
    }
  },
  create: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + '/users/' + config.userId + resource, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  delete: async function (config) {
    try {
      const response = await ApiService.delete('/orgs/' + config.orgId + '/users/' + config.userId + resource + '/' + config.id)

      return response.data
    } catch (error) {
      return error.data
    }
  }
}

export default taskService
