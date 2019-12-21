import ApiService from '@/services/api.service'

const resource = '/sensor'

const sensorService = {
  create: async function (config, payload) {
    try {
      const response = await ApiService.post(resource + '?device_id=' + config.device_id + '&sensor_type_id=' + config.sensor_type_id, payload)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  read: async function (params) {
    try {
      const response = await ApiService.get(resource, { params })

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
  },
  getDeviceSensors: async function (id) {
    try {
      const response = await ApiService.get('/sensor-criteria/' + id)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default sensorService
