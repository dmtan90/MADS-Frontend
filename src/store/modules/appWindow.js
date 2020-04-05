import _ from 'lodash'

export default {
  state: {
    appWindowCurrentIndex: 1000,
    openedApps: {}
  },
  getters: {
    openedApps: state => state.openedApps
  },
  mutations: {
    addToOpenedApps (state, payload) {
      state.openedApps = _.assign({}, state.openedApps, payload)
    },
    updateAppWindowCurrentIndex (state, payload) {
      state.appWindowCurrentIndex = payload
    },
    removeFromOpenedApps (state, payload) {
      state.openedApps = _.assign({}, payload)
    }
  },
  actions: {
    async openApp ({ commit, state }, app) {
      let openedApps = {}
      openedApps[app] = {
        'state': 'maximize',
        'zIndex': state.appWindowCurrentIndex + 10
      }
      commit('updateAppWindowCurrentIndex', state.appWindowCurrentIndex + 10)
      commit('addToOpenedApps', openedApps)
    },
    async hideApp ({ commit, state }, app) {
      let openedApps = {}
      openedApps[app] = _.merge({}, state.openedApps[app], {
        'state': 'minimize'
      })
      commit('updateAppWindowCurrentIndex', state.appWindowCurrentIndex + 10)
      commit('addToOpenedApps', openedApps)
    },
    async maximizeApp ({ commit, state }, app) {
      let openedApps = {}
      openedApps[app] = _.merge({}, state.openedApps[app], {
        'state': 'maximize',
        'zIndex': state.appWindowCurrentIndex + 10
      })
      commit('updateAppWindowCurrentIndex', state.appWindowCurrentIndex + 10)
      commit('addToOpenedApps', openedApps)
    },
    async closeApp ({ commit, state }, app) {
      let openedApps = state.openedApps
      delete openedApps[app]
      commit('removeFromOpenedApps', openedApps)
    }
  }
}
