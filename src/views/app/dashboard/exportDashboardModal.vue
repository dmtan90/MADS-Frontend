<template>
  <b-modal id="export-dashboard" ref="exportDashboard" size="md" hide-footer @hidden="onCancel()">
    <div class="export-dashboard-modal">
      <h3>Export <b>Dashboard 1</b></h3>
      <b-form>
        <b-form-group label="Private Dashboard">
          <toggle-button v-model="exportParams.is_secure" :value="true" :labels="{checked: 'on', unchecked: 'off'}"/>
        </b-form-group>
        <b-form-group label="Password" v-if="exportParams.is_secure">
          <b-form-input v-model="exportParams.password" id="password" type="password" required></b-form-input>
        </b-form-group>
      </b-form>
      <div class="footer">
        <b-button @click="onCancel()">Cancel</b-button>
        <b-button @click="onExport()" class="save-btn">Export</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import dashboardService from '@/services/dashboard.service'

export default {
  data () {
    return {
      exportParams: {
        'is_secure': true,
        'password': ''
      }
    }
  },
  methods: {
    open () {
      this.$refs.exportDashboard.show()
    },
    onCancel () {
    },
    onExport () {
      let params = this.exportParams
      let config = { orgId: this.currentUser.org.id, id: this.selectedDashboard.id }

      dashboardService.export(config, params)
        .then((response) => {
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedDashboard'])
  }
}
</script>

<style lang="scss" scoped>
  .export-dashboard-modal {
    padding: 20px;
    form {
      margin-top: 30px;
    }
    .footer {
      text-align: right;
      .save-btn {
        background-color: #4c92c3 !important;
        color: #ffffff !important;
        min-width: 90px;
      }
    }
  }
</style>
