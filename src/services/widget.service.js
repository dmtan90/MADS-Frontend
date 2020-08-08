import ApiService from '@/services/api.service'
const resource = '/widgets'

const widgetService = {
  read: async function (params) {
    try {
      const response = await ApiService.get(resource, { params })

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
  },
  search: async function (searchText) {
    try {
      const response = await ApiService.get('/widgets/search?label=' + searchText)
      return response.data
    } catch (error) {
      return error.data
    }
  },
  readFiltered: async function (params) {
    try {
      const response = await ApiService.get(resource + '/filtered', { params })

      return response.data
    } catch (error) {
      return error.data
    }
  },
}

export default widgetService
