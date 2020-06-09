<template>
  <app-window :appName="'Dashboards'">
    <template v-slot:content>
      <dashboards v-if="appVuexState.currentSection === 'dashboards'"></dashboards>
      <new-section v-if="appVuexState.currentSection === 'new'"></new-section>
      <open-section v-if="appVuexState.currentSection === 'open'"></open-section>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import dashboards from './dashboard.vue'
import newSection from './new/index.vue'
import openSection from './open/index.vue'

export default {
  components: {
    appWindow,
    dashboards,
    newSection,
    openSection
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
