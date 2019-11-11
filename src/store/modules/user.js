import axios from 'axios'

export default {
  state: {
    currentUser: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
    loginError: null,
    processing: false
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError
  },
  mutations: {
    setUser (state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setLogout (state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
    },
    setProcessing (state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError (state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    clearError (state) {
      state.loginError = null
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      axios
        .get(`http://5dad77e9c7e88c0014aa2a45.mockapi.io/users/${Math.ceil(Math.random() * Math.floor(10))}`)
        .then(response => {
          return response.data
        })
        .then(user => {
          const item = { ...user }
          localStorage.setItem('user', JSON.stringify(item))
          commit('setUser', { ...user })
        }, err => {
          localStorage.removeItem('user')
          commit('setError', err.message)
        })
    },
    signOut ({ commit }) {
      localStorage.removeItem('user')
      commit('setLogout')
    }
  }
}
