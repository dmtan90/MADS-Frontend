<template>
  <div @contextmenu="disableMenu($event)">
    <div v-if="currentUser" class="fixed-background" :style="{background: getBackgroundUrl()}">
      <taskbar :isAutohideTaskbar="hideTaskbar" :isScreenLocked="isScreenLocked"></taskbar>
      <div v-if="!isScreenLocked" id="fullScreen">
        <app-slider></app-slider>
        <apps-container></apps-container>
        <set-wallpaper-modal></set-wallpaper-modal>
      </div>
      <div v-else class="lock-screen-container">
        <lock-screen></lock-screen>
      </div>
    </div>
    <div v-else class="loading"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import taskbar from './taskbar'
import appSlider from './appSlider'
import appsContainer from './appsContainer'
import setWallpaperModal from './setWallpaperModal'
import lockScreen from './lockScreen'
import userService from '@/services/user.service'
import EventBus from './event-bus'

export default {
  components: {
    lockScreen,
    taskbar,
    appSlider,
    appsContainer,
    setWallpaperModal
  },
  data () {
    return {
      isScreenLocked: false,
      hideTaskbar: false
    }
  },
  methods: {
    ...mapActions(['openApp', 'maximizeApp', 'setUserProfile', 'setUserSettings', 'setRecentVisitedApp', 'setDesktopWallpaper']),
    getCurrentUserProfile () {
      let currentUserId = localStorage.getItem('user_id')

      userService
        .getUserProfile({ userId: currentUserId })
        .then(response => {
          this.setUserProfile(response)
        })
    },
    getBackgroundUrl () {
      let url = this.visualSettings.desktop_wallpaper || 'landspaces_1.jpeg'
      return "url('/assets/img/" + url + "')"
    },
    saveUserSettings () {
      let config = { userId: this.currentUser.id }
      let payload = {
        visual_settings: this.visualSettings,
        data_settings: this.dataSettings
      }

      if (this.userSettingsId) {
        config = this.$_.merge(config, { userSettingsId: this.userSettingsId })
        userService
          .updateUserSettings(config, payload)
          .then(response => {})
      } else {
        userService
          .saveUserSettings(config, payload)
          .then(response => {
            this.setUserSettings({ data_settings: response.data_settings, visual_settings: response.visual_settings, user_setting_id: response.id })
          })
      }
    },
    disableMenu (event) {
      event.preventDefault()
    }
  },
  mounted () {
    this.isScreenLocked = localStorage.getItem('screenLocked') === 'true'
    this.getCurrentUserProfile()
    EventBus.$on('lock-screen', () => {
      this.isScreenLocked = true
      localStorage.setItem('screenLocked', true)
    })
    EventBus.$on('unlock-screen', () => {
      this.isScreenLocked = false
      localStorage.setItem('screenLocked', false)
    })
    EventBus.$on('save-user-settings', () => { this.saveUserSettings() })
  },
  computed: {
    ...mapGetters(['isUserLoggedIn', 'currentUser', 'openedApps', 'visualSettings', 'dataSettings', 'userSettingsId'])
  }
}
</script>

<style lang="scss" scoped>
</style>
