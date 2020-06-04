<template>
  <app-window :appName="'entityManager'">
    <template v-slot:content>
      <entity-manager v-if="appVuexState.currentSection === 'entityManager'"></entity-manager>
      <div v-if="appVuexState.currentSection === 'entityMap'" class="h-100">
        <project-list v-if="!selectedProject"></project-list>
        <entity-map v-if="selectedProject"></entity-map>
      </div>
      <div v-if="appVuexState.currentSection === 'assets'" class="h-100">
        <project-list v-if="!selectedProject"></project-list>
        <assets v-if="selectedProject"></assets>
      </div>
      <div v-if="appVuexState.currentSection === 'sensors'" class="h-100">
        <project-list v-if="!selectedProject"></project-list>
        <sensors v-if="selectedProject"></sensors>
      </div>
    </template>
  </app-window>
</template>

<script>
import { mapGetters } from 'vuex'
import appWindow from './../appWindow'
import entityManager from './entityManager'
import entityMap from './entityMap/index'
import assets from './assets/index'
import sensors from './sensors/index'
import projectList from './projectList'

export default {
  components: {
    appWindow,
    entityManager,
    entityMap,
    assets,
    sensors,
    projectList
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['selectedProject']),
    appVuexState () {
      return this.$store.state.appWindow['entityManager']
    }
  }
}
</script>
