export default {
    state: {
      selectedGateway: null
    },
    getters: {
      selectedGateway: state => state.selectedGateway
    },
    mutations: {
      setSelectedGateway (state, payload) {
        state.selectedGateway = payload
      },
    },
    actions: {
      async selectGateway ({ commit, _ }, gateway) {
        commit('setSelectedGateway', gateway)
      },
    }
  }
  