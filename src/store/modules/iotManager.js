export default {
  state: {
    iotManagerCurrentPage: 'index',
    selectedGateway: null
  },
  getters: {
    iotManagerCurrentPage: state => state.iotManagerCurrentPage,
    selectedGateway: state => state.selectedGateway
  },
  mutations: {
    setSelectedGateway (state, payload) {
      state.selectedGateway = payload
    },
    setCurrentPage (state, payload) {
      state.iotManagerCurrentPage = payload
    }
  },
  actions: {
    async selectGateway ({ commit, _ }, gateway) {
      commit('setSelectedGateway', gateway)
    },
    async setIotManagerCurrentPage ({ commit, _ }, page) {
      commit('setCurrentPage', page)
    }
  }
}
