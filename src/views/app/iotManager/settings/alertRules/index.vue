<template>
  <div class="alerts-rule">
    <div class="header">
      <button class="btn add-rule-btn" @click="addAlertRules()">
        <span>Add Rule</span>
        <svg class="icon">
          <use xlink:href="/assets/img/mads-common-icons.svg#plus"></use>
        </svg>
      </button>
    </div>
    <vuetable ref="vuetable" :api-mode="false" :fields="fields" :data="data">
      <template v-slot:date="props">
        <span>{{ dateFormat(props.rowData.created_at) }}</span>
      </template>
      <template v-slot:severity="props">
        <span>{{ mapSeverity(props.rowData.severity) }}</span>
      </template>
      <template v-slot:alertAction="props">
        <span
          v-for="(data, index) in props.rowData.recepient_ids"
          :key="index"
          >{{ data.email }}</span
        >
      </template>
      <template v-slot:status="props">
        <span>
          <b-form-group>
            <toggle-button
              :value="props.rowData.status === 'enable' ? true : false"
              @change="handleStatus($event, props.rowData)"
            />
          </b-form-group>
        </span>
      </template>
      <template v-slot:actions="props">
        <span class="edit-alert-rules" @click="editAlertRules(props.rowData)"
          >Edit</span
        >
      </template>
    </vuetable>
    <mads-pagination :perPage="perPage" :onChange="onPaginationChange" :currentPage="currentPage" :totalRows="totalRows"></mads-pagination>
    <add-edit-alert-rules ref="addEditAlertRules"></add-edit-alert-rules>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fields from './fieldsDef'
import { Vuetable } from 'vuetable-2'
import addEditAlertRules from './addEditAlertRules'
import alertRulesService from '@/services/alertRules.service'
import AlertRulesEventBus from './alertRulesEventBus'
import madsPagination from '../../../shared/madsPagination'

const severityMapping = {
  1: 'Low',
  2: 'Medium',
  3: 'High'
}

export default {
  components: {
    Vuetable,
    addEditAlertRules,
    madsPagination
  },
  data () {
    return {
      data: [],
      fields: fields,
      currentPage: 1,
      perPage: 5,
      totalRows: null
    }
  },
  methods: {
    loadAlertRules () {
      let loader = this.$loading.show()

      const config = {
        orgId: this.currentUser.org.id,
        projectId: 1
      }

      const params = {
        page_size: this.perPage,
        page_number: this.currentPage
      }

      alertRulesService.read(config, params).then((res) => {
        loader.hide()
        this.data = res.alert_rules
        this.totalRows = res.total_entries
      })
    },
    addAlertRules () {
      this.$refs.addEditAlertRules.add()
    },
    editAlertRules (data) {
      this.$refs.addEditAlertRules.edit(data)
    },
    dateFormat (currentTime) {
      return this.$moment(currentTime).format('ddd, DD MMM')
    },
    mapSeverity (severity) {
      return severityMapping[severity]
    },
    handleStatus (e, data) {
      const config = {
        orgId: this.currentUser.org.id,
        id: data.id
      }

      let payload = {
        project_id: data.project_id
      }

      if (e.value) {
        payload = this.$_.assign(payload, { status: 'enable' })
        alertRulesService.update(config, payload).then((res) => {
          AlertRulesEventBus.$emit('reload-alertsRule')
        })
      } else {
        payload = this.$_.assign(payload, { status: 'disable' })
        alertRulesService.update(config, payload).then((res) => {
          AlertRulesEventBus.$emit('reload-alertsRule')
        })
      }
    },
    onPaginationChange (e) {
      this.currentPage = e
      this.loadAlertRules()
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadAlertRules()

    AlertRulesEventBus.$on('reload-alertsRule', () => {
      this.loadAlertRules()
    })
  },
  beforeDestroy () {
    AlertRulesEventBus.$off()
  }
}
</script>

<style lang="scss" scoped>
.alerts-rule {
  .header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    .add-rule-btn {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 10px;
      width: 115px;
      height: 40px;
      span {
        font-size: 15px;
      }
      .icon {
        width: 21px;
        height: 21px;
      }
    }
  }
  .edit-alert-rules {
    text-decoration: underline;
    color: #2aa7ff;
    cursor: pointer;
    padding: 0 10px;
  }
}
</style>
