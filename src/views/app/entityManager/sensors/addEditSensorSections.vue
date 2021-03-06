<template>
  <div class="">
    <h3>{{editMode ? 'Edit' : 'Add'}} Sensor</h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Sensor Type" label-for="sensor-type">
          <multiselect v-model="selectedSensorType" :options="sensorTypes" @select="onSelectSensorType" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="name"></multiselect>
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
          <multiselect v-model="sensor.caretakers" :options="caretakers" @select="onSelectCaretaker" :multiple="true" :select-label="''" :selected-label="''" :deselect-label="''" :custom-label="getCaretakerName" track-by="name"></multiselect>
        </b-form-group>
        <b-form-group label="Sensor's Hierarchy" class="hierarchy" v-if="source === 'sensors-list'">
          <b-form-radio value="Project" v-model="sensor.parent_type">Place under project {{selectedProject && selectedProject.name}}</b-form-radio>
          <b-form-radio value="Asset" v-model="sensor.parent_type">Place under an asset in project</b-form-radio>
        </b-form-group>
        <b-form-group v-else>
          <b-form-radio :value="entityMapParentNode.type" v-model="sensor.parent_type">Place under <b>{{entityMapParentNode.type}} {{entityMapParentNode.name}}</b></b-form-radio>
        </b-form-group>
      </b-form>
      <div v-if="source === 'sensors-list' &&  sensor.parent_type === 'Asset'" class="select-asset">
        <div class="vue-tree-container">
          <mads-tree ref="tree" :treeView="'file'" :treeOptions="treeOptions" @on-node-select="onSelectEntity" :selectedNodes="getSelectedEntity()" :isAnyNodeSelected="isAnyNodeSelected"></mads-tree>
        </div>
      </div>
    </section>
    <section v-if="selectedSectionIndex === 3" class="metadata">
      <div class="metadata-group" v-if="sensor.metadata.length">
        <b-form class="horizontal-form" v-for="(metadata, index) in sensor.metadata" :key="index">
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
import sensorTypeService from '@/services/sensorType.service'
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
    sensorData: {
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
      sensorTypes: [],
      caretakers: [],
      sensor: {},
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
    loadSensorTypes () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      sensorTypeService.read(config, { page_number: 1, page_size: 100 })
        .then((response) => {
          this.sensorTypes = response.sensors_type
        })
    },
    onSelectSensorType (sensorType) {
      this.sensor.sensor_type_id = sensorType.id

      let metadata = this.$_.map(sensorType.metadata, (metadata) => {
        if (!this.editMode) {
          metadata = this.$_.pick(metadata, ['name', 'data_type', 'unit'])
        }
        return this.$_.merge(metadata, { value: '' })
      })

      this.sensor = this.$_.merge(this.sensor, {
        metadata: metadata
      })
    },
    onSelectCaretaker (caretaker) {
    },
    onSelectEntity (event, entity) {
      if (event) {
        this.sensor.parent_id = entity.id
        this.sensor.parent_type = entity.type
      } else {
        this.sensor.parent_id = this.selectedProject.id
      }

      this.selectedParentEntityId = event ? entity.id : null
    },
    getSensorData () {
      return this.sensor
    },
    getCaretakerName (caretaker) {
      return caretaker.first_name + ' ' + (caretaker.last_name || '')
    },
    getSelectedEntity () {
      return [{ id: this.selectedParentEntityId, type: this.sensor.parent_type }]
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  },
  mounted () {
    this.loadSensorTypes()
    this.loadUsers()

    if (this.sensorData) {
      this.sensor = {
        name: this.sensorData.name || '',
        description: this.sensorData.description || '',
        sensor_type_id: this.sensorData.sensor_type.id || null,
        parent_type: this.sensorData.parent_type,
        parent_id: this.sensorData.parent_id,
        metadata: this.sensorData.metadata,
        creator_id: this.sensorData.creator_id
      }

      this.selectedSensorType = this.sensorData.sensor_type

      if (this.sensorData.parent_type === 'Asset') {
        this.isAnyNodeSelected = true
      }

      if (this.sensor.parent_type === 'Asset') {
        this.selectedParentEntityId = this.sensorData.parent_id
      }
    } else {
      this.sensor = {
        name: '',
        description: '',
        sensor_type_id: null,
        parent_type: this.entityMapParentNode ? this.entityMapParentNode.type : 'Project',
        parent_id: this.selectedProject.id,
        metadata: [],
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
