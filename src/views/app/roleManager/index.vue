<template>
  <app-window :appName="'Role_Manager'">
    <template v-slot:content>
      <role-manager v-if="appVuexState.currentSection === 'roleManager'"></role-manager>
      <users v-if="appVuexState.currentSection === 'users'"></users>
      <projects v-if="appVuexState.currentSection === 'projects'"></projects>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import roleManager from './roleManager'
import users from './users/index'
import projects from './projects/index'

export default {
  components: {
    appWindow,
    roleManager,
    users,
    projects
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['Role_Manager']
    }
  }
}
</script>
