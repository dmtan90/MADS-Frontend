import ApiService from '@/services/api.service'

const resource = '/sensor_notification'

const notificationService = {
  create: async function (payload) {
    try {
      const response = await ApiService.post(resource, payload)

      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  read: async function (params) {
    try {
      const response = await ApiService.get(resource, { params })

      return response.data
    } catch (error) {
      console.log(error)
      if (error.errors.error.message === 'Unauthorized') {
        console.log('unauthorised')
      }
    }
  },
  update: async function (id, payload) {
    try {
      const response = await ApiService.put(resource + '/' + id, payload)

      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  delete: async function (id) {
    try {
      const response = await ApiService.delete(resource + '/' + id)

      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  readId: async function (id) {
    try {
      const response = await ApiService.get(resource + '/' + id)

      return response.data
    } catch (error) {
      console.log(error)
      if (error.errors.error.message === 'Unauthorized') {
        console.log('unauthorised')
      }
    }
  }
}

export default notificationService
