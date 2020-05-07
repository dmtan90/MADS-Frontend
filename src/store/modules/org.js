export default {
  state: {
    apps: []
  },
  getters: {
    orgApps: state => state.apps
  },
  mutations: {
    setOrgApps (state, payload) {
      state.apps = payload
    }
  },
  actions: {
    async setOrgApps ({ commit, _ }, apps) {
      commit('setOrgApps', apps)
    }
  }
}
