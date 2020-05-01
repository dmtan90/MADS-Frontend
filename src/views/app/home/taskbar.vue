<template>
  <div class="taskbar" :class="{'auto-hide': isAutohideTaskbar, 'bottom-taskbar': taskbarPosition === 'bottom', 'left-taskbar': taskbarPosition === 'left', 'right-taskbar': taskbarPosition === 'right'}">
    <div class="taskbar-container">
      <div class="home-icon" @click="toggleSlider()" v-if="!isScreenLocked">
        <svg class="icon">
          <use xlink:href="/assets/img/mads-app-icons.svg#app-launcher"></use>
        </svg>
      </div>
      <div class="taskbar-center" v-if="!isScreenLocked">
        <div class="taskbar-icons app-icon" v-tooltip="'App Store'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-app-store"></use>
          </svg>
        </div>
        <div class="taskbar-icons app-icon" v-tooltip="'Settings'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-settings"></use>
          </svg>
        </div>
        <div class="taskbar-icons app-icon" v-tooltip="'Support'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-support"></use>
          </svg>
        </div>
        <div class="taskbar-icons app-icon" v-tooltip="'Voice Assistant'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-voice-assistant"></use>
          </svg>
        </div>
        <div class="taskbar-icons app-icon" v-tooltip="'Dashboard'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-dashboard"></use>
          </svg>
        </div>
        <div class="taskbar-icons app-icon" :class="{'opened': getAppState('widgetManager') !== 'closed'}" @click="openAppWindow('widgetManager')" v-tooltip="'Widget Manager'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-widget-manager"></use>
          </svg>
          <div class="active"></div>
        </div>
        <div class="taskbar-icons app-icon" :class="{'opened': getAppState('dataCruncher') !== 'closed'}" @click="openAppWindow('dataCruncher')" v-tooltip="'Data Cruncher'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-data-cruncher"></use>
          </svg>
          <div class="active"></div>
        </div>
        <div class="taskbar-icons app-icon" :class="{'opened': getAppState('roleManager') !== 'closed'}" @click="openAppWindow('roleManager')" v-tooltip="'Role Manager'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-role-manager"></use>
          </svg>
          <div class="active"></div>
        </div>
      </div>
      <div class="taskbar-right">
        <div class="options">
          <div class="txt-white">{{getUserNameInitials()}}</div>
          <div class="notification-icon">
            <svg class="icon">
              <use xlink:href="/assets/img/system-tray-icons.svg#notifications"></use>
            </svg>
          </div>
          <div class="fullscreen">
            <svg class="icon collapse-icon" v-if="isFullScreen" @click="exitFullScreen()">
              <use xlink:href="/assets/img/system-tray-icons.svg#collapse"></use>
            </svg>
            <svg class="icon expand-icon" v-if="!isFullScreen" @click="goFullScreen()">
              <use xlink:href="/assets/img/system-tray-icons.svg#expand"></use>
            </svg>
          </div>
          <div class="txt-white">{{this.clock}}</div>
        </div>
        <div class="system-tray-container" v-if="!isScreenLocked">
          <system-tray :userNameInitials="getUserNameInitials()" :isFullScreen="isFullScreen"></system-tray>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EventBus from './event-bus'
import systemTray from './systemTray'

export default {
  props: ['isScreenLocked'],
  components: {
    systemTray
  },
  data () {
    return {
      isAutohideTaskbar: false,
      timer: null,
      clock: '',
      isFullScreen: false,
      taskbarPosition: 'bottom'
    }
  },
  methods: {
    ...mapActions(['openApp', 'maximizeApp', 'setUserProfile', 'setUserSettings', 'setRecentVisitedApp', 'setDesktopWallpaper']),
    getUserNameInitials () {
      let firstNameInitial = (this.currentUser.first_name || '')[0] || ''
      let lastNameInitial = (this.currentUser.last_name || '')[0] || ''
      return firstNameInitial + lastNameInitial
    },
    getTime () {
      let today = new Date()
      let hours = today.getHours()
      let minutes = today.getMinutes()

      this.clock = hours + ':' + minutes

      this.timer = setTimeout(this.getTime, 1000)
    },
    exitFullScreen () {
      this.isFullScreen = false
      // exit full-screen
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    },
    goFullScreen () {
      this.isFullScreen = true
      let i = document.getElementById('body')

      // go full-screen
      if (i.requestFullscreen) {
        i.requestFullscreen()
      } else if (i.webkitRequestFullscreen) {
        i.webkitRequestFullscreen()
      } else if (i.mozRequestFullScreen) {
        i.mozRequestFullScreen()
      } else if (i.msRequestFullscreen) {
        i.msRequestFullscreen()
      }
    },
    getAppState (app) {
      return this.$store.state.appWindow[app].appState
    },
    toggleSlider () {
      EventBus.$emit('toggle-slider')
    },
    openAppWindow (app) {
      EventBus.$emit('open-app-window', app)
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'openedApps', 'visualSettings', 'dataSettings', 'userSettingsId'])
  },
  mounted () {
    this.getTime()
    EventBus.$on('hide-taskbar', (payload) => { this.isAutohideTaskbar = payload })
    EventBus.$on('go-full-screen', () => { this.goFullScreen() })
    EventBus.$on('exit-full-screen', () => { this.exitFullScreen() })
    document.addEventListener('fullscreenchange', (event) => {
      if (!document.fullscreenElement) {
        this.isFullScreen = false
      }
    })
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss" scoped>
  .taskbar {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 60px;
    transition: all 0.3s ease-out;
    .taskbar-container {
      display: flex;
      background-color: rgba(0, 0, 0, 0.6);
      border: none;
      border-radius: 0px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      align-items: center;
      .home-icon {
        border-width: 0px;
        position: relative;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        fill: white;
        cursor: pointer;
        transform: rotate(180deg);
        .icon {
          width: 24px;
          height: 24px;
        }
      }
      .taskbar-center {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
      }
    }
    &.auto-hide {
      height: 0;
    }
  }

  .taskbar-icons {
    border-width: 0px;
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .icon {
      width: 24px;
      height: 24px;
    }
    &.home-icon {
      fill: white;
    }
    &.opened {
      .active {
        width: 6px;
        height: 6px;
        position: absolute;
        background-color: white;
        bottom: 6px;
        border-radius: 3px;
      }
    }
  }

  .taskbar-right {
    height: 60px;
    display: flex;
    align-items: center;
    margin: 0 0 0 auto;
    .options {
      position: relative;
      margin-right: 15px;
      display: flex;
      border-width: 0px;
      height: 35px;
      background-color: rgba(255, 255, 255, 0.498039215686275);
      border: none;
      border-radius: 70px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      .txt-white {
        font-family: 'Lato-Bold', 'Lato Bold', 'Lato', sans-serif;
        color: white;
        font-weight: 700;
        font-size: 14px;
        padding: 0 5px;
        text-transform: uppercase;
      }
      .notification-icon {
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          margin: 0 5px;
          width: 20px;
          height: 20px;
          fill: white;
          cursor: pointer;
        }
      }
      .fullscreen {
        display: flex;
        .icon {
          margin: 0 6px;
          width: 15px;
          height: 15px;
          fill: white;
          cursor: pointer;
        }
      }
    }
    .system-tray-container {
      position: absolute;
      height: 320px;
      width: 300px;
      right: 15px;
      bottom: 60px;
      z-index: 2000;
      align-items: center;
      display: none;
      }
      &:hover {
        .system-tray-container {
          display: flex;
        }
      }
  }
</style>
