const appSections = [
  {
    key: 'roleManager',
    name: 'Role Manager',
    iconId: 'role-manager'
  },
  {
    key: 'users',
    name: 'Users',
    iconId: 'users'
  },
  {
    key: 'teams',
    name: 'Teams',
    iconId: 'teams'
  },
  {
    key: 'projects',
    name: 'Projects',
    iconId: 'projects'
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
    appName: 'Role Manager',
    appKey: 'roleManager',
    appIcon: 'mads-role-manager',
    appSections: appSections,
    appSectionsIconFile: 'mads-role-manager-icons.svg',
    currentSection: 'roleManager',
    appState: 'closed',
    appZindex: 0
  }
}
