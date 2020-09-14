<template>
  <div>
    <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search asset types"></b-form-input>
      </div>
      <div class="add-asset-type">
        <b-button @click="addAssetType()">Add asset type</b-button>
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
          <span class="delete-asset-type" @click="deleteAssetType(props.rowData)">Delete</span>
        </template>
        <template v-slot:metadata="props">
          <span>{{props.rowData.metadata.length}}</span>
        </template>
        <template v-slot:parameters="props">
          <span>{{props.rowData.parameters.length}}</span>
        </template>
      </vuetable>

      <mads-pagination :perPage="perPage" :onChange="onPaginationChange" :currentPage="currentPage" :totalRows="totalRows"></mads-pagination>

    </div>

    <!-- Modal Section -->
    <add-edit-asset-type ref="addEditAssetType"></add-edit-asset-type>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fieldsDef from './assetTypeFieldsDef'
import Vuetable from 'vuetable-2'
import addEditAssetType from './addEditAssetType'
import assetTypeService from '@/services/assetType.service'
import AssetEventBus from './assetEventBus'
import madsPagination from '../../shared/madsPagination'

export default {
  props: ['assetTypes', 'totalRows'],
  components: {
    Vuetable,
    addEditAssetType,
    madsPagination
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
    addAssetType (assetType) {
      this.$refs.addEditAssetType.add()
    },
    editAssetType (assetType) {
      this.$refs.addEditAssetType.edit(assetType)
    },
    deleteAssetType (assetType) {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id, id: assetType.id }
      assetTypeService.delete(config)
        .then((response) => {
          AssetEventBus.$emit('reload-asset-types')
        })
    },
    onPaginationChange (e) {
      this.currentPage = e
      this.$emit('asset-type-pagination', e)
      AssetEventBus.$emit('reload-asset-types')
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
