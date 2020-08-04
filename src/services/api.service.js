import axios from 'axios'
import _ from 'lodash'
import TokenService from '@/services/token.service'
import router from '@/router'
import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.use(VueToast)

const ApiService = {

  // Stores the interceptor so that it can be later ejected when needed
  _interceptor: null,

  init (baseURL) {
    axios.defaults.baseURL = baseURL
  },

  setHeader (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
  },

  removeHeader () {
    axios.defaults.headers.common = {}
  },

  get (resource, data) {
    return axios.get(resource, data)
  },

  post (resource, data) {
    return axios.post(resource, data)
  },

  put (resource, data) {
    return axios.put(resource, data)
  },

  delete (resource) {
    return axios.delete(resource)
  },

  /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
    **/
  customRequest (data) {
    return axios(data)
  },

  mountInterceptor () {
    this._interceptor = axios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        let errorResponse = JSON.parse(error.request.response)

        if (error.request.status === 400) {
          let message = 'Bad Request'
          Vue.$toast.error(message, { position: 'top-right' })
        } else if (error.request.status === 403) {
          Vue.$toast.error('Please Login', { position: 'top-right' })
          TokenService.removeToken()
          TokenService.removeRefreshToken()
          localStorage.removeItem('user_id')
          router.push('/user/login')
        } else if (error.request.status === 500) {
          Vue.$toast.error('Something Went Wrong', { position: 'top-right' })
        }

        // If error was not 401 just reject as is
        errorResponse = _.merge({}, errorResponse, { data: {} })
        throw errorResponse
      }
    )
  },

  unmount401Interceptor () {
    // Eject the interceptor
    axios.interceptors.response.eject(this._interceptor)
  }
}

export default ApiService
