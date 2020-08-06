<template>
  <mads-single-section-modal
    ref="madsSingleSectionModal"
    :modalID="'timestamp-mapping-modal'"
    :modalRef="'timestampMapping'"
    @on-save="updateTimestamp()">
    <template v-slot:body-panel>
        <div class="heading">
            Timestamp Mapping
        </div>
        <b-form class="main-panel">
            <b-form-group label="Add New Mapping" label-for="timestamp-mapping">
              <b-form-input v-model="timestampMapping" type="text" id="timestamp-mapping"></b-form-input>
            </b-form-group>
        </b-form>
    </template>
  </mads-single-section-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsSingleSectionModal from '../../../shared/madsSingleSectionModal'
import GatewayEventBus from '../gatewayEventBus'
import gatewayService from '@/services/gateway.service'

export default {
  components: {
    madsSingleSectionModal
  },
  data () {
    return {
      timestampMapping: ''
    }
  },
  methods: {
    edit () {
      this.$refs.madsSingleSectionModal.$refs.timestampMapping.show()
    },
    updateTimestamp () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      let data = {
        timestamp_mapping: this.timestampMapping
      }

      gatewayService.update(config, data)
        .then((res) => {
          GatewayEventBus.$emit('reload-gateways')
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  }
}
</script>

<style lang="scss" scoped>
  .heading {
    font-size: 25px;
    color: #000;
    font-weight: bold;
    width: 100%;
  }
  .main-panel {
    width: 100%;
  }
</style>
