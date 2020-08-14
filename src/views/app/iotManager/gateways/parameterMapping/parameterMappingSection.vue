<template>
    <div>
      <div v-if="editParameterMapping" class="edit-mappings">
        <div class="tree-container" v-if="mappingTreeData">
          <vue-tree @on-add-sibling-node="onAddSiblingNode"
                  @on-add-child-node="onAddChildNode"
                  @on-node-click="onSelectEntity"
                  :treeData="mappingTreeData"
                  :treeOptions="treeOptions"
                  :treeView="treeView"
                  ref="parameterTree">
          </vue-tree>
        </div>
        <div class="mapping-actions">
          <div class="actions-text">Actions</div>
          <div class="btn-container">
            <b-button @click="saveMappings()" class="btn save-param-btn custom-btn">Save Mappings</b-button>
          </div>
          <div v-if="selectedEntity" style="border-top: 1px solid #e2e2e2; padding: 10px;">
            <div class="selected-entity">
              <span class="key">Key:</span>
              <span class="value">{{selectedEntity.node.key}}</span>
            </div>
            <div class="selected-entity">
              <span class="key">Value:</span>
              <span class="value" v-if="selectedEntity.node.type === 'list'">[ ]</span>
              <span class="value" v-if="selectedEntity.node.type === 'object'">{ }</span>
              <span class="value" v-if="selectedEntity.node.type === 'value'">{{selectedEntity.node.value}}</span>
            </div>
            <div class="selected-entity">
              <span class="key">Type:</span>
              <span class="value">{{selectedEntity.node.type}}</span>
            </div>
            <div class="btn-container">
              <b-button @click="deleteMapping()" class="btn delete-btn custom-btn">Delete Mapping</b-button>
            </div>
          </div>
        </div>
      </div>
      <div class="json-print" v-if="!editParameterMapping">
        <vue-json-editor v-model="parameterMappings" :show-btns="false" :expandedOnStart="false" :mode="'view'"></vue-json-editor>
        <!-- <pre>{{renderPrintObject()}}</pre> -->
        <svg class="icon" @click="editMappings()">
          <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
        </svg>
      </div>
      <parameter-modal ref="parameterModal" :streamingParams="streamingParams" :relativeEntity="relativeEntity" @on-save-mapping="onSaveMapping"></parameter-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import gatewayService from '@/services/gateway.service'
import VueTree from 'vanyan-tree'
import parameterModal from './addParameterMappingModal'
import vueJsonEditor from 'vue-json-editor'

