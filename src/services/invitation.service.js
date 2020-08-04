import ApiService from '@/services/api.service'
const resource = '/invitations'

const invitationService = {
  create: async function (payload) {
    try {
      const response = await ApiService.post('/orgs/1' + resource, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  read: async function (config, params) {
    try {
      const response = await ApiService.get('/orgs/' + config.orgId + resource, params)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  delete: async function (config) {
    try {
      const response = await ApiService.delete('/orgs/' + config.orgId + resource + '/' + config.invitationId)

      return response.data
    } catch (error) {
      return error.data
    }
  }
}

export default invitationService
