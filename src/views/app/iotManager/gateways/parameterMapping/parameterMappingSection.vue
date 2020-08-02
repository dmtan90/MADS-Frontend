<template>
    <div>
        <div v-if="editParameterMapping">
          <div class="btn-container">
            <b-button @click="saveMappings()" class="save-param-btn">Save Mappings</b-button>
          </div>
          <div class="tree-container" v-if="mappingTreeData">
            <vue-tree @on-add-sibling-node="onAddSiblingNode"
                    @on-add-child-node="onAddChildNode"
                    :treeData="mappingTreeData"
                    :treeOptions="treeOptions"
                    :treeView="treeView"
                    ref="parameterTree">
            </vue-tree>
          </div>
        </div>
        <div class="json-print" v-if="!editParameterMapping">
          <pre>{{renderPrintObject()}}</pre>
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

export default {
  components: {
    VueTree,
    parameterModal
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
      editParameterMapping: false
    }
  },
  methods: {
    renderPrintObject () {
      // let printObject = this.traversePrintRootObject(this.parameterMappings)
      let json = JSON.stringify(this.parameterMappings, undefined, 2)
      return json.replace(/"([^"]+)":/g, '$1:')
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
        value: mapping.value,
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
    },
    onAddChildNode (e, data) {
      this.entityRelation = 'child'
      this.relativeEntity = data
      this.$refs.parameterModal.$refs.modalRef.show()
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

      let config = { orgId: this.currentUser.org.id, projectId: 1, id: this.selectedGateway.id }
      let gatewayData = {
        mapped_parameters: this.parameterMappings
      }

      gatewayService.update(config, gatewayData)
        .then((res) => {
        })
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
    ...mapGetters(['currentUser', 'selectedGateway'])
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
    .save-param-btn {
      background-color: #4c92c3 !important;
      color: white !important;
      border-color: #4c92c3 !important;
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
      width: 40px;
      height: 40px;
      cursor: pointer;
      background-color: #4c92c3;
      fill: white;
      padding: 8px;
    }
  }

</style>
