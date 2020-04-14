export default {
  state: {
    openedWidgetDetail: null,
    showWidgetStore: true,
    showWidgetDetail: false
  },
  getters: {
    openedWidgetDetail: state => state.openedWidgetDetail,
    showWidgetStore: state => state.showWidgetStore,
    showWidgetDetail: state => state.showWidgetDetail
  },
  mutations: {
    setOpenedWidgetDetail (state, payload) {
      state.openedWidgetDetail = payload
    },
    setShowWidgetStoreState (state, payload) {
      state.showWidgetStore = payload
    },
    setShowWidgetDetailState (state, payload) {
      state.showWidgetDetail = payload
    }
  },
  actions: {
    async openWidgetDetail ({ commit, _ }, widget) {
      commit('setOpenedWidgetDetail', widget.id)
      commit('setShowWidgetStoreState', false)
      commit('setShowWidgetDetailState', true)
    },
    async toggleWidgetStoreState ({ commit, _ }, toggleState) {
      commit('setShowWidgetStoreState', toggleState)
    },
    async toggleWidgetDetailState ({ commit, _ }, toggleState) {
      commit('setShowWidgetDetailState', toggleState)
    }
  }
}
