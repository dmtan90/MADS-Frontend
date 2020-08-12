<template>
  <div >
      <vuetable
        ref="vuetable"
        :api-mode="false"
        :fields="fields"
        :data="data"
        >
          <template v-slot:alertTime="props">
              <span>{{ dateFormat(props.rowData.created_at) }}</span>
          </template>
          <template v-slot:alertAction="props">
              <span v-for="(data, index) in props.rowData.recepient_ids" :key="index">{{data.email}}</span>
          </template>
          <template v-slot:status="props">
              <span>
                <b-form-group>
                  <multiselect v-model="props.rowData.status" :options="statusTypes" @select="onSelectStatus($event, props.rowData.id)" :select-label="''" :selected-label="''" :deselect-label="''" :custom-label="nameWithLang"></multiselect>
                </b-form-group>
              </span>
          </template>
        </vuetable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Vuetable } from 'vuetable-2'
import fields from './fieldsDef'
import alertService from '@/services/alert.service'
import AlertEventBus from '../alertEventBus'

export default {
  components: {
    Vuetable
  },
  data () {
    return {
      fields: fields,
      data: [],
      statusTypes: ['un_resolved', 'resolved']
    }
  },
  methods: {
    loadAlerts () {
      const config = {
        orgId: this.currentUser.org.id,
        projectId: 1
      }

      const params = {
        page_size: 4,
        page_number: 1
      }

      alertService.read(config, params)
        .then((res) => {
          this.data = res.alerts
        })
    },
    dateFormat (currentTime) {
      return this.$moment(currentTime).format('H:mm:ss')
    },
    onSelectStatus (event, id) {
      const config = {
        orgId: this.currentUser.org.id,
        id: id
      }

      let payload = {
        status: status
      }

      alertService.update(config, payload)
        .then((res) => {
          AlertEventBus.$emit('reload-alert')
        })
    },
    nameWithLang (value) {
      return value === 'resolved' ? 'Resolved' : 'Un Resolved'
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
  }
}
</script>

<style lang="scss" scoped>
 .vuetable tbody tr:last-of-type td{
   max-width: 100px !important;
 }
</style>

<style lang="scss">
 .vuetable tbody tr:last-of-type td{
   max-width: 100px !important;
 }
</style>
