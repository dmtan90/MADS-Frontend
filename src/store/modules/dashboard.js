export default {
  state: {
    selectedTheme: null,
    selectedDashboard: null
  },
  getters: {
    selectedTheme: state => state.selectedTheme,
    selectedDashboard: state => state.selectedDashboard
  },
  mutations: {
    setTheme (state, payload) {
      state.selectedTheme = payload
    },
    setDashboard (state, payload) {
      state.selectedDashboard = payload
    }
  },
  actions: {
    async selectTheme ({ commit, _ }, dashboard) {
      commit('setTheme', dashboard)
    },
    async setDashboard ({ commit, _ }, dashboard) {
      commit('setDashboard', dashboard)
    }
  }
}
