const appSections = [
  {
    key: 'builders',
    name: 'Builders',
    iconId: 'projects'
  },
  {
    key: 'settings',
    name: 'Settings',
    iconId: 'settings'
  }
]

export default {
  state: {
    appName: 'Data Insights',
    appKey: 'dataInsights',
    appIcon: 'mads-data-insights',
    appSections: appSections,
    appSectionsIconFile: 'mads-alerts-icons.svg',
    currentSection: 'builders',
    appState: 'closed',
    sidebarHidden: false,
    appZindex: 0
  }
}
