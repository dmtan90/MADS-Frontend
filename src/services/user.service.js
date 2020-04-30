import ApiService from '@/services/api.service'
import TokenService from '@/services/token.service'

class AuthenticationError extends Error {
  constructor (errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

const UserService = {
  /**
     * Login the user and store the access token to TokenService.
     *
     * @returns access_token
     * @throws AuthenticationError
    **/
  login: async function (email, password) {
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

      TokenService.saveToken(response.data.access_token)
      TokenService.saveRefreshToken(response.data.refresh_token)
      ApiService.setHeader()

      ApiService.mount401Interceptor()

      return response.data.user_id
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail)
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

      // Remove the token and remove Authorization header from Api Service as well
      TokenService.removeToken()
      TokenService.removeRefreshToken()
      ApiService.removeHeader()

      return response.data
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail)
    }
  },

  validateAccessToken: async function () {
    const requestData = {
      method: 'post',
      url: '/validate-token',
      headers: { Authorization: `Bearer ${TokenService.getRefreshToken()}` },
      data: {
        access_token: TokenService.getToken()
      }
    }

    try {
      const response = await ApiService.customRequest(requestData)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },

  getUserProfile: async function (config) {
    try {
      const response = await ApiService.get('orgs/1/users/' + config.userId)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },

  saveUserSettings: async function (config, payload) {
    try {
      const response = await ApiService.post('orgs/1/users/' + config.userId + '/settings', payload)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },

  updateUserSettings: async function (config, payload) {
    try {
      const response = await ApiService.put('orgs/1/users/' + config.userId + '/settings/' + config.userSettingsId, payload)

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}

export default UserService

export { UserService, AuthenticationError }
