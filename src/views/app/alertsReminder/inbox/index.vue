<template>
  <div class="alerts-inbox-wrap">
    <h2 class="page-heading">Hello {{currentUser.first_name}}, you have {{alerts.length}} alerts</h2>
    <div class="filters-box">
      <multiselect v-model="filterAlertRule" :options="filterAlertRuleArr" placeholder="Alert Rule"></multiselect>
      <multiselect v-model="filterAlertAction" :options="filterAlertActionArr" placeholder="Alert Action"></multiselect>
      <multiselect v-model="filterApp" :options="filterAppArr" placeholder="App"></multiselect>
      <multiselect v-model="filterStatus" :options="statusTypes" placeholder="Status"></multiselect>
    </div>
    <vuetable ref="vuetable" :api-mode="false" :fields="fields" :data="alerts">
      <template v-slot:alertTime="props">
        <span>{{dateFormat(props.rowData.created_at)}}</span>
      </template>
      <template v-slot:appName="props">
        <span>{{ renderApp(props.rowData.app) }}</span>
      </template>
      <template v-slot:alertAction="props">
        <span>Email ({{props.rowData.recepient_ids && props.rowData.recepient_ids.length}})</span>
      </template>
      <template v-slot:status="props">
        <span>
          <b-form-group>
            <multiselect
              v-model="props.rowData.status"
              :options="statusTypes"
              @select="onSelectStatus($event, props.rowData.id)"
              :select-label="''"
              :selected-label="''"
              :deselect-label="''"
              :custom-label="renderStatus"
            ></multiselect>
          </b-form-group>
        </span>
      </template>
    </vuetable>

    <mads-pagination :perPage="perPage" :onChange="onPaginationChange" :currentPage="currentPage" :totalRows="totalRows"></mads-pagination>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Vuetable } from 'vuetable-2'
import fields from './fieldsDef'
import alertService from '@/services/alert.service'
import AlertEventBus from '../alertEventBus'
import madsPagination from '../../shared/madsPagination'

export default {
  components: {
    Vuetable,
    madsPagination
  },
  data () {
    return {
      fields: fields,
      alerts: [],
      statusTypes: ['un_resolved', 'resolved'],
      filterAlertRule: null,
      filterAlertRuleArr: ['jkkkk', 'jkkkk', 'jkkkk', 'jkkkk', 'jkkkk', 'jkkkk', 'jkkkk'],
      filterAlertTime: null,
      filterAlertAction: null,
      filterAlertActionArr: ['e-mail', 'sms', 'whatsapp'],
      filterApp: null,
      filterAppArr: ['iot_manager', 'iot_manager'],
      filterStatus: null,
      currentPage: 1,
      perPage: 5,
      totalRows: null
    }
  },
  methods: {
    loadAlerts () {
      let loader = this.$loading.show()
      const config = {
        orgId: this.currentUser.org.id,
        projectId: 1
      }

      const params = {
        page_size: this.perPage,
        page_number: this.currentPage
      }

      alertService.read(config, params).then((res) => {
        loader.hide()
        this.alerts = res.alerts
        this.totalRows = res.total_entries
      })
    },
    onPaginationChange (e) {
      this.currentPage = e
      AlertEventBus.$emit('reload-alert')
    },
    dateFormat (currentTime) {
      return this.$moment(currentTime).format('ddd, DD MMM | H:mm:ss')
    },
    onSelectStatus (event, id) {
      const config = {
        orgId: this.currentUser.org.id,
        id: id
      }

      let payload = {
        status: event
      }

      alertService.update(config, payload).then((res) => {
        AlertEventBus.$emit('reload-alert')
      })
    },
    renderStatus (value) {
      return value === 'resolved' ? 'Resolved' : 'Unresolved'
    },
    renderApp (app) {
      return this.$_.lowerCase(app)
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadAlerts()

    AlertEventBus.$on('reload-alert', () => {
      this.loadAlerts()
    })
  },
  beforeDestroy () {
    AlertEventBus.$off()
  }
}
</script>

<style lang="scss" scoped>
  .alerts-inbox-wrap {
    width: 95%;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
    .page-heading {
      color: #3e4956;
      margin-bottom: 30px;
    }
    .filters-box{
      display: flex;
      justify-content: space-around;
      padding: 20px 0px;
      background-color: #f8f8f8;
      border: 1px solid #e6e6e6;
    }
  }
</style>

<style lang="scss">
  .alerts-inbox-wrap {
    td.app-name {
      text-transform: capitalize;
    }
    .multiselect {
      width: 180px;
    }
  }
</style>
