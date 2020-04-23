import { UserService, AuthenticationError } from '@/services/user.service'
import TokenService from '@/services/token.service'
import router from '@/router'

export default {
  state: {
    isUserLoggedIn: false,
    accessToken: TokenService.getToken(),
    loginError: null,
    loginErrorCode: null,
    processing: false,
    refreshTokenPromise: null
  },
  getters: {
    isUserLoggedIn: state => state.isUserLoggedIn,
    processing: state => state.processing,
    loginError: state => state.loginError
  },
  mutations: {
    setUserLoggedIn (state, payload) {
      state.isUserLoggedIn = payload
    },
    setToken (state, payload) {
      state.accessToken = payload
      state.processing = false
      state.loginError = null
    },
    setUser (state, payload) {
    },
    setLogout (state) {
      state.isUserLoggedIn = false
      state.processing = false
      state.loginError = null
    },
    setProcessing (state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError (state, payload) {
      state.loginError = payload
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
        const userId = await UserService.login(payload.email, payload.password)
        commit('setUserLoggedIn', true)
        localStorage.setItem('user_id', userId)
        router.push('/')

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

        localStorage.removeItem('user_id')

        router.push('/user/login')
      } catch (error) {
        if (error instanceof AuthenticationError) {
          commit('setError', { errorCode: error.errorCode, errorMessage: error.message })
        }
      }
    }
  }
}
