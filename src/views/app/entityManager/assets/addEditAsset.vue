<template>
  <mads-modal
    ref="madsModal"
    :modalID="'add-edit-asset-modal'"
    :modalRef="'createAssetModal'"
    :modalSections="modalSections"
    :selectedSectionIndex="selectedSectionIndex"
    :editMode="editMode"
    @select-section="selectSection($event)"
    @next-section="nextSection()"
    @on-cancel="onCancel()"
    @on-save="saveAsset()">
    <template v-slot:right-panel>
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :assetData="asset" :source="source" :entityMapParentNode="entityMapParentNode"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from './../../shared/madsModal'
import sections from './addEditAssetSections'
import assetService from '@/services/asset.service'
import AssetEventBus from './assetEventBus'
import TreeEventBus from './../../shared/madsTree/treeEventBus'

export default {
  props: {
    source: {
      type: String,
      default: 'assets-list'
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
      }, {
        index: 3,
        name: 'Metadata <br> (Fixed Data)'
      }],
      selectedSectionIndex: 1,
      asset: null
    }
  },
  methods: {
    add (asset) {
      this.editMode = false
      this.$refs.madsModal.$refs.createAssetModal.show()
      this.asset = null
    },
    edit (asset) {
      this.editMode = true
      this.$refs.madsModal.$refs.createAssetModal.show()
      this.asset = asset
    },
    selectSection (index) {
      this.selectedSectionIndex = index
    },
    nextSection () {
      this.selectedSectionIndex++
    },
    saveAsset () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      let assetData = this.$refs.sections.getAssetData()

      if (this.source === 'entity-map') {
        TreeEventBus.$emit('add-entity', assetData, 'Asset')
      } else {
        if (this.editMode) {
          config = this.$_.assign(config, { id: this.asset.id })
          assetService.update(config, assetData)
            .then((response) => {
              AssetEventBus.$emit('reload-assets')
            })
        } else {
          assetService.create(config, assetData)
            .then((response) => {
              AssetEventBus.$emit('reload-assets')
            })
        }
      }
      this.selectedSectionIndex = 1
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
