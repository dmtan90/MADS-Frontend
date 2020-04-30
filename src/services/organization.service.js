import ApiService from '@/services/api.service'
const resource = '/orgs'

const organizationService = {
  read: async function (config) {
    try {
      const response = await ApiService.get(resource + '/' + 1, {})

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default organizationService
