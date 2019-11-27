import ApiService from '@/services/api.service'

const resource = '/device'

const deviceService = {
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
    }
  },
  update: async function (id) {
    try {
      const requestData = {
        'name': 'Feel1',
        'make': 'Hitachi',
        'visualizer': 'chart',
        'identifier': 'MP09SX',
        'value_keys': ['gx', 'gy', 'gz']
      }
      const response = await ApiService.put(resource + '/' + id, requestData)

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
  }
}

export default deviceService
