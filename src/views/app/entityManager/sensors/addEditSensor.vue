<template>
  <mads-modal
    ref="madsModal"
    :modalID="'add-edit-sensor-modal'"
    :modalRef="'createSensorModal'"
    :modalSections="modalSections"
    :selectedSectionIndex="selectedSectionIndex"
    :editMode="editMode"
    @select-section="selectSection($event)"
    @next-section="nextSection()"
    @on-cancel="onCancel()"
    @on-save="saveSensor()">
    <template v-slot:right-panel>
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode"></sections>
    </template>
  </mads-modal>
</template>

<script>
import madsModal from './../../shared/madsModal'
import sections from './addEditSensorSections'

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
      selectedSectionIndex: 1
    }
  },
  methods: {
    edit (sensor) {
      this.editMode = true
      this.$refs.madsModal.$refs.createSensorModal.show()
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
    saveSensor () {
      this.selectedSectionIndex = 1
      this.allSectionsVisited = false
      let sensorData = this.$refs.sections.getSensorData()
      this.$emit('save-sensor', sensorData)
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
