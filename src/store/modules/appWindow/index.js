/* eslint-disable camelcase */
import _ from 'lodash'
import Role_Manager from './roleManager'
import Widget_Manager from './widgetManager'
import Data_Cruncher from './dataCruncher'
import Entity_Manager from './entityManager'
import Dashboards from './dashboad'
import IoT_Manager from './iotManager'
import Alerts_Reminder from './alerts'

export default {
  state: {
    appWindowCurrentZIndex: 1000
  },
  getters: {},
  mutations: {
    updateAppState (state, payload) {
      let appKey = payload.appKey
      state[appKey] = _.merge({}, payload)
    },
    updateAppWindowCurrentZIndex (state, payload) {
      state.appWindowCurrentZIndex = payload
    }
  },
  actions: {
    async openApp ({ commit, state }, appKey) {
      let appState = _.merge(state[appKey], { appZindex: state.appWindowCurrentZIndex + 10 })
      commit('updateAppState', appState)
      commit('updateAppWindowCurrentZIndex', state.appWindowCurrentZIndex + 10)

      appState = _.merge(state[appKey], { appState: 'maximize' })
      commit('updateAppState', appState)
    },
    async hideApp ({ commit, state }, appKey) {
      let appState = _.merge(state[appKey], { appState: 'minimize' })
      commit('updateAppState', appState)

      appState = _.merge(state[appKey], { appZindex: 0 })
      commit('updateAppState', appState)
    },
    async closeApp ({ commit, state }, appKey) {
      let appState = _.merge(state[appKey], { appState: 'closed' })
      commit('updateAppState', appState)

      appState = _.merge(state[appKey], { appZindex: 0 })
      commit('updateAppState', appState)
    },
    async hideAppSidebar ({ commit, state }, appKey) {
      let appState = _.merge(state[appKey], { sidebarHidden: true })
      commit('updateAppState', appState)
    },
    async showAppSidebar ({ commit, state }, appKey) {
      let appState = _.merge(state[appKey], { sidebarHidden: false })
      commit('updateAppState', appState)
    },
    async setCurrentSection ({ commit, state }, data) {
      let appKey = data.appKey
      let appState = _.merge(state[appKey], { currentSection: data.section })
      commit('updateAppState', appState)
    }
  },
  modules: {
    Role_Manager,
    Widget_Manager,
    Data_Cruncher,
    Entity_Manager,
    Dashboards,
    IoT_Manager,
    Alerts_Reminder
  }
}
