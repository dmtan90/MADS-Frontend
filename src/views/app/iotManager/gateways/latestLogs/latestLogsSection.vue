<template>
    <div class="latest-logs-container">
        <vuetable
            ref="vuetable"
            :api-mode="false"
            :fields="fields"
            :data="data"
            >
        </vuetable>
        <!-- <vuetable-pagination ref="pagination" :css="latestLogsCss.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Vuetable } from 'vuetable-2'
import fieldDef from './fieldDefs'
import gatewayService from '@/services/gateway.service'

export default {
  components: {
    Vuetable
  },
  data () {
    return {
      fields: fieldDef,
      data: []
    }
  },
  methods: {
    loadData () {
      const config = {
        orgId: this.currentUser.org.id,
        projectId: this.selectedProject.id,
        id: this.selectedGateway.id
      }

      const params = {
        page_size: 100,
        page_number: 1
      }
      gatewayService.latestLogsRead(config, params)
        .then((res) => {
          this.data = res.data_dumps
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject', 'selectedGateway'])
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>

</style>
