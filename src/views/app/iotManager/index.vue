<template>
  <app-window :appName="'IoT_Manager'">
    <template v-slot:content>
      <div v-if="appVuexState.currentSection === 'iotManager'" class="h-100">
        <iot-manager></iot-manager>
      </div>
      <div v-if="appVuexState.currentSection === 'topology'" class="h-100">
      </div>
      <div v-if="appVuexState.currentSection === 'gateways'" class="h-100">
        <project-list v-if="entityManagerCurrentPage === 'index'" :source="'iotManager'"></project-list>
        <gateways v-else></gateways>
      </div>
      <help :appName="'IOT Manager'" v-if="appVuexState.currentSection === 'help'"></help>
    </template>
  </app-window>
</template>

<script>
import { mapGetters } from 'vuex'
import appWindow from './../appWindow'
import iotManager from './iotManager'
import gateways from './gateways'
import help from './../shared/help'
import projectList from './../roleManager/projects/index'

export default {
  components: {
    appWindow,
    iotManager,
    gateways,
    help,
    projectList
  },
  data () {
    return {
      showProjectList: true
    }
  },
  computed: {
    ...mapGetters(['selectedProject', 'entityManagerCurrentPage']),
    appVuexState () {
      return this.$store.state.appWindow['IoT_Manager']
    }
  }
}
</script>
