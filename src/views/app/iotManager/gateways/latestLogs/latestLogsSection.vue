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
import {Vuetable} from 'vuetable-2'
import fieldDef from './fieldDefs'
import gatewayService from '@/services/gateway.service'
import GatewayEventBus from '../gatewayEventBus'

export default {
  components: {
    Vuetable
  },
  data () {
    return {
      fields: fieldDef,
      data: [],
    }
  },
  methods:{
    loadData(){
        const config = {
        orgId: this.currentUser.org.id,
        projectId: 1,
        id: this.selectedGateway.id
      }

      const params = {
        page_size: 6,
        page_number: 1
      }
        gatewayService.latestLogsRead(config, params)
            .then((res)=>{
                this.data = res.data_dumps
            })
    }
  },
  computed: {
    ...mapGetters(['currentUser','selectedGateway'])
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>

</style>
