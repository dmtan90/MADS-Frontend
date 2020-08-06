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
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :credentialsData="credential" :source="source" :entityMapParentNode="entityMapParentNode"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from '../../../shared/madsModal'
import sections from './addEditDetailsCredSections'
import GatewayEventBus from '../gatewayEventBus'
import gatewayService from '@/services/gateway.service'

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
      credential: null
    }
  },
  methods: {
    add () {
      this.editMode = false
      this.$refs.madsModal.$refs.createGatewayModal.show()
      this.credential = null
    },
    edit (credential) {
      this.editMode = true
      this.$refs.madsModal.$refs.createGatewayModal.show()
      this.credential = credential
    },
    selectSection (index) {
      this.selectedSectionIndex = index
    },
    nextSection () {
      this.selectedSectionIndex++
    },
    saveGateway () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      let gatewayData = this.$refs.sections.getCredentialsData()
      if (this.editMode) {
        config = this.$_.assign(config, { id: this.credential.id })
        gatewayService.update(config, gatewayData)
          .then((res) => {
            GatewayEventBus.$emit('reload-gateways')
          })
      } else {
        gatewayService.create(config, gatewayData)
          .then((res) => {
            GatewayEventBus.$emit('reload-gateways')
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
