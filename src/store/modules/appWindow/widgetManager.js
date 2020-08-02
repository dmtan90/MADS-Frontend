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
    key: 'myWidgets',
    name: 'My Widget',
    iconId: 'my-widgets'
  },
  {
    key: 'editor',
    name: 'Editor',
    iconId: 'editor'
  },
  {
    key: 'settings',
    name: 'Settings',
    iconId: 'settings'
  },
  {
    key: 'help',
    name: 'Help',
    iconId: 'help'
  }
]

export default {
  state: {
    appName: 'Widget Manager',
    appKey: 'Widget_Manager',
    appIcon: 'mads-widget-manager',
    appSections: appSections,
    appSectionsIconFile: 'mads-widget-manager-icons.svg',
    currentSection: 'widgetStore',
    appState: 'closed',
    sidebarHidden: false,
    appZindex: 0
  }
}
