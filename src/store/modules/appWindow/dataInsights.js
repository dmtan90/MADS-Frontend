const appSections = [
  {
    key: 'home',
    name: 'Home',
    iconId: 'apps'
  },
  {
    key: 'builders',
    name: 'Builders',
    iconId: 'projects'
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
    appName: 'Data Insights',
    appKey: 'dataInsights',
    appIcon: 'mads-data-insights',
    appSections: appSections,
    appSectionsIconFile: 'mads-alerts-icons.svg',
    currentSection: 'home',
    appState: 'closed',
    sidebarHidden: false,
    appZindex: 0
  }
}
