import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/main'
import menu from '@/store/modules/menu'
import user from '@/store/modules/user'

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
    user
  }
})

export default store