export default {
  components: {
    VueTree,
    parameterModal,
    vueJsonEditor
  },
  props: {
    streamingParams: {
      type: Array,
      default: () => {
        return []
      }
    },
    mappedParams: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      parameterMappings: {},
      mappingTreeData: null,
      treeView: 'outline',
      treeOptions: {
        childrenKey: 'children',
        selectable: false,
        showHoverOptions: true
      },
      relativeEntity: {},
      entityRelation: '',
      editParameterMapping: false,
      selectedEntity: null
    }
  },
  methods: {
    renderPrintObject () {
      // let printObject = this.traversePrintRootObject(this.parameterMappings)
      return JSON.stringify(this.parameterMappings, undefined, 2)
      // return json.replace(/"([^"]+)":/g, '$1:')
    },
    initTreeData () {
      this.mappingTreeData = {
        key: 'mappings',
        value: {},
        type: 'object',
        options: {
          label: 'Mappings',
          classes: [],
          icon: '',
          hoverOptions: {
            sibling: false,
            child: true
          },
          expanded: true,
          selected: false,
          visible: true,
          selectable: false,
          draggable: false
        },
        children: []
      }
    },
    addObjectType (mapping) {
      let parentNode = (this.entityRelation === 'sibling') ? this.relativeEntity.parentNode : this.relativeEntity.node
      let node = {
        key: mapping.key,
        value: {},
        type: mapping.type,
        entity: mapping.entity,
        options: {
          label: mapping.key + ' = { }',
          classes: [],
          icon: '',
          hoverOptions: {
            sibling: true,
            child: true
          },
          expanded: false,
          selected: false,
          visible: true,
          selectable: false,
          draggable: false
        }
      }

      let children = this.$_.concat(parentNode.children || [], node)
      this.$set(parentNode, 'children', children)
      this.$set(parentNode.options, 'expanded', true)

      this.mappingTreeData = this.$_.merge({}, this.mappingTreeData)
    },
    addListType (mapping) {
      let parentNode = (this.entityRelation === 'sibling') ? this.relativeEntity.parentNode : this.relativeEntity.node
      let node = {
        key: mapping.key,
        value: [],
        type: mapping.type,
        entity: mapping.entity,
        options: {
          label: mapping.key + ' = [ ]',
          classes: [],
          icon: '',
          hoverOptions: {
            sibling: true,
            child: true
          },
          expanded: false,
          selected: false,
          visible: true,
          selectable: false,
          draggable: false
        }
      }

      let children = this.$_.concat(parentNode.children || [], node)
      this.$set(parentNode, 'children', children)
      this.$set(parentNode.options, 'expanded', true)

      this.mappingTreeData = this.$_.merge({}, this.mappingTreeData)
    },
    addValueType (mapping) {
      let parentNode = (this.entityRelation === 'sibling') ? this.relativeEntity.parentNode : this.relativeEntity.node
      let node = {
        key: mapping.key,
        value: mapping.entity.value,
        type: mapping.type,
        entity: mapping.entity,
        options: {
          label: mapping.key + ' = ' + mapping.entity.value,
          classes: [],
          icon: '',
          hoverOptions: {
            sibling: false,
            child: false
          },
          expanded: false,
          selected: false,
          visible: true,
          selectable: false,
          draggable: false
        }
      }

      let children = this.$_.concat(parentNode.children || [], node)

      if (parentNode.type === 'list') {
        let value = this.$_.concat(parentNode.value || [], { type: mapping.type, value: mapping.value })
        this.$set(parentNode, 'value', value)
      }
      if (parentNode.type === 'object') {
        let value = this.$_.merge({}, parentNode.value, { type: mapping.type, value: mapping.value })
        this.$set(parentNode, 'value', value)
      }
      this.$set(parentNode, 'children', children)
      this.$set(parentNode.options, 'expanded', true)

      this.mappingTreeData = this.$_.merge({}, this.mappingTreeData)
    },
    onSaveMapping (mapping) {
      switch (mapping.type) {
        case 'object':
          this.addObjectType(mapping)
          break
        case 'list':
          this.addListType(mapping)
          break
        case 'value':
          this.addValueType(mapping)
          break
      }
    },
    onAddSiblingNode (e, data) {
      this.entityRelation = 'sibling'
      this.relativeEntity = data
      this.$refs.parameterModal.$refs.modalRef.show()

      this.selectedEntity = null
    },
    onAddChildNode (e, data) {
      this.entityRelation = 'child'
      this.relativeEntity = data
      this.$refs.parameterModal.$refs.modalRef.show()

      this.selectedEntity = null
    },
    traverseList (data) {
      let list = []

      this.$_.forEach(data.children, (child) => {
        list = this.$_.concat(list, child.entity)
      })

      return list
    },
    traverseObject (data) {
      let obj = {}
      this.$_.forEach(data.children, (child) => {
        switch (child.type) {
          case 'object':
            let object = this.traverseObject(child)
            obj = this.$_.merge(obj, {
              [child.key]: {
                type: 'object',
                value: object
              }
            })
            break
          case 'list':
            let list = this.traverseList(child)
            obj = this.$_.merge(obj, {
              [child.key]: {
                type: 'list',
                value: list
              }
            })
            break
          case 'value':
            obj = this.$_.merge(obj, {
              [child.key]: child.entity
            })
            break
        }
      })

      return obj
    },
    saveMappings () {
      let treeData = this.$refs.parameterTree.data
      this.parameterMappings = this.traverseObject(treeData)
      this.editParameterMapping = false

      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id, id: this.selectedGateway.id }
      let gatewayData = {
        mapped_parameters: this.parameterMappings
      }

      gatewayService.update(config, gatewayData)
        .then((res) => {
        })
    },
    deleteMapping () {
      let parentNode = this.selectedEntity.parentNode
      let node = this.selectedEntity.node

      let key = 'key'
      if (node.type === 'value') {
        key = 'value'
      }

      let children = this.$_.filter(parentNode.children, function (child) { return child[key] !== node[key] })
      this.$set(parentNode, 'children', children)

      this.selectedEntity = null
    },
    onSelectEntity (e, entityData) {
      this.selectedEntity = entityData
    },
    initObject (mapping, key) {
      switch (mapping.type) {
        case 'object':
          let objectList = this.$_.map(mapping.value, (mappingValue, key) => {
            return this.initObject(mappingValue, key)
          })
          return {
            key: key,
            value: {},
            type: mapping.type,
            entity: {
              type: 'object',
              value: {}
            },
            options: {
              label: key + ' = { }',
              classes: [],
              icon: '',
              hoverOptions: {
                sibling: true,
                child: true
              },
              expanded: true,
              selected: false,
              visible: true,
              selectable: false,
              draggable: false
            },
            children: objectList
          }
        case 'list':
          let list = this.$_.map((mapping.value), (mappingValue) => {
            return this.initObject(mappingValue, 'value')
          })
          return {
            key: 'value',
            value: [],
            type: mapping.type,
            entity: {
              type: 'list',
              value: []
            },
            options: {
              label: key + ' = [ ]',
              classes: [],
              icon: '',
              hoverOptions: {
                sibling: true,
                child: true
              },
              expanded: true,
              selected: false,
              visible: true,
              selectable: false,
              draggable: false
            },
            children: list
          }
        case 'value':
          return {
            key: key,
            value: mapping.value,
            type: mapping.type,
            entity: mapping,
            options: {
              label: key + ' = ' + mapping.value,
              classes: [],
              icon: '',
              hoverOptions: {
                sibling: false,
                child: false
              },
              expanded: false,
              selected: false,
              visible: true,
              selectable: false,
              draggable: false
            },
            children: []
          }
      }
    },
    initParameterMappings (mappings) {
      let children = this.$_.map(this.parameterMappings, (mapping, key) => {
        return this.initObject(mapping, key)
      })

      return {
        key: 'mappings',
        value: {},
        type: 'object',
        options: {
          label: 'Mappings',
          classes: [],
          icon: '',
          hoverOptions: {
            sibling: false,
            child: true
          },
          expanded: true,
          selected: false,
          visible: true,
          selectable: false,
          draggable: false
        },
        children: children
      }
    },
    editMappings () {
      let parameterMappings = this.initParameterMappings(this.parameterMappings)
      this.mappingTreeData = this.$_.merge({}, parameterMappings)
      this.editParameterMapping = true
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject', 'selectedGateway'])
  },
  watch: {
    mappedParams () {
      this.parameterMappings = this.mappedParams
    }
  },
  mounted () {
    // this.initTreeData()
  }
}
</script>

