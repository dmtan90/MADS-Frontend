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
      return error.data
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
      return error.data
    }
  },
  update: async function (config, payload) {
    try {
      const response = await ApiService.put('orgs/' + config.orgId + '/users/' + config.userId, payload)
      return response.data
    } catch (error) {
      return error.data
    }
  },
  search: async function (config, payload) {
    try {
      const response = await ApiService.get('orgs/' + config.orgId +'/users/search?label=' + payload)
      return response.data
    } catch (error) {
      return error.data
    }
  },
  getUserProfile: async function (config) {
    try {
      const response = await ApiService.get('orgs/1/users/' + config.userId)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  saveUserSettings: async function (config, payload) {
    try {
      const response = await ApiService.post('orgs/' + config.orgId + '/users/' + config.userId + '/settings', payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  updateUserSettings: async function (config, payload) {
    try {
      const response = await ApiService.put('orgs/' + config.orgId + '/users/' + config.userId + '/settings/' + config.userSettingsId, payload)

      return response.data
    } catch (error) {
      return error.data
    }
  },
  delete: async function (config) {
    try {
      const response = await ApiService.delete('/orgs/' + config.orgId + '/users/' + config.userId)
      return response.data
    } catch (error) {
      return error.data
    }
  }
}

export default UserService

export { UserService, AuthenticationError }
