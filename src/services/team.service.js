import ApiService from '@/services/api.service'

const resource = '/teams'

const teamService = {
  create: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + resource, payload)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  read: async function (config, params) {
    try {
      const response = await ApiService.get('/orgs/' + config.orgId + resource, { params })

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  search: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + resource + '/search?label=' + payload)

      return response.data
    } catch (error) {
      return error.resource.data
    }
  }
  // update: async function (id, payload) {
  //   try {
  //     const response = await ApiService.put(resource + '/' + id, payload)

  //     return response.data
  //   } catch (error) {
  //     return error.response.data
  //   }
  // },
  // delete: async function (id) {
  //   try {
  //     const response = await ApiService.delete(resource + '/' + id)

  //     return response.data
  //   } catch (error) {
  //     return error.response.data
  //   }
  // },
  // readId: async function (id) {
  //   try {
  //     const response = await ApiService.get(resource + '/' + id)

  //     return response.data
  //   } catch (error) {
  //     return error.response.data
  //   }
  // }
}

export default teamService