<style lang="scss" scoped>
  .btn-container {
    text-align: center;
    .btn {
      border-radius: 4px !important;
      margin: 10px 0;
      color: white !important;
    }
    .save-param-btn {
      background-color: #4c92c3 !important;
      border-color: #4c92c3 !important;
    }
    .delete-btn {
      background-color: red !important;
      border-color: red !important;
    }
  }
  .edit-mappings {
    display: flex;
    height: 700px;
    .mapping-actions {
      width: 400px;
      border: 1px solid #e2e2e2;
      border-left: none;
      margin: 0 0 0 auto;
      padding: 20px 0px;
      position: relative;
      .actions-text {
        position: absolute;
        top: -30px;
        font-size: 18px;
        left: 50%;
        transform: translateX(-50%);
      }
      .selected-entity {
        padding: 4px 0;
        .key {
          font-size: 15px;
          width: 50px;
          display: inline-block;
        }
        .value {
          font-size: 14px;
          overflow: hidden;
        }
      }
    }
    .tree-container {
      width: calc(100% - 250px);
      border: 1px solid #e2e2e2;
      height: 700px;
      overflow: auto;
    }
  }
  .json-print {
    position: relative;
    pre {
      font-size: 13px;
      background-color: #f2f2f2;
      padding: 20px;
      height: 450px;
      overflow: auto;
      border: 1px solid #d8d8d8;
      border-radius: 4px;
    }
    .icon {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      width: 40px;
      height: 40px;
      background-color: #9BCCE5;
      border-radius: 20px;
      padding: 8px;
    }
  }

</style>
