import ApiService from '@/services/api.service'
import { AuthService } from '@/services/auth.service'
import TokenService from '@/services/token.service'
import router from '@/router'

export default {
  state: {
    isUserLoggedIn: false
  },
  getters: {
    isUserLoggedIn: state => state.isUserLoggedIn
  },
  mutations: {
    setUserLoggedIn (state, payload) {
      state.isUserLoggedIn = payload
    }
  },
  actions: {
    async login (_, payload) {
      AuthService.login(payload.email, payload.password)
    },
    async logout ({ commit }) {
      await AuthService.logout()

      localStorage.removeItem('user_id')
      TokenService.removeToken()
      TokenService.removeRefreshToken()
      ApiService.removeHeader()
      commit('setUserLoggedIn', false)
      router.push('/user/login')
    },
    async validateToken (_) {
      let refreshToken = TokenService.getRefreshToken()
      let accessToken = TokenService.getToken()
      if (refreshToken && accessToken) {
        AuthService.validateAccessToken(refreshToken, accessToken)
      } else {
        router.push('/user/login')
      }
    },
    async loginSuccess ({ commit }, payload) {
      localStorage.setItem('user_id', payload.user_id)
      TokenService.saveToken(payload.access_token)
      if (payload.refresh_token) {
        TokenService.saveRefreshToken(payload.refresh_token)
      }
      ApiService.setHeader(payload.access_token)
      ApiService.mountInterceptor()
      commit('setUserLoggedIn', true)
      router.push('/')
    },
    async loginFailed ({ commit }) {
      localStorage.removeItem('user_id')
      TokenService.removeToken()
      TokenService.removeRefreshToken()
      ApiService.removeHeader()
      commit('setUserLoggedIn', false)
      router.push('/user/login')
    }
  }
}
