import ApiService from '@/services/api.service'
const resource = '/orgs'

const organizationService = {
  read: async function (config) {
    try {
      const response = await ApiService.get(resource + '/' + config.orgId, {})

      return response.data
    } catch (error) {
      return error.data
    }
  },
  readApps: async function (config) {
    try {
      const response = await ApiService.get(resource + '/' + config.orgId + '/apps')

      return response.data
    } catch (error) {
      return error.data
    }
  },
  readEntities: async function (config) {
    try {
      const response = await ApiService.get(resource + '/' + config.orgId + '/entities')

      return response.data
    } catch (error) {
      return error.data
    }
  },
  readCommandWidgets: async function (config) {
    try {
      const response = await ApiService.get(resource + '/' + config.orgId + '/command_widget_types')

      return response.data
    } catch (error) {
      return error.data
    }
  }
}

export default organizationService
