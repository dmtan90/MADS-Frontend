<template>
  <app-window :appName="'Data_Cruncher'">
    <template v-slot:content>
      <data-cruncher v-if="appVuexState.currentSection === 'dataCruncher'"></data-cruncher>
      <workspace v-if="appVuexState.currentSection === 'workspace'"></workspace>
      <help :appName="'Data Cruncher'" v-if="appVuexState.currentSection === 'help'"></help>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import dataCruncher from './dataCruncher'
import workspace from './workspace/index'
import help from './../shared/help'

export default {
  components: {
    appWindow,
    dataCruncher,
    workspace,
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
