const appSections = [
  {
    key: 'widgetManager',
    name: 'Widget Manager',
    iconId: 'widget-manager'
  },
  {
    key: 'widgetStore',
    name: 'Widget Store',
    iconId: 'widget-store'
  },
  {
    key: 'myWidget',
    name: 'My Widget',
    iconId: 'my-widgets'
  },
  {
    key: 'editor',
    name: 'Editor',
    iconId: 'editor'
  }
]

export default {
  state: {
    appName: 'Widget Manager',
    appKey: 'widgetManager',
    appIcon: 'mads-widget-manager',
    appSections: appSections,
    appSectionsIconFile: 'mads-widget-manager-icons.svg',
    currentSection: 'widgetManager',
    currentPage: 'index',
    appState: 'closed',
    appZindex: 0
  }
}
