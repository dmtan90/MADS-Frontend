import Vue from 'vue'
import Vuex from 'vuex'

import app from '../main'
import menu from './modules/menu'
import user from './modules/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    apiBase: 'http://localhost:4000'
  },
  getters: {
    apiBase: state => state.apiBase
  },
  mutations: {
    changeLang (state, payload) {
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
