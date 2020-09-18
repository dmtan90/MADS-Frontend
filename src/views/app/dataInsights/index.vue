<template>
  <app-window :appName="'dataInsights'">
    <template v-slot:content>
      <builders v-if="appVuexState.currentSection === 'builders'" class="h-100"></builders>
      <div v-if="appVuexState.currentSection === 'settings'" class="h-100">
        <div> Settings </div>
      </div>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import builders from './builders'

export default {
  components: {
    appWindow,
    builders
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
