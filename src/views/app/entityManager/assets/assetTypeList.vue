<template>
  <div>
    <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search asset types"></b-form-input>
      </div>
      <div class="add-asset-type">
        <b-button v-b-modal.add-edit-asset-type-modal>Add asset type</b-button>
      </div>
    </div>
    <div class="lists-table assets-type-table">
      <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="fields"
          :data="assetTypes"
        >
        <template v-slot:checkbox>
          <b-form-checkbox></b-form-checkbox>
        </template>
        <template v-slot:actions="props">
          <span class="edit-asset-type" @click="editAssetType(props.rowData)">Edit</span>
          <span class="delete-asset-type">Delete</span>
        </template>
      </vuetable>
    </div>

    <!-- Modal Section -->
    <add-edit-asset-type ref="addEditAssetType"></add-edit-asset-type>
  </div>
</template>

<script>
import fieldsDef from './assetTypeFieldsDef'
import Vuetable from 'vuetable-2'
import addEditAssetType from './addEditAssetType'

export default {
  props: ['assetTypes'],
  components: {
    Vuetable,
    addEditAssetType
  },
  data () {
    return {
      fields: fieldsDef,
      searchText: ''
    }
  },
  methods: {
    editAssetType (assetType) {
      this.$refs.addEditAssetType.edit()
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
    .add-asset-type {
      margin: 0 0 0 auto;
    }
  }
  .assets-type-table {
    margin-top: 30px;
    .edit-asset-type, .delete-asset-type {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
</style>
