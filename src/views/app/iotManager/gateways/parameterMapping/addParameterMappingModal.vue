<template>
  <b-modal id="modalID" ref="modalRef" size="md" hide-footer @hidden="onCancel()">
    <div class="parameter-modal-container">
      <div class="select-type" v-if="relativeEntity.node && relativeEntity.node.type === 'object'">
        <span>Key:</span>
        <b-input v-model="mappingKey" placeholder="Enter Mapping key"></b-input>
        <multiselect v-model="selectedType" :options="mappingTypes" @select="onSelectMappingType" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Select Mapping type"></multiselect>
      </div>
      <div class="type-sections" v-if="selectedType">
        <div v-if="selectedType === 'value'">
          <multiselect v-model="selectedEntity" :options="entityTypes" @select="onSelectEntityType" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Select Entity type"></multiselect>
        </div>
      </div>
      <div class="entity-sections" v-if="selectedEntity">
        <div v-if="selectedEntity === 'Gateway'">
          <b-form-group>
            <b-form-radio-group
              id="radio-group-1"
              v-model="selectedParam"
              :options="streamingParams"
              name="radio-options"
              value-field="uuid"
              text-field="name"
              @change="onGatewayParamChange"
            ></b-form-radio-group>
          </b-form-group>
        </div>
        <div v-if="selectedEntity === 'Sensor'">
          <div class="vue-tree-container">
            <mads-tree
              ref="tree"
              :treeView="'file'"
              :treeOptions="treeOptions"
              :hiddenEntities="[]"
              :selectableEntities="['SensorParameter']"
            ></mads-tree>
          </div>
        </div>
      </div>

      <div class="footer">
        <b-button @click="onCancel()">Cancel</b-button>
        <b-button @click="onSave()" class="save-btn">Save</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsTree from './../../../shared/madsTree/index'

export default {
  components: {
    madsTree
  },
  data () {
    return {
      selectedType: null,
      selectedEntity: null,
      selectedParam: '',
      mappingTypes: ['object', 'list', 'value'],
      entityTypes: ['Gateway', 'Sensor'],
      mappingKey: '',
      mappingValue: '',
      treeOptions: {
        selectable: true,
        singleSelect: true
      }
    }
  },
  props: {
    streamingParams: {
      type: Array,
      default: () => {
        return []
      }
    },
    relativeEntity: {
      type: Object
    }
  },
  methods: {
    onCancel () {
      this.$refs.modalRef.hide()

      this.selectedType = null
      this.selectedEntity = null
      this.selectedParam = ''
      this.mappingKey = ''
      this.mappingValue = ''
    },
    onSave () {
      let entity = {}

      switch (this.selectedType) {
        case 'object':
          entity = {
            type: 'object',
            value: {}
          }
          break
        case 'list':
          entity = {
            type: 'list',
            value: []
          }
          break
        case 'value':
          if (this.relativeEntity.node.type === 'list') {
            this.mappingKey = 'value'
          }

          if (this.selectedEntity === 'Gateway') {
            let selectedGatewayParam = null

            this.$_.forEach(this.streamingParams, (param) => {
              if (param.uuid === this.selectedParam) {
                selectedGatewayParam = param
              }
            })

            entity = {
              type: 'value',
              entity: 'gateway',
              entity_id: this.selectedGateway.id,
              value: selectedGatewayParam.uuid
            }
          } else {
            let selectedSensor = this.$refs.tree.getSelectedNodes()[0]
            entity = {
              type: 'value',
              entity: 'sensor',
              entity_id: selectedSensor.parentId,
              value: selectedSensor.uuid
            }
          }
          break
      }
      this.$emit('on-save-mapping', { key: this.mappingKey, value: this.selectedParam, type: this.selectedType, entity: entity })
      this.$refs.modalRef.hide()

      this.selectedType = null
      this.selectedEntity = null
      this.selectedParam = ''
      this.mappingKey = ''
      this.mappingValue = ''
    },
    onSelectMappingType () {
    },
    onSelectEntityType () {
    },
    onGatewayParamChange (param) {
    }
  },
  watch: {
    relativeEntity () {
      if (this.relativeEntity.node && this.relativeEntity.node.type === 'list') {
        this.selectedType = 'value'
      }
    }
  },
  computed: {
    ...mapGetters(['selectedGateway'])
  }
}
</script>

<style lang="scss" scoped>
  .parameter-modal-container {
    padding: 40px 20px;
    .select-type {
      margin-bottom: 20px;
      input {
        margin-bottom: 10px;
      }
    }
    .type-sections {
      margin-bottom: 20px;
    }
    .entity-sections {
      margin-bottom: 20px;
    }
    .vue-tree-container {
      margin-top: 20px;
      border: 1px solid #e2e2e2;
      height: 330px;
      border-radius: 4px;
      padding-bottom: 20px;
      overflow: auto;
    }
    .footer {
      text-align: right;
      margin-top: 30px;
      .save-btn {
        background-color: #4c92c3 !important;
        color: #ffffff !important;
      }
    }
  }
</style>
