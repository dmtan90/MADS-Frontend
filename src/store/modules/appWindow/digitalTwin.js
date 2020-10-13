const appSections = [
  {
    key: 'digitalTwin',
    name: 'Digital Twin',
    iconId: 'digital-twin'
  },
  {
    key: '3dModel',
    name: '3D Model',
    iconId: '3d-modeling'
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
    appName: 'Digital Twin',
    appKey: 'digitalTwin',
    appIcon: 'mads-digital-twin',
    appSections: appSections,
    appSectionsIconFile: 'mads-digital-twin-icons.svg',
    currentSection: 'digitalTwin',
    appState: 'closed',
    sidebarHidden: false,
    appZindex: 0
  }
}
