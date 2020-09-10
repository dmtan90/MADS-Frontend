<template>
    <div class="latest-logs-container">
        <vuetable
            ref="vuetable"
            :api-mode="false"
            :fields="fields"
            :data="data"
            >
        </vuetable>
        <mads-pagination :perPage="perPage" :onChange="onPaginationChange" :currentPage="currentPage" :totalRows="totalRows"></mads-pagination>
        <!-- <vuetable-pagination ref="pagination" :css="latestLogsCss.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Vuetable } from 'vuetable-2'
import fieldDef from './fieldDefs'
import gatewayService from '@/services/gateway.service'
import madsPagination from '../../../shared/madsPagination'

export default {
  components: {
    Vuetable,
    madsPagination
  },
  data () {
    return {
      fields: fieldDef,
      data: [],
      currentPage: 1,
      perPage: 5,
      totalRows: null
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
        page_size: this.perPage,
        page_number: this.currentPage
      }
      gatewayService.latestLogsRead(config, params)
        .then((res) => {
          this.data = res.data_dumps
          this.totalRows = res.total_entries
        })
    },
    onPaginationChange (e) {
      this.currentPage = e
      this.loadData()
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
