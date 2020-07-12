<template>
  <app-window :appName="'IoT_Manager'">
    <template v-slot:content>
      IOT manager
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
      return this.$store.state.appWindow['IoT_Manager']
    }
  }
}
</script>
