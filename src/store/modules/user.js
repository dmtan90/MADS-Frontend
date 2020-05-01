import _ from 'lodash'

export default {
  state: {
    currentUser: null,
    visualSettings: {
      recently_visited_apps: [],
      taskbar_pos: 'bottom',
      desktop_wallpaper: null
    },
    dataSettings: {},
    userSettingsId: false
  },
  getters: {
    currentUser: state => state.currentUser,
    visualSettings: state => state.visualSettings,
    dataSettings: state => state.dataSettings,
    userSettingsId: state => state.userSettingsId
  },
  mutations: {
    setUserProfile (state, payload) {
      state.currentUser = payload
    },
    setVisualSettings (state, payload) {
      state.visualSettings = _.merge({}, payload)
    },
    setDataSettings (state, payload) {
      state.dataSettings = _.merge({}, payload)
    },
    setUserSettingsId (state, payload) {
      state.userSettingsId = payload
    }
  },
  actions: {
    async setUserProfile ({ commit, _ }, user) {
      commit('setUserProfile', { ...user })
      if (user.user_setting) {
        let settings = user.user_setting
        commit('setVisualSettings', settings.visual_settings)
        commit('setDataSettings', settings.data_settings)
        commit('setUserSettingsId', settings.user_setting_id)
      }
    },

    async setUserSettings ({ commit, _ }, settings) {
      if (settings) {
        commit('setVisualSettings', settings.visual_settings)
        commit('setDataSettings', settings.data_settings)
        commit('setUserSettingsId', settings.user_setting_id)
      }
    },

    async setRecentVisitedApp ({ commit, state }, app) {
      let recentlyVisitedApps = state.visualSettings.recently_visited_apps
      if (_.includes(recentlyVisitedApps, app)) {
        recentlyVisitedApps = _.remove(recentlyVisitedApps, (vistedApp) => {
          return app === vistedApp
        })
      }
      recentlyVisitedApps = _.concat(app, state.visualSettings.recently_visited_apps)

      let visualSettings = _.merge(state.visualSettings, {
        recently_visited_apps: recentlyVisitedApps
      })

      commit('setVisualSettings', visualSettings)
    },

    async setDesktopWallpaper ({ commit, state }, wallpaper) {
      let visualSettings = _.merge(state.visualSettings, {
        desktop_wallpaper: wallpaper
      })

      commit('setVisualSettings', visualSettings)
    }
  }
}
