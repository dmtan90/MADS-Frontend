import ApiService from '@/services/api.service'
import TokenService from '@/services/token.service'
import store from '@/store'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(VueToast)
Vue.use(Loading)

class AuthenticationError extends Error {
  constructor (errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

const AuthService = {
  /**
     * Login the user and store the access token to TokenService.
     *
     * @returns access_token
     * @throws AuthenticationError
    **/
  login: async function (email, password) {
    let loader = Vue.$loading.show({
      loader: 'bars',
      color: '#ffffff',
      backgroundColor: '#000000'
    })

    const requestData = {
      method: 'post',
      url: '/sign-in',
      data: {
        email: email,
        password: password
      }
    }

    try {
      const response = await ApiService.customRequest(requestData)
      store.dispatch('loginSuccess', response.data)
      loader.hide()
    } catch (error) {
      store.dispatch('loginFailed')
      loader.hide()
      Vue.$toast.error('Login Failed', { position: 'top-right' })
    }
  },

  /**
     * Refresh the access token.
    **/
  refreshToken: async function () {
    const refreshToken = TokenService.getRefreshToken()

    const requestData = {
      method: 'post',
      url: '/refresh',
      data: {
        refresh_token: refreshToken
      }
    }

    try {
      const response = await ApiService.customRequest(requestData)

      TokenService.saveToken(response.data.access_token)
      TokenService.saveRefreshToken(response.data.refresh_token)
      // Update the header in ApiService
      ApiService.setHeader()

      return response.data.access_token
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail)
    }
  },

  /**
     * Logout the current user by removing the token from storage.
     *
     * Will also remove `Authorization Bearer <token>` header from future requests.
    **/
  logout: async function () {
    let loader = Vue.$loading.show({
      loader: 'bars',
      color: '#ffffff',
      backgroundColor: '#000000'
    })
    const accessToken = TokenService.getToken()
    const refreshToken = TokenService.getRefreshToken()

    const requestData = {
      method: 'post',
      url: '/sign-out',
      data: {
        access_token: accessToken,
        refresh_token: refreshToken
      }
    }

    try {
      const response = await ApiService.customRequest(requestData)
      loader.hide()
      return response.data
    } catch (error) {
      loader.hide()
      throw new AuthenticationError(error.response.status, error.response.data.detail)
    }
  },

  validateAccessToken: async function (refreshToken, accessToken) {
    const requestData = {
      method: 'post',
      url: '/validate-token',
      headers: { Authorization: `Bearer ${refreshToken}` },
      data: {
        access_token: accessToken
      }
    }

    try {
      const response = await ApiService.customRequest(requestData)
      store.dispatch('loginSuccess', response.data)
    } catch (error) {
      store.dispatch('loginFailed')
    }
  }
}

export default AuthService

export { AuthService, AuthenticationError }
