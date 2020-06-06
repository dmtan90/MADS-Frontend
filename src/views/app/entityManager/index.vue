<template>
  <app-window :appName="'entityManager'">
    <template v-slot:content>
      <entity-manager v-if="appVuexState.currentSection === 'entityManager'"></entity-manager>
      <div v-if="appVuexState.currentSection === 'entityMap'" class="h-100">
        <project-list v-if="entityManagerCurrentPage === 'index'" :source="'entity-map'"></project-list>
        <entity-map v-else></entity-map>
      </div>
      <div v-if="appVuexState.currentSection === 'assets'" class="h-100">
        <project-list v-if="entityManagerCurrentPage === 'index'" :source="'assets-index'"></project-list>
        <assets v-else></assets>
      </div>
      <div v-if="appVuexState.currentSection === 'sensors'" class="h-100">
        <project-list v-if="entityManagerCurrentPage === 'index'" :source="'sensors-index'"></project-list>
        <sensors v-else></sensors>
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
import projectList from './../roleManager/projects/index'

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
    ...mapGetters(['selectedProject', 'entityManagerCurrentPage']),
    appVuexState () {
      return this.$store.state.appWindow['entityManager']
    }
  }
}
</script>
