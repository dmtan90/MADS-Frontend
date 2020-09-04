<template>
  <div>
    <password-modal ref="passwordModal" @on-password-enter="onPasswordEnter"></password-modal>
  </div>
</template>

<script>
import dashboardService from '@/services/dashboard.service'
import passwordModal from './enterPassordModal'

export default {
  components: {
    passwordModal
  },
  data () {
    return {
      dashboardUUID: '',
      dashboardToken: '',
      isPrivateDashboard: true,
      password: ''
    }
  },
  methods: {
    onPasswordEnter (password) {
      debugger

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
        .then((response) => {
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

    this.fetchExportedDashboardType()
  }
}
</script>

<style lang="scss" scoped>

</style>
