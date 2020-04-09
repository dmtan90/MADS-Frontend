import ApiService from '@/services/api.service'
const resource = '/user_widgets'

const userWidgetService = {
  read: async function (config, params) {
    try {
      const response = await ApiService.get(resource + '?user_id=' + config.userId, { params })

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  create: async function (config) {
    try {
      const response = await ApiService.post(resource + '?user_id=' + config.userId + '&widget_id=' + config.widgetId)

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default userWidgetService
