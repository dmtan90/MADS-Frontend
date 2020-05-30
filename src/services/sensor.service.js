import ApiService from '@/services/api.service'

const resource = '/sensors'

const sensorService = {
  create: async function (config, payload) {
    try {
      const response = await ApiService.post(resource + '?device_id=' + config.device_id + '&sensor_type_id=' + config.sensor_type_id, payload)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  read: async function (config) {
    try {
      const response = await ApiService.get('/orgs/' + config.orgId + '/projects/' + config.id + resource)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  update: async function (id, payload) {
    try {
      const response = await ApiService.put(resource + '/' + id, payload)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  delete: async function (id) {
    try {
      const response = await ApiService.delete(resource + '/' + id)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  readId: async function (id) {
    try {
      const response = await ApiService.get(resource + '/' + id)

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default sensorService
