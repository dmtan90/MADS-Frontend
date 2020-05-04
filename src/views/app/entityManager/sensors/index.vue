<template>
  <div class="sensors">
    <h2 class="page-heading">Sensors</h2>
    <div>
      <ul class="nav nav-tabs">
        <li :class="{'active': selectedTab === 'sensors'}" @click="selectedTab = 'sensors'">Sensors (0)</li>
        <li :class="{'active': selectedTab === 'sensorTypes'}" @click="selectedTab = 'sensorTypes'">Sensor Types (0)</li>
      </ul>
    </div>
    <sensor-list v-if="selectedTab === 'sensors'"></sensor-list>
    <sensor-type-list v-if="selectedTab === 'sensorTypes'"></sensor-type-list>
  </div>
</template>

<script>
import sensorList from './sensor'
import sensorTypeList from './sensorType'

export default {
  components: {
    sensorList,
    sensorTypeList
  },
  data () {
    return {
      selectedTab: 'sensors'
    }
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
