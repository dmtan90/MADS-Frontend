<template>
  <div>
    <div class="app-container" :class="{'maximized': getAppState('Widget_Manager') === 'maximize'}" :style="{'z-index': getAppZIndex('Widget_Manager')}">
      <widget-manager v-if="getAppState('Widget_Manager') !== 'closed'"></widget-manager>
    </div>
    <div class="app-container" :class="{'maximized': getAppState('Data_Cruncher') === 'maximize'}" :style="{'z-index': getAppZIndex('Data_Cruncher')}">
      <data-cruncher v-if="getAppState('Data_Cruncher') !== 'closed'"></data-cruncher>
    </div>
    <div class="app-container" :class="{'maximized': getAppState('Role_Manager') === 'maximize'}" :style="{'z-index': getAppZIndex('Role_Manager')}">
      <role-manager v-if="getAppState('Role_Manager') !== 'closed'"></role-manager>
    </div>
    <div class="app-container" :class="{'maximized': getAppState('Entity_Manager') === 'maximize'}" :style="{'z-index': getAppZIndex('Entity_Manager')}">
      <entity-manager v-if="getAppState('Entity_Manager') !== 'closed'"></entity-manager>
    </div>
    <div class="app-container" :class="{'maximized': getAppState('Dashboards') === 'maximize'}" :style="{'z-index': getAppZIndex('Dashboards')}">
      <dashboard v-if="getAppState('Dashboards') !== 'closed'"></dashboard>
    </div>
    <div class="app-container" :class="{'maximized': getAppState('IoT_Manager') === 'maximize'}" :style="{'z-index': getAppZIndex('IoT_Manager')}">
      <iot-manager v-if="getAppState('IoT_Manager') !== 'closed'"></iot-manager>
    </div>
    <div class="app-container" :class="{'maximized': getAppState('Alerts_Reminder') === 'maximize'}" :style="{'z-index': getAppZIndex('Alerts_Reminder')}">
      <alerts-reminder v-if="getAppState('Alerts_Reminder') !== 'closed'"></alerts-reminder>
    </div>
    <div class="app-container" :class="{'maximized': getAppState('dataInsights') === 'maximize'}" :style="{'z-index': getAppZIndex('dataInsights')}">
      <data-insights v-if="getAppState('dataInsights') !== 'closed'"></data-insights>
    </div>
    <div class="app-container" :class="{'maximized': getAppState('digitalTwin') === 'maximize'}" :style="{'z-index': getAppZIndex('digitalTwin')}">
      <digital-twin v-if="getAppState('digitalTwin') !== 'closed'"></digital-twin>
    </div>
    <div class="mads-desktop" @contextmenu="$easycm($event,$root)">
      <easy-cm :list="getContextMenuOptions()" @ecmcb="desktopContextMenuEvent" :underline="false" :arrow="true"></easy-cm>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EventBus from './event-bus'
import widgetManager from './../widgetManager'
import dataCruncher from './../dataCruncher'
import roleManager from './../roleManager'
import entityManager from './../entityManager'
import dashboard from './../dashboard'
import iotManager from './../iotManager'
import alertsReminder from './../alertsReminder'
import dataInsights from './../dataInsights'
import digitalTwin from './../digitalTwin'

export default {
  components: {
    widgetManager,
    dataCruncher,
    roleManager,
    entityManager,
    dashboard,
    iotManager,
    alertsReminder,
    dataInsights,
    digitalTwin
  },
  data () {
    return {
      isAutohideTaskbar: false
    }
  },
  methods: {
    ...mapActions(['openApp', 'maximizeApp', 'setUserProfile', 'setUserSettings', 'setRecentVisitedApp', 'setDesktopWallpaper']),
    getAppState (app) {
      return this.$store.state.appWindow[app].appState
    },
    getAppZIndex (app) {
      return this.$store.state.appWindow[app].appZindex
    },
    openAppWindow (app) {
      this.showSlider = false
      this.openApp(app)
      this.setRecentVisitedApp(app)
      EventBus.$emit('save-user-settings')
    },
    getContextMenuOptions () {
      let autohideTaskbarName = this.isAutohideTaskbar ? 'Show Taskbar' : 'Autohide Taskbar'
      return [
        { text: autohideTaskbarName },
        { text: 'Taskbar Position' },
        { text: 'Set Wallpaper' }
      ]
    },
    setTaskbarPosition (event) {
      switch (event) {
        case 0:
          this.taskbarPosition = 'bottom'
          break
        case 1:
          this.taskbarPosition = 'left'
          break
        case 2:
          this.taskbarPosition = 'right'
          break
      }
    },
    desktopContextMenuEvent (event) {
      switch (event[0]) {
        case 0:
          this.isAutohideTaskbar = !this.isAutohideTaskbar
          EventBus.$emit('hide-taskbar', this.isAutohideTaskbar)
          break
        case 1:
          this.setTaskbarPosition(event[1])
          break
        case 2:
          EventBus.$emit('set-wallpaper')
          break
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'openedApps', 'visualSettings', 'dataSettings', 'userSettingsId'])
  },
  mounted () {
    EventBus.$on('open-app-window', (app) => { this.openAppWindow(app) })
  },
  beforeDestroy () {
    EventBus.$off()
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    height: 0;
    width: 100%;
    position: absolute;
    transition: all .5s ease-out;
    bottom: 60px;
    background-color: none;
    &.maximized {
      height: calc(100% - 60px);
      width: 100%;
      left: 0;
    }
  }
  .mads-desktop {
    position: absolute;
    height: calc(100% - 60px);
    background-color: transparent;
    width: 100%;
    z-index: 1000;
  }
</style>
