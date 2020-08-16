<template>
  <app-window :appName="'Alerts_Reminder'">
    <template v-slot:content>
      <div v-if="appVuexState.currentSection === 'alerts'" class="h-100">
        <alerts></alerts>
      </div>
      <div v-if="appVuexState.currentSection === 'inbox'" class="h-100">
        <inbox></inbox>
      </div>
      <settings v-if="appVuexState.currentSection === 'settings'" class="h-100">
      </settings>
      <logs v-if="appVuexState.currentSection === 'logs'" class="h-100">
      </logs>
      <projects v-if="appVuexState.currentSection === 'projects'" class="h-100">
      </projects>
      <apps v-if="appVuexState.currentSection === 'apps'" class="h-100">
      </apps>
      <div v-if="appVuexState.currentSection === 'help'" class="h-100">
        <help :appName="'Alerts Reminder'"></help>
      </div>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import alerts from './alerts'
import inbox from './inbox'
import help from '../shared/help'
import settings from './settings'
import logs from './logs'
import projects from './projects'
import apps from './apps'
// import alertEventBus from './alertEventBus'

export default {
  components: {
    appWindow,
    alerts,
    inbox,
    settings,
    logs,
    projects,
    apps,
    help
  },
  data () {
    return {
    }
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['Alerts_Reminder']
    }
  }
}
</script>
