<template>
  <app-window :appName="'Dashboards'">
    <template v-slot:content>
      <dashboards v-if="appVuexState.currentSection === 'dashboards'"></dashboards>
      <new-section v-if="appVuexState.currentSection === 'new'"></new-section>
      <open-section v-if="appVuexState.currentSection === 'open'"></open-section>
      <recent-section v-if="appVuexState.currentSection === 'recent'"></recent-section>
      <share-section v-if="appVuexState.currentSection === 'share'"></share-section>
      <help :appName="'Dashboard'" v-if="appVuexState.currentSection === 'help'"></help>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import dashboards from './dashboard.vue'
import newSection from './new/index.vue'
import openSection from './open/index.vue'
import recentSection from './recent/index.vue'
import shareSection from './share/index.vue'
import help from './../shared/help'

export default {
  components: {
    appWindow,
    dashboards,
    newSection,
    openSection,
    recentSection,
    shareSection,
    help
  },
  data () {
    return {
    }
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['Dashboards']
    }
  }
}
</script>
