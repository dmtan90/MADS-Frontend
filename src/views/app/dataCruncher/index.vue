<template>
  <app-window :appName="'dataCruncher'">
    <template v-slot:content>
      <data-cruncher v-if="appVuexState.currentSection === 'dataCruncher'"></data-cruncher>
      <workspace v-if="appVuexState.currentSection === 'workspace'"></workspace>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import dataCruncher from './dataCruncher'
import workspace from './workspace'

export default {
  components: {
    appWindow,
    dataCruncher,
    workspace
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['dataCruncher']
    }
  }
}
</script>
