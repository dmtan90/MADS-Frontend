import ApiService from '@/services/api.service'

const resource = '/policy'

const policyService = {
  read: async function (config) {
    try {
      const response = await ApiService.get('/orgs/' + config.orgId + resource)

      return response.data
    } catch (error) {
      return error.data
    }
  }
}

export default policyService
