import UserService from '@/services/user.service'
import TokenService from '@/services/token.service'
import store from '@/store'

export default (to, from, next) => {
  let isUserLoggedIn = store.getters.isUserLoggedIn

  if (localStorage.getItem('access_token') != null) {
    if (!isUserLoggedIn) {
      UserService.validateAccessToken()
        .then(response => {
          TokenService.saveToken(response.access_token)
          localStorage.setItem('user_id', response.user_id)
          next()
        }, _ => {
          TokenService.removeToken()
          TokenService.removeRefreshToken()
          localStorage.removeItem('user_id')
          next('/user/login')
        })
    }
  } else {
    next('/user/login')
  }
}
