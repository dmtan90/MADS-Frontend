<template>
  <app-window :appName="'dataInsights'">
    <template v-slot:content>
      <div v-if="appVuexState.currentSection === 'home'" class="h-100">
        <data-insights></data-insights>
      </div>
      <div v-if="appVuexState.currentSection === 'builders'" class="h-100">
        <div> Builders section </div>
      </div>
      <div v-if="appVuexState.currentSection === 'settings'" class="h-100">
        <div> Settings </div>
      </div>
      <help :appName="'Data Insights'" v-if="appVuexState.currentSection === 'help'"></help>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import help from './../shared/help'
import dataInsights from './dataInsights'

export default {
  components: {
    appWindow,
    help,
    dataInsights
  },
  data () {
    return {
    }
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['dataInsights']
    }
  }
}
</script>
