<template>
  <div class="">
    <h3>{{editMode ? 'Edit' : 'Add'}} Sensor Type</h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Sensor Type Name" label-for="sensor-type-name">
          <b-form-input v-model="sensorType.name" id="sensor-type-name" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label="Sensor Type Description" label-for="sensor-type-description" class="description">
          <b-form-textarea v-model="sensorType.description" id="sensor-type-description" rows="6" max-rows="6"></b-form-textarea>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="metadata">
      <div class="metadata-group">
        <b-form class="horizontal-form" v-for="(metadata, index) in sensorType.metadata" :key="index">
          <b-form-group :label="(index === 0) ? 'Metadata Name(key)' : ''" class="name">
            <b-form-input v-model="metadata.name" type="text"></b-form-input>
          </b-form-group>
          <b-form-group :label="(index === 0) ? 'Data Type' : ''" class="data-type">
            <multiselect v-model="metadata.data_type" :options="dataTypes" :select-label="''" :selected-label="''" :deselect-label="''">
            </multiselect>
          </b-form-group>
          <b-form-group :label="(index === 0) ? 'Unit' : ''" class="unit">
            <b-form-input v-model="metadata.unit"></b-form-input>
          </b-form-group>
        </b-form>
        <b-button class="add-new-row" @click="addNewMetadata()">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#plus"></use>
          </svg>
          <span class="text">Add New</span>
        </b-button>
      </div>
    </section>
    <section v-if="selectedSectionIndex ===3" class="parameters">
      <div class="metadata-group">
        <b-form class="horizontal-form" v-for="(parameter, index) in sensorType.parameters" :key="index">
          <b-form-group :label="(index === 0)  ? 'Parameter Name(key)' : ''" class="name">
            <b-form-input v-model="parameter.name" type="text"></b-form-input>
          </b-form-group>
          <b-form-group :label="(index === 0)  ? 'Data Type' : ''" class="data-type">
            <multiselect v-model="parameter.data_type" :options="dataTypes" :select-label="''" :selected-label="''" :deselect-label="''">
            </multiselect>
          </b-form-group>
          <b-form-group :label=" (index === 0)  ? 'Unit' : ''" class="unit">
            <b-form-input v-model="parameter.unit"></b-form-input>
          </b-form-group>
        </b-form>
        <b-button class="add-new-row" @click="addNewParameter()">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#plus"></use>
          </svg>
          <span class="text">Add New</span>
        </b-button>
      </div>
    </section>
  </div>
</template>

<script>
import dataTypeService from '@/services/dataType.service'

export default {
  props: {
    selectedSectionIndex: {
      type: Number,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    },
    sensorTypeData: {
      type: Object
    }
  },
  data () {
    return {
      dataTypes: [],
      sensorType: {}
    }
  },
  methods: {
    loadDataTypes () {
      this.dataTypes = dataTypeService.read()
    },
    addNewMetadata () {
      let metadata = this.$_.concat(this.sensorType.metadata, [{ name: '', data_type: '', unit: '' }])
      this.sensorType = this.$_.assign(this.sensorType, { metadata: metadata })
    },
    addNewParameter () {
      let parameters = this.$_.concat(this.sensorType.parameters, [{ name: '', data_type: '', unit: '' }])
      this.sensorType = this.$_.assign(this.sensorType, { parameters: parameters })
    },
    getSensorTypeData () {
      return this.sensorType
    }
  },
  mounted () {
    this.loadDataTypes()

    if (this.sensorTypeData) {
      this.sensorType = {
        name: this.sensorTypeData.name || '',
        description: this.sensorTypeData.description || '',
        metadata: this.$_.size(this.sensorTypeData.metadata) ? this.sensorTypeData.metadata : [{ name: '', data_type: '', unit: '' }],
        parameters: this.$_.size(this.sensorTypeData.parameters) ? this.sensorTypeData.parameters : [{ name: '', data_type: '', unit: '' }]
      }
    } else {
      this.sensorType = {
        name: '',
        description: '',
        metadata: [{ name: '', data_type: '', unit: '' }],
        parameters: [{ name: '', data_type: '', unit: '' }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  h3 {
    margin-bottom: 20px;
  }
  .metadata-group {
    margin-bottom: 45px;
    .horizontal-form {
      .name {
        width: 40%;
        margin-right: 5px;
      }
      .data-type {
        width: 30%;
        margin-right: 5px;
      }
      .unit {
        width: 20%;
      }
    }
    .add-new-row {
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
      .icon {
        width: 24px;
        height: 24px;
        fill: #60C977;
      }
      .text {
        font-size: 15px;
        padding-left: 5px;
      }
    }
  }
</style>

<style lang="scss">
  .modal-body {
    padding: 0;
    .right-panel {
      .horizontal-form {
        fieldset {
          display: inline-block;
        }
      }
    }
  }
</style>
