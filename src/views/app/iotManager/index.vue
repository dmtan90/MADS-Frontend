<template>
  <app-window :appName="'IoT_Manager'">
    <template v-slot:content>
      <div v-if="appVuexState.currentSection === 'iotManager'" class="h-100">
        <iot-manager></iot-manager>
      </div>
      <div v-if="appVuexState.currentSection === 'topology'" class="h-100">
      </div>
      <div v-if="appVuexState.currentSection === 'gateways'" class="h-100">
        <gateways></gateways>
      </div>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import iotManager from './iotManager'
import gateways from './gateways'

export default {
  components: {
    appWindow,
    iotManager,
    gateways
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
