<template>
  <app-window :appName="'Widget_Manager'">
    <template v-slot:content>
      <widget-manager v-if="appVuexState.currentSection === 'widgetManager'"></widget-manager>
      <widget-store :appVuexState="appVuexState" v-if="appVuexState.currentSection === 'widgetStore'"></widget-store>
      <my-widgets v-if="appVuexState.currentSection === 'myWidgets'"></my-widgets>
      <editor v-if="appVuexState.currentSection === 'editor'"></editor>
      <settings v-if="appVuexState.currentSection === 'settings'"></settings>
      <help :appName="'Widget Manager'" v-if="appVuexState.currentSection === 'help'"></help>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import widgetManager from './widgetManager'
import widgetStore from './widgetStore'
import myWidgets from './myWidgets'
import editor from './editor'
import settings from './settings'
import help from './../shared/help'

export default {
  components: {
    appWindow,
    widgetManager,
    widgetStore,
    myWidgets,
    editor,
    settings,
    help
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['Widget_Manager']
    }
  }
}
</script>
