<template>
  <app-window :appName="'Alerts_Reminder'">
    <template v-slot:content>
      <div v-if="appVuexState.currentSection === 'alerts'" class="h-100">
        <alerts></alerts>
      </div>
      <div v-if="appVuexState.currentSection === 'inbox'" class="h-100">
        <inbox></inbox>
      </div>
      <div v-if="appVuexState.currentSection === 'projects'" class="h-100">
        projects
      </div>
      <div v-if="appVuexState.currentSection === 'apps'" class="h-100">
        apps
      </div>
      <div v-if="appVuexState.currentSection === 'logs'" class="h-100">
        logs
      </div>
      <div v-if="appVuexState.currentSection === 'settings'" class="h-100">
        settings
      </div>
      <div v-if="appVuexState.currentSection === 'help'" class="h-100">
        help
      </div>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import alerts from './alerts'
import inbox from './inbox'

export default {
  components: {
    appWindow,
    alerts,
    inbox
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
