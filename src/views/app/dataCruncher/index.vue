<template>
  <app-window :appName="'Data_Cruncher'">
    <template v-slot:content>
      <data-cruncher v-if="appVuexState.currentSection === 'dataCruncher'"></data-cruncher>
      <workspace v-if="appVuexState.currentSection === 'workspace'"></workspace>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import dataCruncher from './dataCruncher'
import workspace from './workspace/index'

export default {
  components: {
    appWindow,
    dataCruncher,
    workspace
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['Data_Cruncher']
    }
  }
}
</script>
