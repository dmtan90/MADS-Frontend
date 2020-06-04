import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/main'
import menu from '@/store/modules/menu'
import auth from '@/store/modules/auth'
import user from '@/store/modules/user'
import appWindow from '@/store/modules/appWindow/index'
import widgetManager from '@/store/modules/widgetManager'
import entityManager from '@/store/modules/entityManager'
import organization from '@/store/modules/org'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    changeLang (payload) {
      app.$i18n.locale = payload
      localStorage.setItem('currentLanguage', payload)
    }
  },
  actions: {
    setLang ({ commit }, payload) {
      commit('changeLang', payload)
    }
  },
  modules: {
    menu,
    auth,
    user,
    appWindow,
    widgetManager,
    entityManager,
    organization
  }
})

export default store
