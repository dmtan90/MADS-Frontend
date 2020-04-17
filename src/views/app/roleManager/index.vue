<template>
  <app-window :appName="'roleManager'">
    <template v-slot:content>
      <role-manager v-if="appVuexState.currentSection === 'roleManager'"></role-manager>
      <users v-if="appVuexState.currentSection === 'users'"></users>
      <teams v-if="appVuexState.currentSection === 'teams'"></teams>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import roleManager from './roleManager'
import users from './users/index'
import teams from './teams/index'

export default {
  components: {
    appWindow,
    roleManager,
    users,
    teams
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['roleManager']
    }
  }
}
</script>
