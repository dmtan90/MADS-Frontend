<template>
  <mads-modal
    ref="madsModal"
    :modalID="'add-edit-sensor-type-modal'"
    :modalRef="'addEditSensorTypeModal'"
    :modalSections="modalSections"
    :selectedSectionIndex="selectedSectionIndex"
    :editMode="editMode"
    @select-section="selectSection($event)"
    @next-section="nextSection()"
    @on-cancel="onCancel()"
    @on-save="saveAsset()">
    <template v-slot:right-panel>
      <sections :selectedSectionIndex="selectedSectionIndex" :editMode="editMode"></sections>
    </template>
  </mads-modal>
</template>

<script>
import madsModal from './../../shared/madsModal'
import sections from './addEditSensorTypeSections'

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
      selectedSectionIndex: 1
    }
  },
  methods: {
    edit (asset) {
      this.editMode = true
      this.$refs.madsModal.$refs.addEditSensorTypeModal.show()
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
      this.selectedSectionIndex = 1
      this.allSectionsVisited = false
    },
    onCancel () {
      this.selectedSectionIndex = 1
      this.allSectionsVisited = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
