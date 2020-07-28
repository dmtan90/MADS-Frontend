<template>
  <mads-modal
    ref="madsModal"
    :modalID="'add-edit-gateway-modal'"
    :modalRef="'createGatewayModal'"
    :modalSections="modalSections"
    :selectedSectionIndex="selectedSectionIndex"
    :editMode="editMode"
    @select-section="selectSection($event)"
    @next-section="nextSection()"
    @on-cancel="onCancel()"
    @on-save="saveGateway()">
    <template v-slot:right-panel>
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :gatewayData="gateway" :source="source" :entityMapParentNode="entityMapParentNode"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from './../../shared/madsModal'
import sections from './addEditGatewaySections'
import gatewayService from '@/services/gateway.service'
import GatewayEventBus from './gatewayEventBus'
import TreeEventBus from './../../shared/madsTree/treeEventBus'

export default {
  props: {
    source: {
      type: String,
      default: 'sensors-list'
    },
    entityMapParentNode: {
      default: null
    }
  },
  components: {
    madsModal,
    sections
  },
  data () {
    return {
      editMode: false,
      modalSections: [{
        index: 1,
        name: 'Details'
      }, {
        index: 2,
        name: 'Position'
      }],
      selectedSectionIndex: 1,
      gateway: null
    }
  },
  methods: {
    add () {
      this.editMode = false
      this.$refs.madsModal.$refs.createGatewayModal.show()
      this.gateway = null
    },
    edit (gateway) {
      this.editMode = true
      this.$refs.madsModal.$refs.createGatewayModal.show()
      this.gateway = gateway
    },
    selectSection (index) {
      this.selectedSectionIndex = index
    },
    nextSection () {
      this.selectedSectionIndex++
    },
    saveGateway () {
        let config = { orgId: this.currentUser.org.id, projectId: 1 }
        let gatewayData = this.$refs.sections.getGatewayData()
        if(this.editMode){
            config = this.$_.assign(config, { id: this.gateway.id })
            gatewayService.update(config, gatewayData)
                .then((res)=>{
                    GatewayEventBus.$emit('reload-gateways');
                })
        }else{
            gatewayService.create(config, gatewayData)
                .then((res)=>{
                    GatewayEventBus.$emit('reload-gateways');
                })
        }
    
    },
    onCancel () {
      this.selectedSectionIndex = 1
      this.allSectionsVisited = false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  }
}
</script>

<style lang="scss" scoped>

</style>
