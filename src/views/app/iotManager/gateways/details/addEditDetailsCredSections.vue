<template>
  <div class="">
    <h3>{{editMode ? 'Edit' : 'Add'}} Credentials </h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Credentials Name" label-for="credentials-name">
          <b-form-input v-model="credentials.name" type="text" id="credentials-name"></b-form-input>
        </b-form-group>
        <b-form-group label="Credentials Channel" label-for="credentials-type">
          <multiselect v-model="selectedSensorType" :options="gatewayTypes" @select="onSelectGatewayType" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
        </b-form-group> 
        <b-form-group label="Credentials Description" label-for="credentials-description" class="description">
          <b-form-textarea v-model="credentials.description" id="credentials-description" rows="6" max-rows="6"></b-form-textarea>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="position">
      <b-form>
        <b-form-group label="Position" class="hierarchy"></b-form-group>
      </b-form>
      <div class="select-asset">
        <div class="vue-tree-container">
          <mads-tree ref="tree" :treeView="'file'" :treeOptions="treeOptions" @on-node-select="onSelectEntity" :selectedNodes="getSelectedEntity()" :isAnyNodeSelected="isAnyNodeSelected"></mads-tree>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sensorTypeService from '@/services/sensorType.service'
import madsTree from '../../../shared/madsTree/index'

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
    credentialsData: {
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
      selectedSensorType: null,
      gatewayTypes: ["http","mqtt"],
      orgData: null,
      treeData: null,
      treeOptions: {
        selectable: true,
        singleSelect: true
      },
      isAnyNodeSelected: false,
      selectedParentEntityId: null,
      credentials: {}
    }
  },
  methods: {
    onSelectGatewayType (type) {
      this.credentials.channel = type
    },
    onSelectEntity (event, entity) {
      if (event) {
        this.credentials.parent_id = entity.id
        this.credentials.parent_type = entity.type
      } else {
        this.credentials.parent_id = null
      }
    },
    getCredentialsData () {
      return this.credentials
    },
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  },
  mounted () {
    if (this.credentialsData) {
      this.credentials = {
        name: this.credentialsData.name || '',
        description: this.credentialsData.description || '',
        channel: this.credentialsData.channel || '',
        parent_type: this.credentialsData.parent_type,
        parent_id: this.credentialsData.parent_id,
      }

      this.selectedSensorType = this.credentialsData.sensor_type

      if (this.credentialsData.parent_type === 'Asset') {
        this.isAnyNodeSelected = true
      }

      if (this.credentials.parent_type === 'Asset') {
        this.selectedParentEntityId = this.credentialsData.parent_id
      }
    } else {
      this.credentials = {
        name: '',
        description: '',
        parent_type: '',
        parent_id: null,
        channel: '',
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
