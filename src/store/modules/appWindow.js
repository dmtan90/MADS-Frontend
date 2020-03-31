export default {
  state: {
    openApps: [],
    minimizedApps: []
  },
  getters: {
    openApps: state => state.openApps,
    minimizedApps: state => state.minimizedApps
  },
  mutations: {
    addToOpenApps (state, payload) {
      state.openApps = payload
    }
  },
  actions: {
    async addToOpenApps ({ commit, state }, app) {
      let openApps = app
      commit('addToOpenApps', openApps)
    }
  }
}
