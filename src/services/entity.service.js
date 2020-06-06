import ApiService from '@/services/api.service'

const resource = '/entities'

const entityService = {
  create: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + '/projects/' + config.projectId + resource, payload)

      return response.data
    } catch (error) {
      console.log(error)
      return error.response.data
    }
  },
  read: async function (config) {
    try {
      const response = await ApiService.get('/orgs/' + config.orgId + '/projects/' + config.projectId + resource)

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default entityService
