import ApiService from '@/services/api.service'

const resource = '/dashboards'

const dashboardService = {
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
  export: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + '/export/' + config.id, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  createDashboardPanel: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + resource + '/' + config.dashboardId + '/panels', payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  updateDashboardPanel: async function (config, payload) {
    try {
      const response = await ApiService.put('/orgs/' + config.orgId + resource + '/' + config.dashboardId + '/panels/' + config.id, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  loadDashboardPanel: async function (config) {
    try {
      const response = await ApiService.get('/orgs/' + config.orgId + resource + '/' + config.dashboardId + '/panels/' + config.id)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  deleteDashboardPanel: async function (config, params) {
    let ids = JSON.stringify(params.ids)
    try {
      const response = await ApiService.delete('/orgs/' + config.orgId + resource + '/' + config.dashboardId + '/panels?ids=' + ids)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  createWidgetInstance: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + '/panels' + '/' + config.panelId + '/widgets/' + config.widgetId + '/widget_instances', payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  updateWidgetInstance: async function (config, payload) {
    try {
      const response = await ApiService.put('/orgs/' + config.orgId + '/panels' + '/' + config.panelId + '/widgets/' + config.widgetId + '/widget_instances/' + config.id, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  deleteWidgetInstance: async function (config) {
    try {
      const response = await ApiService.delete('/orgs/' + config.orgId + '/panels' + '/' + config.panelId + '/widgets/' + config.widgetId + '/widget_instances/' + config.id)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  createCommandWidget: async function (config, payload) {
    try {
      const response = await ApiService.post('/orgs/' + config.orgId + '/panels' + '/' + config.panelId + '/command_widgets', payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  updateCommandWidget: async function (config, payload) {
    try {
      const response = await ApiService.put('/orgs/' + config.orgId + '/panels' + '/' + config.panelId + '/command_widgets/' + config.id, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  deleteCommandWidget: async function (config) {
    try {
      const response = await ApiService.delete('/orgs/' + config.orgId + '/panels' + '/' + config.panelId + '/command_widgets/' + config.id)

      return response.data
    } catch (error) {
      return error.data
    }
  }
}

export default dashboardService
