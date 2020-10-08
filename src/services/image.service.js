import ApiService from '@/services/api.service'

const resource = '/uploads'

const imageService = {
  create: async function (payload) {
    try {
      const response = await ApiService.post(resource, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  }
}

export default imageService
