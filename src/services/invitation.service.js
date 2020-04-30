import ApiService from '@/services/api.service'
const resource = '/invitations'

const invitationService = {
  create: async function (payload) {
    try {
      const response = await ApiService.post('/orgs/1' + resource, payload)

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default invitationService
