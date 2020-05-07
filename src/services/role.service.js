import ApiService from '@/services/api.service'
const resource = '/roles'

const roleService = {
  read: async function (params) {
    try {
      const response = await ApiService.get(resource, { params })

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default roleService
