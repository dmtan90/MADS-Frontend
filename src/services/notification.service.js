import ApiService from '@/services/api.service'

const resource = '/sensor_notification'

const notificationService = {
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
      if (error.errors.error.message === 'Unauthorized') {
      }
    }
  },
  update: async function (id, payload) {
    try {
      const response = await ApiService.put(resource + '/' + id, payload)

      return response.data
    } catch (error) {
    }
  },
  delete: async function (id) {
    try {
      const response = await ApiService.delete(resource + '/' + id)

      return response.data
    } catch (error) {
    }
  },
  readId: async function (id) {
    try {
      const response = await ApiService.get(resource + '/' + id)

      return response.data
    } catch (error) {
      if (error.errors.error.message === 'Unauthorized') {
      }
    }
  }
}

export default notificationService
