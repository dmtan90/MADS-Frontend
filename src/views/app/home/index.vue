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
import organizationService from '@/services/organization.service'
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
      hideTaskbar: false,
      loader: this.$loading.show()
    }
  },
  methods: {
    ...mapActions(['setUserProfile', 'setUserSettings', 'setOrgApps']),
    getCurrentUserProfile () {
      let currentUserId = localStorage.getItem('user_id')

      userService
        .getUserProfile({ userId: currentUserId })
        .then(async response => {
          await this.setUserProfile(response)
          organizationService.readApps({ orgId: this.currentUser.org.id })
            .then(response => {
              this.setOrgApps(response.apps)
            })
        })
    },
    getBackgroundUrl () {
      let url = this.visualSettings.desktop_wallpaper || 'landspaces_1.jpeg'
      return "url('/assets/img/" + url + "')"
    },
    saveUserSettings () {
      let config = { userId: this.currentUser.id, orgId: this.currentUser.org.id }
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
  watch: {
    currentUser (user) {
      if (user) {
        this.loader.hide()
      }
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
    ...mapGetters(['currentUser', 'visualSettings', 'dataSettings', 'userSettingsId'])
  },
  created () {
    window.addEventListener('beforeunload', function (event) {
      event.preventDefault() // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      event.returnValue = ''
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
