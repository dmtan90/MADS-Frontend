import ApiService from '@/services/api.service'

const resource = '/dashboards'

const sensorService = {
  create: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + resource, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  read: async function (config) {
    try {
      const response = await ApiService.get('/orgs/' + config.orgId + resource)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  update: async function (config, payload) {
    try {
      const response = await ApiService.put('/orgs/' + config.orgId + resource + '/' + config.id, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  delete: async function (config) {
    try {
      const response = await ApiService.delete('/orgs/' + config.orgId + resource + '/' + config.id)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  readId: async function (config) {
    try {
      const response = await ApiService.get('/orgs/' + config.orgId + resource + '/' + config.id)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  createWidgetInstance: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + resource + '/' + config.dashboardId + '/widgets/' + config.widgetId + '/widget_instances', payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  updateWidgetInstance: async function (config, payload) {
    try {
      const response = await ApiService.put('/orgs/' + config.orgId + resource + '/' + config.dashboardId + '/widgets/' + config.widgetId + '/widget_instances/' + config.id, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  deleteWidgetInstance: async function (config) {
    try {
      const response = await ApiService.delete('/orgs/' + config.orgId + resource + '/' + config.dashboardId + '/widgets/' + config.widgetId + '/widget_instances/' + config.id)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  createCommandWidget: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + resource + '/' + config.dashboardId + '/command_widgets', payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  updateCommandWidget: async function (config, payload) {
    try {
      const response = await ApiService.put('/orgs/' + config.orgId + resource + '/' + config.dashboardId + '/command_widgets/' + config.id, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  deleteCommandWidget: async function (config) {
    try {
      const response = await ApiService.delete('/orgs/' + config.orgId + resource + '/' + config.dashboardId + '/command_widgets/' + config.id)

      return response.data
    } catch (error) {
      return error.data
    }
  }
}

export default sensorService
