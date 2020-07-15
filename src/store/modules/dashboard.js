export default {
  state: {
    selectedDashboard: null
  },
  getters: {
    selectedDashboard: state => state.selectedDashboard
  },
  mutations: {
    setDashboard (state, payload) {
      state.selectedDashboard = payload
    }
  },
  actions: {
    async selectDashboard ({ commit, _ }, dashboard) {
      commit('setDashboard', dashboard)
    }
  }
}
