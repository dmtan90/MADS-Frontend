<template>
  <div class="">
    <h3>{{editMode ? 'Edit' : 'Add'}} Asset</h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Asset Type" label-for="asset-type">
          <multiselect :options="[{name: 'Asset Type 1'}, {name: 'Asset Type 2'}, {name: 'Asset Type 3'}, {name: 'Asset Type 4'}, {name: 'Asset Type 5'}]" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="name"></multiselect>
        </b-form-group>
        <b-form-group label="Asset Name" label-for="asset-name">
          <b-form-input type="text" id="asset-name"></b-form-input>
        </b-form-group>
        <b-form-group label="Asset Description" label-for="asset-description" class="description">
          <b-form-textarea id="sensor-type-description" rows="6" max-rows="6"></b-form-textarea>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="position">
      <b-form>
        <b-form-group label="Asset's Caretaker(s)">
          <multiselect :options="[{name: 'Caretaker 1'}, {name: 'Caretaker 2'}, {name: 'Caretaker 3'}, {name: 'Caretaker 4'}, {name: 'Caretaker 5'}]" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="name"></multiselect>
        </b-form-group>
        <b-form-group label="Asset's Hierarchy" class="hierarchy">
          <b-form-radio value="project_parent">Place under project</b-form-radio>
          <b-form-radio value="asset_parent">Place under an asset in project</b-form-radio>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 3" class="metadata">
      <div class="metadata-group">
        <b-form class="horizontal-form">
          <b-form-group label="Metadata Name(key)" disabled class="name">
            <b-form-input type="text" value="Brand 1"></b-form-input>
          </b-form-group>
          <b-form-group label="Data Type" disabled class="data-type">
            <b-form-input type="text" value="String"></b-form-input>
          </b-form-group>
          <b-form-group label="Unit" disabled class="unit">
            <b-form-input type="text" value="N/A"></b-form-input>
          </b-form-group>
          <b-form-group label="Value" class="value">
            <b-form-input type="text"></b-form-input>
          </b-form-group>
        </b-form>
        <b-form class="horizontal-form">
          <b-form-group disabled class="name">
            <b-form-input type="text" value="Brand 2"></b-form-input>
          </b-form-group>
          <b-form-group disabled class="data-type">
            <b-form-input type="text" value="String"></b-form-input>
          </b-form-group>
          <b-form-group disabled class="unit">
            <b-form-input type="text" value="N/A"></b-form-input>
          </b-form-group>
          <b-form-group class="value">
            <b-form-input type="text"></b-form-input>
          </b-form-group>
        </b-form>
        <b-form class="horizontal-form">
          <b-form-group disabled class="name">
            <b-form-input type="text" value="Brand 3"></b-form-input>
          </b-form-group>
          <b-form-group disabled class="data-type">
            <b-form-input type="text" value="String"></b-form-input>
          </b-form-group>
          <b-form-group disabled class="unit">
            <b-form-input type="text" value="N/A"></b-form-input>
          </b-form-group>
          <b-form-group class="value">
            <b-form-input type="text"></b-form-input>
          </b-form-group>
        </b-form>
        <b-form class="horizontal-form">
          <b-form-group disabled class="name">
            <b-form-input type="text" value="Brand 4"></b-form-input>
          </b-form-group>
          <b-form-group disabled class="data-type">
            <b-form-input type="text" value="String"></b-form-input>
          </b-form-group>
          <b-form-group disabled class="unit">
            <b-form-input type="text" value="N/A"></b-form-input>
          </b-form-group>
          <b-form-group class="value">
            <b-form-input type="text"></b-form-input>
          </b-form-group>
        </b-form>
        <b-form class="horizontal-form">
          <b-form-group disabled class="name">
            <b-form-input type="text" value="Brand 5"></b-form-input>
          </b-form-group>
          <b-form-group disabled class="data-type">
            <b-form-input type="text" value="String"></b-form-input>
          </b-form-group>
          <b-form-group disabled class="unit">
            <b-form-input type="text" value="N/A"></b-form-input>
          </b-form-group>
          <b-form-group class="value">
            <b-form-input type="text"></b-form-input>
          </b-form-group>
        </b-form>
        <b-form class="horizontal-form">
          <b-form-group disabled class="name">
            <b-form-input type="text" value="Brand 5"></b-form-input>
          </b-form-group>
          <b-form-group disabled class="data-type">
            <b-form-input type="text" value="String"></b-form-input>
          </b-form-group>
          <b-form-group disabled class="unit">
            <b-form-input type="text" value="N/A"></b-form-input>
          </b-form-group>
          <b-form-group class="value">
            <b-form-input type="text"></b-form-input>
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
