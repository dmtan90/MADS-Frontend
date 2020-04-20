import ApiService from '@/services/api.service'
const resource = '/widget'

const widgetService = {
  read: async function (params) {
    try {
      const response = await ApiService.get(resource, { params })

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
  search: async function (searchText) {
    try {
      const response = await ApiService.get('/search?label=' + searchText)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default widgetService
