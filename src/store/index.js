import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/main'
import menu from '@/store/modules/menu'
import user from '@/store/modules/user'
import appWindow from '@/store/modules/appWindow'

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
    user,
    appWindow
  }
})

export default store
