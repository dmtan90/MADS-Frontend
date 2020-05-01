import store from '@/store'

export default (to, from, next) => {
  let isUserLoggedIn = store.getters.isUserLoggedIn
  if (isUserLoggedIn) {
    next()
  } else {
    store.dispatch('validateToken')
  }
}
