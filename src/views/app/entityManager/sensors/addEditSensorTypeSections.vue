<template>
  <div class="">
    <h3>{{editMode ? 'Edit' : 'Add'}} Sensor Type</h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Sensor Type Name" label-for="sensor-type-name">
          <b-form-input id="sensor-type-name" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label="Sensor Type Description" label-for="sensor-type-description" class="description">
          <b-form-textarea id="sensor-type-description" rows="6" max-rows="6"></b-form-textarea>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="metadata">
      <div class="metadata-group">
        <b-form class="horizontal-form" v-for="count in newMetadataCount" :key="count">
          <b-form-group :label="count === 1  ? 'Metadata Name(key)' : ''" class="name">
            <b-form-input type="text"></b-form-input>
          </b-form-group>
          <b-form-group :label="count === 1  ? 'Data Type' : ''" class="data-type">
            <multiselect :options="[{name: 'Type 1'}, {name: 'Type 2'}, {name: 'Type 3'}, {name: 'Type 4'}, {name: 'Type 5'}]" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="id">
            </multiselect>
          </b-form-group>
          <b-form-group :label="count === 1  ? 'Unit' : ''" class="unit">
            <b-form-input></b-form-input>
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
        <b-form class="horizontal-form" v-for="count in newParameterCount" :key="count">
          <b-form-group :label="count === 1  ? 'Parameter Name(key)' : ''" class="name">
            <b-form-input type="text"></b-form-input>
          </b-form-group>
          <b-form-group :label="count === 1  ? 'Data Type' : ''" class="data-type">
            <multiselect :options="[{name: 'Type 1'}, {name: 'Type 2'}, {name: 'Type 3'}, {name: 'Type 4'}, {name: 'Type 5'}]" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="id">
            </multiselect>
          </b-form-group>
          <b-form-group :label=" count === 1  ? 'Unit' : ''" class="unit">
            <b-form-input></b-form-input>
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
export default {
  props: {
    selectedSectionIndex: {
      type: Number,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: '',
      description: '',
      newMetadataCount: 1,
      newParameterCount: 1
    }
  },
  methods: {
    addNewMetadata () {
      this.newMetadataCount++
    },
    addNewParameter () {
      this.newParameterCount++
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
      // height: 225px;
    }
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
