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
    @on-save="saveAlertRules()">
    <template v-slot:right-panel>
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :gatewayData="alertRule" :source="source" :entityMapParentNode="entityMapParentNode"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from './../../../shared/madsModal'
import sections from './addEditAlertRulesSections'
import alertRulesService from '@/services/alertRules.service'
import alertRulesEventBus from './alertRulesEventBus'
import TreeEventBus from './../../../shared/madsTree/treeEventBus'

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
        name: 'Conditions'
      }, {
        index: 3,
        name: 'Actions'
      }],
      selectedSectionIndex: 1,
      alertRule: null
    }
  },
  methods: {
    add () {
      this.editMode = false
      this.$refs.madsModal.$refs.createGatewayModal.show()
      this.alertRule = null
    },
    edit (alertRule) {
      this.editMode = true
      this.$refs.madsModal.$refs.createGatewayModal.show()
      this.alertRule = alertRule
    },
    selectSection (index) {
      this.selectedSectionIndex = index
    },
    nextSection () {
      this.selectedSectionIndex++
    },
    saveAlertRules () {
      // let config = { orgId: this.currentUser.org.id, projectId: 1 }
      // let gatewayData = this.$refs.sections.getGatewayData()
      // if (this.editMode) {
      //   config = this.$_.assign(config, { id: this.gateway.id })
      //   gatewayService.update(config, gatewayData)
      //     .then((res) => {
      //       GatewayEventBus.$emit('reload-gateways')
      //     })
      // } else {
      //   gatewayService.create(config, gatewayData)
      //     .then((res) => {
      //       GatewayEventBus.$emit('reload-gateways')
      //     })
      // }
    },
    onCancel () {
      this.selectedSectionIndex = 1
      this.allSectionsVisited = false
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>

</style>
