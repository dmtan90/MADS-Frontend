<template>
  <div class="sensors">
    <h2 class="page-heading">Sensors</h2>
    <div>
      <ul class="nav nav-tabs">
        <li :class="{'active': selectedTab === 'sensors'}" @click="selectedTab = 'sensors'">Sensors (0)</li>
        <li :class="{'active': selectedTab === 'sensorTypes'}" @click="selectedTab = 'sensorTypes'">Sensor Types ({{sensorTypes.length}})</li>
      </ul>
    </div>
    <sensor-list v-if="selectedTab === 'sensors'"></sensor-list>
    <sensor-type-list v-if="selectedTab === 'sensorTypes'" :sensorTypes="sensorTypes"></sensor-type-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import sensorList from './sensorList'
import sensorTypeList from './sensorTypeList'
import sensorService from '@/services/sensor.service'
import sensorTypeService from '@/services/sensorType.service'
import SensorEventBus from './sensorEventBus'

export default {
  components: {
    sensorList,
    sensorTypeList
  },
  data () {
    return {
      selectedTab: 'sensors',
      sensors: [],
      sensorTypes: []
    }
  },
  methods: {
    ...mapActions(['selectProject']),
    loadSensors () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      sensorService.read(config, { page_number: 1, page_size: 10 })
        .then((response) => {
          this.sensors = response.sensors
        })
    },
    loadSensorTypes () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      sensorTypeService.read(config, { page_number: 1, page_size: 10 })
        .then((response) => {
          this.sensorTypes = response.sensors_type
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  },
  mounted () {
    this.loadSensors()
    this.loadSensorTypes()

    SensorEventBus.$on('reload-sensor-types', () => {
      this.loadSensorTypes()
    })
  },
  beforeDestroy () {
    this.selectProject(null)
  }
}
</script>

<style lang="scss" scoped>
  .sensors {
    .page-heading {
      color: #3e4956;
      margin-bottom: 20px;
    }
    .nav {
      display: inline-flex;
      font-size: 13px;
      li {
        color: #79899d;
        min-width: 90px;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      li.active {
        color: #2aa7ff;
        box-shadow: inset 0 -2px 0 #2aa7ff;
      }
    }
    width: 90%;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
  }
</style>
