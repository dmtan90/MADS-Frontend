<template>
  <app-window :appName="'Role_Manager'">
    <template v-slot:content>
      <role-manager v-if="appVuexState.currentSection === 'roleManager'"></role-manager>
      <users v-if="appVuexState.currentSection === 'users'"></users>
      <projects v-if="appVuexState.currentSection === 'projects'"></projects>
      <settings v-if="appVuexState.currentSection === 'settings'"></settings>
      <activity v-if="appVuexState.currentSection === 'activity'"></activity>
      <help :appName="'Role Manager'" v-if="appVuexState.currentSection === 'help'"></help>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import roleManager from './roleManager'
import users from './users/index'
import projects from './projects/index'
import activity from './activity'
import settings from './settings'
import help from './../shared/help'

export default {
  components: {
    appWindow,
    roleManager,
    users,
    projects,
    activity,
    settings,
    help
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['Role_Manager']
    }
  }
}
</script>
