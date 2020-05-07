export default {
  state: {
    currentPage: 'index',
    selectedWidget: null
  },
  getters: {
    currentPage: state => state.currentPage,
    selectedWidget: state => state.selectedWidget
  },
  mutations: {
    setSelectedWidget (state, payload) {
      state.selectedWidget = payload
    },
    setCurrentPage (state, payload) {
      state.currentPage = payload
    }
  },
  actions: {
    async selectWidget ({ commit, _ }, widgetId) {
      commit('setSelectedWidget', widgetId)
    },
    async setCurrentPage ({ commit, _ }, page) {
      commit('setCurrentPage', page)
    }
  }
}
