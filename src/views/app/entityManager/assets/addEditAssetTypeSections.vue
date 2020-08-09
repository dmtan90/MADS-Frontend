<template>
  <div class="">
    <h3>{{editMode ? 'Edit' : 'Add'}} Asset Type</h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Asset Type Name" label-for="asset-type-name">
          <b-form-input id="asset-type-name" type="text" v-model="assetType.name" required></b-form-input>
        </b-form-group>
        <b-form-group label="Asset Type Description" label-for="asset-type-description" class="description">
          <b-form-textarea id="asset-type-description" v-model="assetType.description" rows="6" max-rows="6"></b-form-textarea>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox v-model="assetType.sensor_type_present">Asset type has inbuilt sensors streaming data</b-form-checkbox>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="metadata">
       <div class="metadata-group">
        <b-form class="horizontal-form" v-for="(metadata, index) in assetType.metadata" :key="index">
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
          <svg class="icon" @click="removeMetadata(index)">
            <use xlink:href="/assets/img/mads-common-icons.svg#minus"></use>
          </svg>
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
      <div class="metadata-group" v-if="assetType.sensor_type_present">
        <b-form class="horizontal-form" v-for="(parameter, index) in assetType.parameters" :key="index">
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
      <div v-else class="params-absent-msg">
        Not applicable, since asset type does not have <br>
        inbuilt sensors streaming data
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
    assetTypeData: {
      type: Object
    }
  },
  data () {
    return {
      dataTypes: [],
      assetType: {}
    }
  },
  methods: {
    loadDataTypes () {
      this.dataTypes = dataTypeService.read()
    },
    addNewMetadata () {
      let metadata = this.$_.concat(this.assetType.metadata, [{ name: '', data_type: '', unit: '' }])
      this.assetType = this.$_.assign(this.assetType, { metadata: metadata })
    },
    addNewParameter () {
      let parameters = this.$_.concat(this.assetType.parameters, [{ name: '', data_type: '', unit: '' }])
      this.assetType = this.$_.assign(this.assetType, { parameters: parameters })
    },
    getAssetTypeData () {
      if (!this.assetType.sensor_type_present) {
        delete this.assetType.parameters
      }

      this.$_.remove(this.assetType.metadata, (metadata) => { return !metadata.name })

      return this.assetType
    },
    removeMetadata (index) {
      this.assetType.metadata.splice(index, 1)
    }
  },
  mounted () {
    this.loadDataTypes()

    if (this.assetTypeData) {
      this.assetType = {
        name: this.assetTypeData.name || '',
        description: this.assetTypeData.description || '',
        metadata: this.$_.size(this.assetTypeData.metadata) ? this.assetTypeData.metadata : [],
        parameters: this.$_.size(this.assetTypeData.parameters) ? this.assetTypeData.parameters : [],
        generated_by: 'user',
        sensor_type_present: this.assetTypeData.sensor_type_present
      }
    } else {
      this.assetType = {
        name: '',
        description: '',
        metadata: [{ name: '', data_type: '', unit: '' }],
        parameters: [{ name: '', data_type: '', unit: '' }],
        generated_by: 'user',
        sensor_type_present: false
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
      .icon {
        width: 24px;
        height: 24px;
        fill: #d11a2a;
        cursor: pointer;
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
  .params-absent-msg {
    font-size: 15px;
    color: #919191;
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
