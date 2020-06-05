<template>
  <div>
    <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search asset"></b-form-input>
      </div>
      <div class="add-asset">
        <b-button @click="addAsset()">Add asset</b-button>
      </div>
    </div>
    <div class="lists-table assets-table">
      <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="fields"
          :data="assets"
        >
        <template v-slot:checkbox>
          <b-form-checkbox></b-form-checkbox>
        </template>
        <template v-slot:metadata="props">
          <span>{{props.rowData.metadata.length}}</span>
        </template>
        <template v-slot:mapped_parameters="props">
          <span>{{(props.rowData.mapped_parameters || []).length}}</span>
        </template>
        <template v-slot:actions="props">
          <span class="edit-asset" @click="editAsset(props.rowData)">Edit</span>
          <span class="delete-asset" @click="deleteAsset(props.rowData)">Delete</span>
        </template>
      </vuetable>
    </div>

    <!-- Modal Section -->
    <add-edit-asset ref="addEditAsset"></add-edit-asset>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fieldsDef from './assetFieldsDef'
import Vuetable from 'vuetable-2'
import addEditAsset from './addEditAsset'
import assetService from '@/services/asset.service'
import AssetEventBus from './assetEventBus'

export default {
  props: ['assets'],
  components: {
    Vuetable,
    addEditAsset
  },
  data () {
    return {
      fields: fieldsDef,
      searchText: ''
    }
  },
  methods: {
    addAsset (asset) {
      this.$refs.addEditAsset.add()
    },
    editAsset (asset) {
      this.$refs.addEditAsset.edit(asset)
    },
    deleteAsset (asset) {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id, id: asset.id }
      assetService.delete(config)
        .then((response) => {
          AssetEventBus.$emit('reload-assets')
        })
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
    .add-asset {
      margin: 0 0 0 auto;
    }
  }
  .assets-table {
    margin-top: 30px;
    .edit-asset, .delete-asset {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
</style>
