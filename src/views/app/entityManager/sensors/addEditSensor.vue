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
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :sensorData="sensor" :source="source" :entityMapParentNode="entityMapParentNode"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from './../../shared/madsModal'
import sections from './addEditSensorSections'
import sensorService from '@/services/sensor.service'
import SensorEventBus from './sensorEventBus'
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
    },
    saveSensor () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      let sensorData = this.$refs.sections.getSensorData()

      if (this.source === 'entity-map') {
        TreeEventBus.$emit('add-entity', sensorData, 'Sensor')
      } else {
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
