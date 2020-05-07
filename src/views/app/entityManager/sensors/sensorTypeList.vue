<template>
  <div>
    <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search sensor types"></b-form-input>
      </div>
      <div class="add-sensor-type">
        <b-button v-b-modal.create-sensor-type-modal>Add sensor type</b-button>
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
        <template v-slot:actions="props">
          <span class="edit-sensor-type" @click="editSensorType(props.rowData)">Edit</span>
          <span class="delete-sensor-type">Delete</span>
        </template>
      </vuetable>
    </div>

    <!-- Modal Section -->
    <create-sensor-type-modal ref="sensorTypeModal" :edit="edit"></create-sensor-type-modal>
  </div>
</template>

<script>
import fieldsDef from './sensorTypeFieldsDef'
import Vuetable from 'vuetable-2'
import createSensorTypeModal from './createSensorTypeModal'

export default {
  props: ['sensorTypes'],
  components: {
    Vuetable,
    createSensorTypeModal
  },
  data () {
    return {
      fields: fieldsDef,
      searchText: '',
      edit: false
    }
  },
  methods: {
    editSensorType (sensorType) {
      this.edit = true
      this.$refs.sensorTypeModal.$refs.createSensorTypeModal.show()
    }
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
