const appSections = [
  {
    key: 'iotManager',
    name: 'IOT Manager',
    iconId: 'iot-manager'
  },
  {
    key: 'topology',
    name: 'Topology',
    iconId: 'topology'
  },
  {
    key: 'gateways',
    name: 'Gateways',
    iconId: 'gateways'
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
    appName: 'IOT Manager',
    appKey: 'IoT_Manager',
    appIcon: 'mads-iot-manager',
    appSections: appSections,
    appSectionsIconFile: 'mads-iot-manager-icons.svg',
    currentSection: 'iotManager',
    appState: 'closed',
    appZindex: 0
  }
}