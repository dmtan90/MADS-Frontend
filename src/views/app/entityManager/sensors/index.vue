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
import sensorList from './sensorList'
import sensorTypeList from './sensorTypeList'

export default {
  components: {
    sensorList,
    sensorTypeList
  },
  data () {
    return {
      selectedTab: 'sensors',
      sensorTypes: []
    }
  },
  methods: {
    loadSensorTypes () {
      this.sensorTypes = [
        {
          name: 'Sensor Type 1',
          metadata: 'metadata1, metadata2, metadata3',
          parameters: 'parameter1, parameter2, parameter3',
          creator: 'creator name'
        },
        {
          name: 'Sensor Type 2',
          metadata: 'metadata1, metadata2, metadata3',
          parameters: 'parameter1, parameter2, parameter3',
          creator: 'creator name'
        },
        {
          name: 'Sensor Type 3',
          metadata: 'metadata1, metadata2, metadata3',
          parameters: 'parameter1, parameter2, parameter3',
          creator: 'creator name'
        },
        {
          name: 'Sensor Type 4',
          metadata: 'metadata1, metadata2, metadata3',
          parameters: 'parameter1, parameter2, parameter3',
          creator: 'creator name'
        }

      ]
    }
  },
  mounted () {
    this.loadSensorTypes()
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
