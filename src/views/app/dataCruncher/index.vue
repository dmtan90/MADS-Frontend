<template>
  <app-window :appName="'Data_Cruncher'">
    <template v-slot:content>
      <data-cruncher v-if="appVuexState.currentSection === 'dataCruncher'"></data-cruncher>
      <workspace v-if="appVuexState.currentSection === 'workspace'"></workspace>
      <settings v-if="appVuexState.currentSection === 'settings'"></settings>
      <data-lake v-if="appVuexState.currentSection === 'dataLake'"></data-lake>
      <tasks v-if="appVuexState.currentSection === 'tasks'"></tasks>
      <exported-widgets v-if="appVuexState.currentSection === 'exportedWidgets'"></exported-widgets>
      <functions v-if="appVuexState.currentSection === 'functions'"></functions>
      <help :appName="'Data Cruncher'" v-if="appVuexState.currentSection === 'help'"></help>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import dataCruncher from './dataCruncher'
import workspace from './workspace/index'
import dataLake from './dataLake'
import tasks from './tasks'
import exportedWidgets from './exportedWidgets'
import functions from './functions'
import help from './../shared/help'
import settings from './settings'

export default {
  components: {
    appWindow,
    dataCruncher,
    workspace,
    dataLake,
    tasks,
    exportedWidgets,
    functions,
    settings,
    help
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['Data_Cruncher']
    }
  },
  mounted () {
  }
}
</script>
