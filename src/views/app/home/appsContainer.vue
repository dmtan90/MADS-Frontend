<template>
  <div>
    <div class="app-container" :class="{'maximized': getAppState('widgetManager') === 'maximize'}" :style="{'z-index': getAppZIndex('widgetManager')}">
      <widget-manager v-if="getAppState('widgetManager') !== 'closed'"></widget-manager>
    </div>
    <div class="app-container" :class="{'maximized': getAppState('dataCruncher') === 'maximize'}" :style="{'z-index': getAppZIndex('dataCruncher')}">
      <data-cruncher v-if="getAppState('dataCruncher') !== 'closed'"></data-cruncher>
    </div>
    <div class="app-container" :class="{'maximized': getAppState('roleManager') === 'maximize'}" :style="{'z-index': getAppZIndex('roleManager')}">
      <role-manager v-if="getAppState('roleManager') !== 'closed'"></role-manager>
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

export default {
  components: {
    widgetManager,
    dataCruncher,
    roleManager
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
      background-color: white;
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
