<template>
  <div class="">
    <h3>{{editMode ? 'Edit' : 'Add'}} Asset</h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Asset Type" label-for="asset-type">
          <multiselect v-model="selectedAssetType" :options="assetTypes" @select="onSelectAssetType" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="name"></multiselect>
        </b-form-group>
        <b-form-group label="Asset Name" label-for="asset-name">
          <b-form-input v-model="asset.name" type="text" id="asset-name"></b-form-input>
        </b-form-group>
        <b-form-group label="Asset Description" label-for="asset-description" class="description">
          <b-form-textarea v-model="asset.description" id="asset-description" rows="6" max-rows="6"></b-form-textarea>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="position">
      <b-form>
        <b-form-group label="Asset's Caretaker(s)">
          <multiselect v-model="asset.caretakers" :options="caretakers" @select="onSelectCaretaker" :multiple="true" :select-label="''" :selected-label="''" :deselect-label="''" :custom-label="getCaretakerName" track-by="name"></multiselect>
        </b-form-group>
        <b-form-group label="Asset's Hierarchy" class="hierarchy" v-if="source === 'assets-list'">
          <b-form-radio value="Project" v-model="asset.parent_type">Place under project {{selectedProject && selectedProject.name}}</b-form-radio>
          <b-form-radio value="Asset" v-model="asset.parent_type">Place under an asset in project</b-form-radio>
        </b-form-group>
        <b-form-group v-else>
          <b-form-radio :value="entityMapParentNode.type" v-model="asset.parent_type">Place under <b>{{entityMapParentNode.type}} {{entityMapParentNode.name}}</b></b-form-radio>
        </b-form-group>
      </b-form>
      <div v-if="source === 'assets-list' && asset.parent_type === 'Asset'" class="select-asset">
        <div class="vue-tree-container">
          <mads-tree
            ref="tree"
            :treeView="'file'"
            :treeOptions="treeOptions"
            @on-node-select="onSelectEntity"
            :selectedNodes="getSelectedEntity()"
            :isAnyNodeSelected="isAnyNodeSelected"
            :editingEntity="assetData"
          ></mads-tree>
        </div>
      </div>
    </section>
    <section v-if="selectedSectionIndex === 3" class="metadata">
      <div class="metadata-group" v-if="asset.metadata.length">
        <b-form class="horizontal-form" v-for="(metadata, index) in asset.metadata" :key="index">
          <b-form-group :label="(index === 0) ? 'Metadata Name(key)' : ''" class="name">
            <b-form-input v-model="metadata.name" type="text" :disabled="true"></b-form-input>
          </b-form-group>
          <b-form-group :label="(index === 0) ? 'Data Type' : ''" class="data-type">
            <b-form-input v-model="metadata.data_type" :disabled="true"></b-form-input>
          </b-form-group>
          <b-form-group :label="(index === 0) ? 'Unit' : ''" class="unit">
            <b-form-input v-model="metadata.unit" :disabled="true"></b-form-input>
          </b-form-group>
          <b-form-group :label="(index === 0) ? 'Value' : ''" class="value">
            <b-form-input v-model="metadata.value"></b-form-input>
          </b-form-group>
        </b-form>
      </div>
      <div class="metadata-group" v-else>
        <span>No Metadata Present</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import assetTypeService from '@/services/assetType.service'
import madsTree from './../../shared/madsTree/index'
import projectService from '@/services/project.service'

export default {
  components: {
    madsTree
  },
  props: {
    selectedSectionIndex: {
      type: Number,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    },
    assetData: {
      type: Object
    },
    source: {
      type: String,
      required: true
    },
    entityMapParentNode: {
      default: null
    }
  },
  data () {
    return {
      selectedAssetType: null,
      assetTypes: [],
      caretakers: [],
      asset: {},
      orgData: null,
      treeData: null,
      treeOptions: {
        selectable: true,
        singleSelect: true
      },
      isAnyNodeSelected: false,
      selectedParentEntityId: null
    }
  },
  methods: {
    loadUsers () {
      let config = { orgId: this.currentUser.org.id, id: this.selectedProject.id }
      projectService.readUsers(config, { page_size: 100 })
        .then((response) => {
          this.caretakers = response.users
        })
    },
    loadAssetTypes () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      assetTypeService.read(config, { page_number: 1, page_size: 100 })
        .then((response) => {
          this.assetTypes = response.asset_types

          if (this.editMode) {
            this.selectedAssetType = this.$_.find(this.assetTypes, (assetType) => { return assetType.id === this.asset.asset_type_id })
          }
        })
    },
    onSelectAssetType (assetType) {
      this.asset.asset_type_id = assetType.id

      let metadata = this.$_.map(assetType.metadata, (metadata) => {
        if (!this.editMode) {
          metadata = this.$_.pick(metadata, ['name', 'data_type', 'unit'])
        }
        return this.$_.merge(metadata, { value: '' })
      })

      this.asset = this.$_.merge(this.asset, {
        metadata: metadata
      })
    },
    onSelectCaretaker (caretaker) {
    },
    onSelectEntity (event, entity) {
      if (event) {
        this.asset.parent_type = entity.type
        this.asset.parent_id = (entity.type === 'Project') ? null : entity.id
      } else {
        this.asset.parent_id = null
      }
      this.selectedParentEntityId = event ? entity.id : null
    },
    getAssetData () {
      return this.asset
    },
    getCaretakerName (caretaker) {
      return caretaker.first_name + ' ' + (caretaker.last_name || '')
    },
    getSelectedEntity () {
      return [{ id: this.selectedParentEntityId, type: this.asset.parent_type }]
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  },
  mounted () {
    this.loadAssetTypes()
    this.loadUsers()

    if (this.assetData) {
      this.asset = {
        name: this.assetData.name || '',
        description: this.assetData.description || '',
        metadata: this.assetData.metadata,
        parent_type: this.assetData.parent_id ? 'Asset' : 'Project',
        parent_id: this.assetData.parent_id || null,
        asset_type_id: this.assetData.asset_type_id,
        creator_id: this.assetData.creator_id
      }

      if (this.assetData.parent_id) {
        this.isAnyNodeSelected = true
      }

      if (this.asset.parent_type === 'Asset') {
        this.selectedParentEntityId = this.assetData.parent_id
      }
    } else {
      this.asset = {
        name: '',
        description: '',
        metadata: [],
        parent_type: this.entityMapParentNode ? this.entityMapParentNode.type : 'Project',
        parent_id: null,
        asset_type_id: null,
        creator_id: this.currentUser.id
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
    .select-asset {
      height: 320px;
      .vue-tree-container {
        border: 1px solid #e2e2e2;
        height: 250px;
        border-radius: 4px;
        padding-bottom: 20px;
        overflow: auto;
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
