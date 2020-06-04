import ApiService from '@/services/api.service'

const resource = '/projects'

const projectService = {
  create: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + resource, payload)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  read: async function (config, params) {
    try {
      const response = await ApiService.get('/orgs/' + config.orgId + resource, { params })

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  update: async function (config, payload) {
    try {
      const response = await ApiService.put('/orgs/' + config.orgId + resource + '/' + config.id, payload)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  delete: async function (config) {
    try {
      const response = await ApiService.delete('/orgs/' + config.orgId + resource + '/' + config.id)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  readId: async function (config) {
    try {
      const response = await ApiService.get('/orgs/' + config.orgId + resource + '/' + config.id)

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default projectService
