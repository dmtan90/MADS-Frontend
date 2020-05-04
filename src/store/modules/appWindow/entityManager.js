const appSections = [
  {
    key: 'entityManager',
    name: 'Entity Manager',
    iconId: 'entity-manager'
  },
  {
    key: 'entityMap',
    name: 'Entity Map',
    iconId: 'entity-map'
  },
  {
    key: 'assets',
    name: 'Assets',
    iconId: 'assets'
  },
  {
    key: 'sensors',
    name: 'Sensors',
    iconId: 'sensors'
  },
  {
    key: 'activity',
    name: 'Activity',
    iconId: 'activity'
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
    appName: 'Entity Manager',
    appKey: 'entityManager',
    appIcon: 'mads-entity-manager',
    appSections: appSections,
    appSectionsIconFile: 'mads-entity-manager-icons.svg',
    currentSection: 'entityManager',
    appState: 'closed',
    appZindex: 0
  }
}
