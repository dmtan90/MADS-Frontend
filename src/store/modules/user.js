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
    login ({ commit, rootState }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      axios.defaults.headers.post['Content-Type'] = 'application/json'
      axios
        .post(`${rootState.apiBase}/sign-in/`, payload)
        .then(response => {
          return response.data
        })
        .then(res => {
          const user = {
            'uid': res.user_id,
            'name': 'admin',
            'email': 'admin@datakrew.com',
            'img': 'https://via.placeholder.com/150'
          }
          const jwt = {
            'access_token': res.access_token,
            'refresh_token': res.refresh_token
          }
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('jwt', JSON.stringify(jwt))
          axios.defaults.headers.common.Authorization = `Baerer ${res.access_token}`
          commit('setUser', { ...user })
        }, err => {
          localStorage.removeItem('user')
          localStorage.removeItem('jwt')
          commit('setError', err.message)
        })
    },
    refreshAccess ({ commit, rootState }) {
      axios.defaults.headers.post['Content-Type'] = 'application/json'
      axios
        .post(`${rootState.apiBase}/refresh/`)
        .then(response => {
          return response.data
        })
        .then(res => {
          let jwt = JSON.parse(localStorage.getItem('jwt'))
          jwt.access_token = res.access_token
          localStorage.setItem('jwt', JSON.stringify(jwt))
          axios.defaults.headers.common.Authorization = `Baerer ${res.access_token}`
        }, err => {
          localStorage.removeItem('user')
          localStorage.removeItem('jwt')
          commit('setError', err.message)
        })
    },
    signOut ({ commit, rootState }) {
      axios
        .post(`${rootState.apiBase}/sign-out/`, JSON.parse(localStorage.getItem('jwt')))
        .then(response => {
          return response.data
        })
        .then(res => {
          if (res.status === 'Signed Out') {
            localStorage.removeItem('user')
            localStorage.removeItem('jwt')
            delete axios.defaults.headers.post['Content-Type']
            delete axios.defaults.headers.common.Authorization
            commit('setLogout')
          } else {
            commit('setError', res.message)
          }
        }, err => {
          commit('setError', err.message)
        })
    }
  }
}
