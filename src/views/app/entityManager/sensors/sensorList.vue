<template>
  <div>
    <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search sensor"></b-form-input>
      </div>
      <div class="add-sensor">
        <b-button @click="addSensor()">Add sensor</b-button>
      </div>
    </div>
    <div class="lists-table sensors-table">
      <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="fields"
          :data="sensors"
        >
        <template v-slot:checkbox>
          <b-form-checkbox></b-form-checkbox>
        </template>
        <template v-slot:metadata="props">
          {{props.rowData.metadata.length}} Metadata
        </template>
        <template v-slot:parameters="props">
          {{(props.rowData.parameters || []).length}} Parameters
        </template>
        <template v-slot:actions="props">
          <span class="edit-sensor" @click="editSensor(props.rowData)">Edit</span>
          <span class="delete-sensor" @click="deleteSensor(props.rowData)">Delete</span>
        </template>
      </vuetable>

      <mads-pagination :perPage="perPage" :onChange="onPaginationChange" :currentPage="currentPage" :totalRows="totalRows"></mads-pagination>

    </div>

    <!-- Modal Section -->
    <add-edit-sensor ref="addEditSensor"></add-edit-sensor>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fieldsDef from './sensorFieldsDef'
import Vuetable from 'vuetable-2'
import addEditSensor from './addEditSensor'
import sensorService from '@/services/sensor.service'
import SensorEventBus from './sensorEventBus'
import madsPagination from '../../shared/madsPagination'

export default {
  components: {
    Vuetable,
    addEditSensor,
    madsPagination
  },
  props: {
    sensors: {
      type: Array
    },
    totalRows: {
      type: Number
    }
  },
  data () {
    return {
      fields: fieldsDef,
      searchText: '',
      currentPage: 1,
      perPage: 5
    }
  },
  methods: {
    addSensor (sensor) {
      this.$refs.addEditSensor.add()
    },
    editSensor (sensor) {
      this.$refs.addEditSensor.edit(sensor)
    },
    deleteSensor (sensor) {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id, id: sensor.id }
      sensorService.delete(config)
        .then((response) => {
          SensorEventBus.$emit('reload-sensors')
        })
    },
    onPaginationChange (e) {
      this.currentPage = e
      this.$emit('sensor-pagination', e)
      SensorEventBus.$emit('reload-sensors')
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  }
}
</script>

<style lang="scss" scoped>
  .table-options {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .search-box {
      input {
        border-radius: 20px;
        width: 500px;
      }
    }
    .role-filter {
      margin-left: 20px;
      position: relative;
      width: 120px;
      label {
        position: absolute;
        left: 0;
        top: -20px;
      }
    }
    .add-sensor {
      margin: 0 0 0 auto;
    }
  }
  .sensors-table {
    margin-top: 30px;
    .edit-sensor, .delete-sensor {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
</style>
