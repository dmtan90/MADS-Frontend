<template>
  <div class="sensors">
    <h2 class="page-heading">Sensors of {{this.selectedProject.name}}</h2>
    <div>
      <ul class="nav nav-tabs">
        <li :class="{'active': selectedTab === 'sensors'}" @click="selectedTab = 'sensors'">Sensors ({{totalRows}})</li>
        <li :class="{'active': selectedTab === 'sensorTypes'}" @click="selectedTab = 'sensorTypes'">Sensor Types ({{sensorTypeTotalRows}})</li>
      </ul>
    </div>
    <sensor-list v-if="selectedTab === 'sensors'" :sensors="sensors" @sensor-pagination="sensorPaginationChange" :totalRows="totalRows"></sensor-list>
    <sensor-type-list v-if="selectedTab === 'sensorTypes'" :sensorTypes="sensorTypes" @sensor-type-pagination="sensorTypePaginationChange" :totalRows="sensorTypeTotalRows"></sensor-type-list>
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
      sensorTypes: [],
      currentPage: 1,
      perPage: 5,
      totalRows: null,
      sensorTypeCurrentPage: 1,
      sensorTypePerPage: 5,
      sensorTypeTotalRows: null
    }
  },
  methods: {
    ...mapActions(['selectProject']),
    loadSensors () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      const params = {
        page_size: this.perPage,
        page_number: this.currentPage
      }
      sensorService.read(config, params)
        .then((response) => {
          this.sensors = response.sensors
          this.totalRows = response.total_entries
        })
    },
    loadSensorTypes () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      const params = {
        page_size: this.sensorTypePerPage,
        page_number: this.sensorTypeCurrentPage
      }
      sensorTypeService.read(config, params)
        .then((response) => {
          this.sensorTypes = response.sensors_type
          this.sensorTypeTotalRows = response.total_entries
        })
    },
    sensorPaginationChange (paginationData) {
      this.currentPage = paginationData
    },
    sensorTypePaginationChange (paginationData) {
      this.sensorTypeCurrentPage = paginationData
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

    SensorEventBus.$on('reload-sensors', () => {
      this.loadSensors()
    })
  },
  beforeDestroy () {
    this.selectProject(null)
    SensorEventBus.$off()
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
    width: 95%;
    margin: 0 auto;
    background-color: transparent;
    padding: 20px;
  }
</style>
