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
    @on-save="saveSensorType()">
    <template v-slot:right-panel>
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :sensorTypeData="sensorType"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from './../../shared/madsModal'
import sections from './addEditSensorTypeSections'
import sensorTypeService from '@/services/sensorType.service'
import SensorEventBus from './sensorEventBus'

export default {
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
      sensorType: null
    }
  },
  methods: {
    add () {
      this.editMode = false
      this.$refs.madsModal.$refs.addEditSensorTypeModal.show()
      this.sensorType = null
    },
    edit (sensorType) {
      this.editMode = true
      this.$refs.madsModal.$refs.addEditSensorTypeModal.show()
      this.sensorType = sensorType
    },
    selectSection (index) {
      this.selectedSectionIndex = index
    },
    nextSection () {
      this.selectedSectionIndex++
      if (this.selectedSectionIndex === 3) {
      }
    },
    saveSensorType () {
      let config = { orgId: this.currentUser.org.id }
      let sensorType = this.$refs.sections.getSensorTypeData()

      if (this.editMode) {
        config = this.$_.assign(config, { id: this.sensorType.id })
        sensorTypeService.update(config, sensorType)
          .then((response) => {
            SensorEventBus.$emit('reload-sensor-types')
          })
      } else {
        sensorTypeService.create(config, sensorType)
          .then((response) => {
            SensorEventBus.$emit('reload-sensor-types')
          })
      }

      this.selectedSectionIndex = 1
    },
    onCancel () {
      this.selectedSectionIndex = 1
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>

</style>
