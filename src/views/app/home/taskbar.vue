<template>
  <div class="taskbar" :class="{'auto-hide': isAutohideTaskbar}">
    <div class="taskbar-container" :class="{'locked': isScreenLocked}">
      <div class="home-icon" @click="toggleSlider()" v-if="!isScreenLocked">
        <svg class="icon">
          <use xlink:href="/assets/img/mads-app-icons.svg#app-launcher"></use>
        </svg>
      </div>
      <div class="taskbar-center" v-if="!isScreenLocked">
        <!-- <div class="taskbar-icons app-icon" v-tooltip="'App Store'">
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
        </div> -->
        <div class="taskbar-icons app-icon" :class="{'opened': getAppState('Dashboards') !== 'closed'}" @click="openAppWindow('Dashboards')" v-tooltip="'Dashboard'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-dashboard"></use>
          </svg>
          <div class="active"></div>
        </div>
        <div class="taskbar-icons app-icon" :class="{'opened': getAppState('Widget_Manager') !== 'closed'}" @click="openAppWindow('Widget_Manager')" v-tooltip="'Widget Manager'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-widget-manager"></use>
          </svg>
          <div class="active"></div>
        </div>
        <div class="taskbar-icons app-icon" :class="{'opened': getAppState('Data_Cruncher') !== 'closed'}" @click="openAppWindow('Data_Cruncher')" v-tooltip="'Data Cruncher'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-data-cruncher"></use>
          </svg>
          <div class="active"></div>
        </div>
        <div class="taskbar-icons app-icon" :class="{'opened': getAppState('Role_Manager') !== 'closed'}" @click="openAppWindow('Role_Manager')" v-tooltip="'Role Manager'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-role-manager"></use>
          </svg>
          <div class="active"></div>
        </div>
        <div class="taskbar-icons app-icon" :class="{'opened': getAppState('Entity_Manager') !== 'closed'}" @click="openAppWindow('Entity_Manager')" v-tooltip="'Entity Manager'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-entity-manager"></use>
          </svg>
          <div class="active"></div>
        </div>
        <div class="taskbar-icons app-icon" :class="{'opened': getAppState('IoT_Manager') !== 'closed'}" @click="openAppWindow('IoT_Manager')" v-tooltip="'IOT Manager'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-iot-manager"></use>
          </svg>
          <div class="active"></div>
        </div>


         <div class="taskbar-icons app-icon" :class="{'opened': getAppState('Alerts_Reminder') !== 'closed'}" @click="openAppWindow('Alerts_Reminder')" v-tooltip="'Alerts Reminder'">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-alerts-reminders"></use>
          </svg>
          <div class="active"></div>
        </div>


      </div>
      <div class="taskbar-right" :class="{'auto-margin': isScreenLocked}">
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
          <div class="txt-white">{{currentTime | timeFormat}}</div>
        </div>
        <div class="system-tray-container" v-if="!isScreenLocked">
          <system-tray :userNameInitials="getUserNameInitials()" :isFullScreen="isFullScreen" :currentTime="currentTime" :currentTimeZone="currentTimeZone"></system-tray>
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
      taskbarPosition: 'bottom',
      currentTime: this.$moment(),
      currentTimeZone: this.$moment().tz(this.$moment.tz.guess(true)).format('z')
    }
  },
  methods: {
    ...mapActions(['openApp', 'maximizeApp', 'setUserProfile', 'setUserSettings', 'setRecentVisitedApp', 'setDesktopWallpaper']),
    getUserNameInitials () {
      let firstNameInitial = (this.currentUser.first_name || '')[0] || ''
      let lastNameInitial = (this.currentUser.last_name || '')[0] || ''
      return firstNameInitial + lastNameInitial
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
  filters: {
    timeFormat (currentTime) {
      return currentTime.format('H:mm')
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'openedApps', 'visualSettings', 'dataSettings', 'userSettingsId'])
  },
  mounted () {
    EventBus.$on('hide-taskbar', (payload) => { this.isAutohideTaskbar = payload })
    EventBus.$on('go-full-screen', () => { this.goFullScreen() })
    EventBus.$on('exit-full-screen', () => { this.exitFullScreen() })

    // FullScreen Event Listener
    document.addEventListener('fullscreenchange', (event) => {
      if (!document.fullscreenElement) {
        this.isFullScreen = false
      }
    })

    // Clock Timer
    this.timer = setInterval(() => {
      this.currentTime = this.$moment()
    }, 1000)
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
      background-color: rgba(57, 63, 77, 0.9);
      border: none;
      border-radius: 0px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      align-items: center;
      &.locked {
        background-color: rgba(0, 0, 0, 0.6);
      }
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
    &.auto-margin {
      margin: 0 0 0 auto;
    }
    .options {
      position: relative;
      margin-right: 15px;
      display: flex;
      border-width: 0px;
      height: 35px;
      background-color: rgba(255, 255, 255, 0.5);
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
      right: 15px;
      bottom: 60px;
      z-index: 2000;
      align-items: center;
      display: none;
      padding: 10px 0;
      }
      &:hover {
        .system-tray-container {
          display: flex;
        }
      }
  }
</style>
