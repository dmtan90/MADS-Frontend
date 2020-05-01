import ApiService from '@/services/api.service'

class AuthenticationError extends Error {
  constructor (errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

const UserService = {
  read: async function (config, params) {
    try {
      const response = await ApiService.get('orgs/' + config.orgId + '/users', { params })

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  create: async function (config, payload) {
    const requestData = {
      method: 'post',
      url: '/orgs/1/users',
      headers: { 'Invitation-Token': config.inviteToken },
      data: {
        user: payload
      }
    }

    try {
      const response = await ApiService.customRequest(requestData)

      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  update: async function (config, payload) {
    try {
      const response = await ApiService.put('orgs/1' + '/users/' + config.userId, payload)
      return response.data
    } catch (error) {
      return error.response.data
    }
  },
  search: async function (payload) {
    try {
      const response = await ApiService.get('orgs/1' + '/users/search?label=' + payload)
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
