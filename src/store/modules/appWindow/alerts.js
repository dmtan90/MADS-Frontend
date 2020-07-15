const appSections = [
    {
      key: 'alerts',
      name: 'Alerts',
      iconId: 'alerts'
    },
    {
      key: 'inbox',
      name: 'Inbox',
      iconId: 'inbox'
    },
    {
      key: 'projects',
      name: 'Projects',
      iconId: 'projects'
    },
    {
      key: 'apps',
      name: 'Apps',
      iconId: 'apps'
    },
    {
      key: 'logs',
      name: 'Logs',
      iconId: 'logs'
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
      appName: 'Alerts Reminder',
      appKey: 'Alerts_Reminder',
      appIcon: 'mads-alerts-reminders',
      appSections: appSections,
      appSectionsIconFile: 'mads-alerts-icons.svg',
      currentSection: 'alerts',
      appState: 'closed',
      sidebarHidden: false,
      appZindex: 0
    }
  }
  