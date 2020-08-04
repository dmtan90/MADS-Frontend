import ApiService from '@/services/api.service'

const resource = '/tl-mgmt/employee'

const employeeService = {
  create: async function (payload) {
    try {
      const response = await ApiService.post(resource, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  read: async function (params) {
    try {
      const response = await ApiService.get(resource, { params })

      return response.data
    } catch (error) {
      return error.data
    }
  },
  update: async function (id, payload) {
    try {
      const response = await ApiService.put(resource + '/' + id, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  delete: async function (id) {
    try {
      const response = await ApiService.delete(resource + '/' + id)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  readId: async function (id) {
    try {
      const response = await ApiService.get(resource + '/' + id)

      return response.data
    } catch (error) {
      return error.data
    }
  }
}

export default employeeService
