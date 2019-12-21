import { UserService, AuthenticationError } from '@/services/user.service'
import TokenService from '@/services/token.service'
import router from '@/router'

export default {
  state: {
    currentUser: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
    accessToken: TokenService.getToken(),
    loginError: null,
    loginErrorCode: null,
    processing: false,
    refreshTokenPromise: null
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError
  },
  mutations: {
    setToken (state, payload) {
      state.accessToken = payload
      state.processing = false
      state.loginError = null
    },
    setUser (state, payload) {
      state.currentUser = payload
    },
    setLogout (state) {
      state.currentUser = {}
      state.processing = false
      state.loginError = null
    },
    setProcessing (state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError (state, payload) {
      state.loginError = payload
      state.currentUser = {}
      state.processing = false
    },
    clearError (state) {
      state.loginError = null
    },
    refreshTokenPromise (state, promise) {
      state.refreshTokenPromise = promise
    }
  },
  actions: {
    async login ({ commit }, payload) {
      commit('setProcessing', true)

      try {
        const token = await UserService.login(payload.email, payload.password)
        const user = {
          'uid': 1,
          'name': 'admin',
          'email': 'admin@datakrew.com',
          'img': 'https://via.placeholder.com/150'
        }
        commit('setToken', token)
        commit('setUser', { ...user })

        localStorage.setItem('user', JSON.stringify(user))

        router.push(router.history.current.query.redirect || '/')

        return true
      } catch (error) {
        if (error instanceof AuthenticationError) {
          commit('setError', { errorCode: error.errorCode, errorMessage: error.message })
        }
      }
    },
    async refreshAccess ({ commit, state }) {
      commit('setProcessing', true)

      // If this is the first time the refreshToken has been called, make a request
      // otherwise return the same promise to the caller
      if (!state.refreshTokenPromise) {
        const p = UserService.refreshToken()
        commit('refreshTokenPromise', p)

        // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
        // Clear the promise on error as well.
        p.then(
          response => {
            commit('refreshTokenPromise', null)
            commit('setToken', response)
          },
          error => {
            commit('refreshTokenPromise', null)
            commit('setError', { errorCode: error.errorCode, errorMessage: error.message })
          }
        )
      }

      return state.refreshTokenPromise
    },
    async logout ({ commit }) {
      try {
        UserService.logout()
        commit('setLogout')

        localStorage.removeItem('user')

        router.push('/user/login')
      } catch (error) {
        if (error instanceof AuthenticationError) {
          commit('setError', { errorCode: error.errorCode, errorMessage: error.message })
        }
      }
    }
  }
}
