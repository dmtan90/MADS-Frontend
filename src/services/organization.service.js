import ApiService from '@/services/api.service'
const resource = '/org'

const organizationService = {
  read: async function (config) {
    try {
      const response = await ApiService.get(resource + '/' + config.userId, {})

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default organizationService
