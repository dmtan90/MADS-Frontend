export default {
  state: {
    selectedProject: null
  },
  getters: {
    selectedProject: state => state.selectedProject
  },
  mutations: {
    setSelectedProject (state, payload) {
      state.selectedProject = payload
    }
  },
  actions: {
    async selectProject ({ commit, _ }, project) {
      commit('setSelectedProject', project)
    }
  }
}
