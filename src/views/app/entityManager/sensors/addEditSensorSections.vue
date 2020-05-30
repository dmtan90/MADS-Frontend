<template>
  <div class="">
    <h3>{{editMode ? 'Edit' : 'Add'}} Sensor</h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Sensor Type" label-for="sensor-type">
          <multiselect v-model="sensor.sensor_type" :options="[{name: 'Sensor Type 1'}, {name: 'Sensor Type 2'}, {name: 'Sensor Type 3'}, {name: 'Sensor Type 4'}, {name: 'Sensor Type 5'}]" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="name"></multiselect>
        </b-form-group>
        <b-form-group label="Sensor Name" label-for="sensor-name">
          <b-form-input v-model="sensor.name" type="text" id="sensor-name"></b-form-input>
        </b-form-group>
        <b-form-group label="Sensor Description" label-for="sensor-description" class="description">
          <b-form-textarea v-model="sensor.description" id="sensor-type-description" rows="6" max-rows="6"></b-form-textarea>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="position">
      <b-form>
        <b-form-group label="Sensor's Caretaker(s)">
          <multiselect :options="[{name: 'Caretaker 1'}, {name: 'Caretaker 2'}, {name: 'Caretaker 3'}, {name: 'Caretaker 4'}, {name: 'Caretaker 5'}]" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="name"></multiselect>
        </b-form-group>
        <b-form-group label="Sensor's Hierarchy" class="hierarchy">
          <b-form-radio value="Project" v-model="sensor.parent_type">Place under project</b-form-radio>
          <b-form-radio value="Asset" v-model="sensor.parent_type">Place under an asset in project</b-form-radio>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 3" class="metadata">
      <div class="metadata-group">
        <b-form class="horizontal-form" v-for="(metadata, index) in sensor.metadata" :key="index">
          <b-form-group :label="(index === 0) ? 'Metadata Name(key)' : ''" class="name">
            <b-form-input v-model="metadata.name" type="text"></b-form-input>
          </b-form-group>
          <b-form-group :label="(index === 0) ? 'Data Type' : ''" class="data-type">
            <multiselect v-model="metadata.data_type" :options="['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5']" :select-label="''" :selected-label="''" :deselect-label="''">
            </multiselect>
          </b-form-group>
          <b-form-group :label="(index === 0) ? 'Unit' : ''" class="unit">
            <b-form-input v-model="metadata.unit"></b-form-input>
          </b-form-group>
          <b-form-group :label="(index === 0) ? 'Value' : ''" class="value">
            <b-form-input v-model="metadata.value"></b-form-input>
          </b-form-group>
        </b-form>
      </div>
    </section>
  </div>
</template>

<script>
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
    sensorData: {
      type: Object
    }
  },
  data () {
    return {
      sensor: {
        name: '',
        description: '',
        sensor_type: null,
        parent_type: '',
        parent_id: null,
        metadata: [{ name: 'Metadata 1', data_type: 'String', unit: 'unit1', value: '' }]
      }
    }
  },
  methods: {
    getSensorData () {
      return this.sensor
    }
  },
  mounted () {
    if (this.sensorData) {
      this.sensor = {
        name: this.sensorData.name || '',
        description: this.sensorData.description || '',
        sensor_type: this.sensorData.sensor_type || null,
        parent_type: this.sensorData.parent_type || 'Project',
        parent_id: this.sensorData.parent_id || null,
        metadata: this.$_.size(this.sensorData.metadata) ? this.sensorData.metadata : [{ name: '', data_type: '', unit: '' }]
      }
    } else {
      this.sensor = {
        name: '',
        description: '',
        sensor_type: null,
        parent_type: '',
        parent_id: null,
        metadata: [{ name: 'Metadata 1', data_type: 'String', unit: 'unit1', value: '' }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  h3 {
    margin-bottom: 20px;
  }
  .details {
    .description {
      height: 225px;
    }
  }
  .position {
    .hierarchy {
      .custom-radio {
        width: 48%;
        display: inline-block;
      }
    }
  }
  .metadata-group {
    margin-bottom: 45px;
    .horizontal-form {
      .name {
        width: 30%;
        margin-right: 5px;
      }
      .data-type {
        width: 20%;
        margin-right: 5px;
      }
      .unit {
        width: 15%;
        margin-right: 5px;
      }
      .value {
        width: 25%;
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
