<template>
  <div class="h-100">
    <blank-template v-show="showDashboard" ref="blankTemplate" :viewMode="true"></blank-template>
    <password-modal ref="passwordModal" @on-password-enter="onPasswordEnter" :passwordError="passwordError"></password-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import dashboardService from '@/services/dashboard.service'
import blankTemplate from './../blankTemplate'
import passwordModal from './enterPassordModal'

export default {
  components: {
    passwordModal,
    blankTemplate
  },
  data () {
    return {
      dashboardUUID: '',
      dashboardToken: '',
      isPrivateDashboard: true,
      password: '',
      showDashboard: false,
      passwordError: false
    }
  },
  methods: {
    ...mapActions(['setDashboard', 'setPanel']),
    onPasswordEnter (password) {
      this.password = password
      this.fetchExportedDashboard()
    },
    fetchExportedDashboard () {
      let config = { uuid: this.dashboardUUID }
      let params = {
        password: this.password,
        token: this.dashboardToken
      }

      dashboardService.fetchExportedDashboard(config, params)
        .then((dashboard) => {
          if (dashboard.unauthorized) {
            this.passwordError = true
          } else {
            this.$refs.passwordModal.onCancel()
            this.setDashboard(dashboard)
            this.showDashboard = true
            this.setPanel(dashboard.panels[0])
            this.$refs.blankTemplate.loadExportedDashboardPanel(dashboard.panels[0])

            setTimeout(() => {
              this.$refs.blankTemplate.findGridItemWidth()
            }, 100)
          }
        })
    },
    fetchExportedDashboardType () {
      let config = { uuid: this.dashboardUUID }
      let params = { token: this.dashboardToken }

      dashboardService.fetchExportedDashboardType(config, params)
        .then((response) => {
          this.isPrivateDashboard = response.is_secure
          if (this.isPrivateDashboard) {
            this.$refs.passwordModal.open()
          } else {
            this.fetchExportedDashboard()
          }
        })
    }
  },
  mounted () {
    this.dashboardUUID = this.$route.params.uuid
    this.dashboardToken = this.$route.query.token

    localStorage.setItem('dashboard_token', this.dashboardToken)
    localStorage.setItem('dashboard_uuid', this.dashboardUUID)

    this.fetchExportedDashboardType()
  }
}
</script>

<style lang="scss" scoped>

</style>
