<template>
  <app-window :appName="'entityManager'">
    <template v-slot:content>
      <entity-manager v-if="appVuexState.currentSection === 'entityManager'"></entity-manager>
      <entity-map v-if="appVuexState.currentSection === 'entityMap'"></entity-map>
      <assets v-if="appVuexState.currentSection === 'assets'"></assets>
      <sensors v-if="appVuexState.currentSection === 'sensors'"></sensors>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import entityManager from './entityManager'
import entityMap from './entityMap/index'
import assets from './assets/index'
import sensors from './sensors/index'

export default {
  components: {
    appWindow,
    entityManager,
    entityMap,
    assets,
    sensors
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['entityManager']
    }
  }
}
</script>
