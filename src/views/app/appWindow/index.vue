<template>
  <div class="app-window" :style="{'z-index': appVuexState.appZindex}" :class="{'minimized': appVuexState.appState === 'minimize'}">
    <app-header :appVuexState="appVuexState"></app-header>
    <div class="break"></div>
    <app-sidebar :appVuexState="appVuexState"></app-sidebar>
    <div class="app-content" :class="{'full-width': appVuexState.sidebarHidden}">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import appHeader from './app-header'
import appSidebar from './app-sidebar'

export default {
  props: ['appName'],
  components: {
    appHeader,
    appSidebar
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow[this.appName]
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-window {
    height: 100%;
    background-color: white;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .app-content {
      display: inline-block;
      height: calc(100% - 45px);
      width: calc(100% - 100px);
      margin-left: 100px;
      margin-top: 40px;
      overflow: auto;
      &.full-width {
        margin-left: 0;
        width: 100%;
      }
    }
    &.minimized {
      .app-header {
        display: none;
      }
      .app-sidebar {
        display: none;
      }
    }
  }
</style>
