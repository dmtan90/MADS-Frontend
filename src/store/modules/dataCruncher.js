const appSections = [
  {
    key: 'dataCruncher',
    name: 'Data Cruncher',
    iconId: 'data-cruncher'
  },
  {
    key: 'workspace',
    name: 'Workspace',
    iconId: 'workspace'
  },
  {
    key: 'dataLake',
    name: 'Data Lake',
    iconId: 'data-lake'
  },
  {
    key: 'functions',
    name: 'Functions',
    iconId: 'functions'
  },
  {
    key: 'exportedWidgets',
    name: 'Exported Widgets',
    iconId: 'exported-widgets'
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
    appName: 'Data Cruncher',
    appKey: 'dataCruncher',
    appIcon: 'mads-data-cruncher',
    appSections: appSections,
    appSectionsIconFile: 'mads-data-cruncher-icons.svg',
    currentSection: 'dataCruncher',
    currentPage: 'index',
    appState: 'closed',
    appZindex: 0
  }
}
