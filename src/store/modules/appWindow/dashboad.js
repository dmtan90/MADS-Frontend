const appSections = [
  {
    key: 'dashboards',
    name: 'Dashboards',
    iconId: 'dashboards'
  },
  {
    key: 'new',
    name: 'New',
    iconId: 'new'
  },
  {
    key: 'open',
    name: 'Open',
    iconId: 'open'
  },
  {
    key: 'recent',
    name: 'Recent',
    iconId: 'recent'
  },
  {
    key: 'share',
    name: 'Share',
    iconId: 'share'
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
    appName: 'Dashboards',
    appKey: 'Dashboards',
    appIcon: 'mads-dashboard',
    appSections: appSections,
    appSectionsIconFile: 'mads-dashboard-icons.svg',
    currentSection: 'entityManager',
    appState: 'closed',
    appZindex: 0
  }
}
