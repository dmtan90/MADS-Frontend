<template>
    <div class="alerts-rule">
        <div class="header">
            <button class="btn" @click="addAlertRules()">+ Add Alerts Rule</button>
        </div>
        <vuetable
            ref="vuetable"
            :api-mode="false"
            :fields="fields"
            :data="data"
        >
         <template v-slot:date="props">
            <span>{{ dateFormat(props.rowData.created_at)}}</span>
        </template>
        <template v-slot:alertAction="props">
            <span v-for="(data, index) in props.rowData.recepient_ids" :key="index">{{data.email}}</span>
        </template>
        <template v-slot:actions="props">
            <span>
                <b-form-group label="Activity Tracking">
                    <toggle-button :value="true" :labels="{checked: 'on', unchecked: 'off'}" @change="changeSwitch"/>
                </b-form-group>
            </span>
            <span class="edit-alert-rules" @click="editAlertRules(props.rowData)">Edit</span>
        </template>
        </vuetable>
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

export default {
  components: {
    Vuetable,
    addEditAlertRules
  },
  data () {
    return {
      data: [],
      fields: fields
    }
  },
  methods: {
    loadAlertRules () {
      const config = {
        orgId: this.currentUser.org.id,
        projectId: 1
      }

      const params = {
        page_size: 4,
        page_number: 1
      }

      alertRulesService.read(config, params)
        .then((res) => {
          this.data = res.alert_rules
        })
    },
    addAlertRules () {
      this.$refs.addEditAlertRules.add()
    },
    editAlertRules (data) {
      this.$refs.addEditAlertRules.edit(data)
    },
    dateFormat (currentTime) {
      return this.$moment(currentTime).format('ddd, DD MMM | H:mm')
    },
    changeSwitch (e) {
      debugger
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
  }
}
</script>

<style lang="scss" scoped>
    .alerts-rule{
        .header{
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
        }
        .edit-alert-rules{
            text-decoration: underline;
            color: #2aa7ff;
            cursor: pointer;
            padding: 0 10px;
        }
    }
</style>
