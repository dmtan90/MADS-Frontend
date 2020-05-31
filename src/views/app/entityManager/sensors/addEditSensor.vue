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
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :sensorData="sensor"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from './../../shared/madsModal'
import sections from './addEditSensorSections'
import sensorService from '@/services/sensor.service'
import SensorEventBus from './sensorEventBus'

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
      sensor: null
    }
  },
  methods: {
    add () {
      this.editMode = false
      this.$refs.madsModal.$refs.createSensorModal.show()
      this.sensor = null
    },
    edit (sensor) {
      this.editMode = true
      this.$refs.madsModal.$refs.createSensorModal.show()
      this.sensor = sensor
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
      let config = { orgId: this.currentUser.org.id, projectId: 1 }
      let sensorData = this.$refs.sections.getSensorData()

      if (this.editMode) {
        config = this.$_.assign(config, { id: this.sensor.id })
        sensorService.update(config, sensorData)
          .then((response) => {
            SensorEventBus.$emit('reload-sensors')
          })
      } else {
        sensorService.create(config, sensorData)
          .then((response) => {
            SensorEventBus.$emit('reload-sensors')
          })
      }
      // this.$emit('save-sensor', sensorData)
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
