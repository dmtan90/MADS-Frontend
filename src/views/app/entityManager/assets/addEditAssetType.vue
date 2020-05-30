<template>
  <mads-modal
    ref="madsModal"
    :modalID="'add-edit-asset-type-modal'"
    :modalRef="'addEditAssetTypeModal'"
    :modalSections="modalSections"
    :selectedSectionIndex="selectedSectionIndex"
    :editMode="editMode"
    @select-section="selectSection($event)"
    @next-section="nextSection()"
    @on-cancel="onCancel()"
    @on-save="saveAssetType()">
    <template v-slot:right-panel>
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :assetTypeData="assetType"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from './../../shared/madsModal'
import sections from './addEditAssetTypeSections'
import assetTypeService from '@/services/assetType.service'
import AssetEventBus from './assetEventBus'

export default {
  props: {
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
        name: 'Metadata <br> (Fixed Data)'
      }, {
        index: 3,
        name: 'Parameters <br> (Streaming Data)'
      }],
      selectedSectionIndex: 1,
      assetType: null
    }
  },
  methods: {
    add () {
      this.editMode = false
      this.$refs.madsModal.$refs.addEditAssetTypeModal.show()
      this.assetType = null
    },
    edit (assetType) {
      this.editMode = true
      this.$refs.madsModal.$refs.addEditAssetTypeModal.show()
      this.assetType = assetType
    },
    selectSection (index) {
      this.selectedSectionIndex = index
    },
    nextSection () {
      this.selectedSectionIndex++
      if (this.selectedSectionIndex === 3) {
        this.allSectionsVisited = true
      }
    },
    saveAssetType () {
      let config = { orgId: this.currentUser.org.id, projectId: 1 }
      let assetType = this.$refs.sections.getAssetTypeData()

      if (this.editMode) {
        config = this.$_.assign(config, { id: this.assetType.id })
        assetTypeService.update(config, { asset_type: assetType })
          .then((response) => {
            AssetEventBus.$emit('reload-asset-types')
          })
      } else {
        assetTypeService.create(config, assetType)
          .then((response) => {
            AssetEventBus.$emit('reload-asset-types')
          })
      }

      this.selectedSectionIndex = 1
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
