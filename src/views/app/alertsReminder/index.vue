<template>
  <app-window :appName="'Alerts_Reminder'">
    <template v-slot:content>
      Alerts Reminder
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
      return this.$store.state.appWindow['Alerts_Reminder']
    }
  }
}
</script>
