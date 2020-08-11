<template>
  <div>
      <vuetable
        ref="vuetable"
        :api-mode="false"
        :fields="fields"
        :data="data"
        >
          <template v-slot:alertTime="props">
              <span>{{ props.rowData.created_at }}</span>
          </template>
          <template v-slot:alertAction="props">
              <span v-for="(data, index) in props.rowData.recepient_ids" :key="index">{{data.email}}</span>
          </template>
          <template v-slot:status="props">
              <span>{{ props.rowData.status }}</span>
          </template>
        </vuetable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Vuetable } from 'vuetable-2'
import fields from './fieldsDef'
import alertService from '@/services/alert.service'

export default {
  components: {
    Vuetable
  },
  data () {
    return {
        fields:fields,
        data: []
    }
  },
  methods: {
    loadAlerts (){
        const config = {
            orgId: this.currentUser.org.id,
            projectId: 1
        }

        const params = {
            page_size: 4,
            page_number: 1
        }

        alertService.read(config,params)
            .then((res)=>{
                this.data = res.alerts
            })
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted(){
    this.loadAlerts()
  }
}
</script>
