import ApiService from '@/services/api.service'

const resource = '/policies'

const policyService = {
  read: async function (params) {
    try {
      const response = await ApiService.get(resource, { params })

      return response.data
    } catch (error) {
      if (error.errors.error.message === 'Unauthorized') {
      }
    }
  }
}

export default policyService
