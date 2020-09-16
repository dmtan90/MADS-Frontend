<template>
  <app-window :appName="'dataInsights'">
    <template v-slot:content>
      <div v-if="appVuexState.currentSection === 'builders'" class="h-100">
        <div> Builders section </div>
      </div>
      <div v-if="appVuexState.currentSection === 'settings'" class="h-100">
        <div> Settings </div>
      </div>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'

export default {
  components: {
    appWindow
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
