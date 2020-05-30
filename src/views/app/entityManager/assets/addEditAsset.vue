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
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :assetData="asset"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from './../../shared/madsModal'
import sections from './addEditAssetSections'
import assetService from '@/services/asset.service'
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
      if (this.selectedSectionIndex === 3) {
        this.allSectionsVisited = true
      }
    },
    saveAsset () {
      let config = { orgId: this.currentUser.org.id, projectId: 1 }
      let assetData = this.$refs.sections.getAssetData()

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

      // this.$emit('save-asset', assetData)
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
