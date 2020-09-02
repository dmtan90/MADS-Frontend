export default {
  state: {
    selectedTheme: null,
    selectedDashboard: null,
    selectedPanel: null
  },
  getters: {
    selectedTheme: state => state.selectedTheme,
    selectedDashboard: state => state.selectedDashboard,
    selectedPanel: state => state.selectedPanel
  },
  mutations: {
    setTheme (state, payload) {
      state.selectedTheme = payload
    },
    setDashboard (state, payload) {
      state.selectedDashboard = payload
    },
    setPanel (state, payload) {
      state.selectedPanel = payload
    }
  },
  actions: {
    async selectTheme ({ commit, _ }, theme) {
      commit('setTheme', theme)
    },
    async setDashboard ({ commit, _ }, dashboard) {
      commit('setDashboard', dashboard)
    },
    async setPanel ({ commit, _ }, panel) {
      commit('setPanel', panel)
    }
  }
}
