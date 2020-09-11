<template>
  <div>
    <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search sensor types"></b-form-input>
      </div>
      <div class="add-sensor-type">
        <b-button @click="addSensorType()">Add sensor type</b-button>
      </div>
    </div>
    <div class="lists-table sensors-table">
      <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="fields"
          :data="sensorTypes"
        >
        <template v-slot:checkbox>
          <b-form-checkbox></b-form-checkbox>
        </template>
        <template v-slot:metadata="props">
          {{props.rowData.metadata.length}} Metadata
        </template>
        <template v-slot:parameters="props">
          {{props.rowData.parameters.length}} Parameters
        </template>
        <template v-slot:actions="props">
          <span class="edit-sensor-type" @click="editSensorType(props.rowData)">Edit</span>
          <span class="delete-sensor-type" @click="deleteSensorType(props.rowData)">Delete</span>
        </template>
      </vuetable>
      <mads-pagination :perPage="perPage" :onChange="onPaginationChange" :currentPage="currentPage" :totalRows="totalRows"></mads-pagination>

    </div>

    <!-- Modal Section -->
    <add-edit-sensor-type ref="addEditSensorType"></add-edit-sensor-type>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fieldsDef from './sensorTypeFieldsDef'
import Vuetable from 'vuetable-2'
import addEditSensorType from './addEditSensorType'
import sensorTypeService from '@/services/sensorType.service'
import SensorEventBus from './sensorEventBus'
import madsPagination from '../../shared/madsPagination'

export default {
  components: {
    Vuetable,
    addEditSensorType,
    madsPagination
  },
  props: {
    sensorTypes: {
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
    addSensorType (sensorType) {
      this.$refs.addEditSensorType.add()
    },
    editSensorType (sensorType) {
      this.$refs.addEditSensorType.edit(sensorType)
    },
    deleteSensorType (sensorType) {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id, id: sensorType.id }
      sensorTypeService.delete(config)
        .then((response) => {
          SensorEventBus.$emit('reload-sensor-types')
        })
    },
    onPaginationChange (e) {
      this.currentPage = e
      this.$emit('sensor-type-pagination', e)
      SensorEventBus.$emit('reload-sensor-types')
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
    .add-sensor-type {
      margin: 0 0 0 auto;
    }
  }
  .sensors-table {
    margin-top: 30px;
    .edit-sensor-type, .delete-sensor-type {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
</style>
