<template>
  <app-window :appName="'digitalTwin'">
    <template v-slot:content>
      <div v-if="appVuexState.currentSection === 'digitalTwin'" class="h-100">
        <digital-twin></digital-twin>
      </div>
      <div v-if="appVuexState.currentSection === 'settings'" class="h-100">
        <!-- <settings></settings> -->
      </div>
      <div v-if="appVuexState.currentSection === '3dModel'" class="h-100">
        <three-d-model></three-d-model>
      </div>
      <help :appName="'Digital Twin'" v-if="appVuexState.currentSection === 'help'"></help>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import digitalTwin from './digitalTwin'
import ThreeDModel from './3DModel.vue'
import help from './../shared/help'
// import settings from './settings'

export default {
  components: {
    appWindow,
    digitalTwin,
    ThreeDModel,
    help
  },
  data () {
    return {
    }
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['digitalTwin']
    }
  }
}
</script>
