export default {
  state: {
    entityManagerCurrentPage: 'index',
    selectedProject: null
  },
  getters: {
    entityManagerCurrentPage: state => state.entityManagerCurrentPage,
    selectedProject: state => state.selectedProject
  },
  mutations: {
    setSelectedProject (state, payload) {
      state.selectedProject = payload
    },
    setCurrentPage (state, payload) {
      state.entityManagerCurrentPage = payload
    }
  },
  actions: {
    async selectProject ({ commit, _ }, project) {
      commit('setSelectedProject', project)
    },
    async setEntityManagerCurrentPage ({ commit, _ }, page) {
      commit('setCurrentPage', page)
    }
  }
}
