<template>
  <app-window :appName="'Widget_Manager'">
    <template v-slot:content>
      <widget-manager v-if="appVuexState.currentSection === 'widgetManager'"></widget-manager>
      <widget-store :appVuexState="appVuexState" v-if="appVuexState.currentSection === 'widgetStore'"></widget-store>
      <my-widgets v-if="appVuexState.currentSection === 'myWidgets'"></my-widgets>
      <editor v-if="appVuexState.currentSection === 'editor'"></editor>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import widgetManager from './widgetManager'
import widgetStore from './widgetStore'
import myWidgets from './myWidgets'
import editor from './editor'

export default {
  components: {
    appWindow,
    widgetManager,
    widgetStore,
    myWidgets,
    editor
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['Widget_Manager']
    }
  }
}
</script>
