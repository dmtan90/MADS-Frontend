<template>
    <div v-if="mappingTreeData">
        <div v-if="editParameterMapping">
          <div class="btn-container">
            <b-button @click="saveMappings" class="save-param-btn">Save Mappings</b-button>
          </div>
          <div class="tree-container">
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
        </div>
        <parameter-modal ref="parameterModal" :streamingParams="streamingParams" @on-save-mapping="onSaveMapping"></parameter-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import gatewayService from '@/services/gateway.service'
import GatewayEventBus from '../gatewayEventBus'
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
      editParameterMapping: true
    }
  },
  methods: {
    renderPrintObject () {
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
        options: {
          label: mapping.key + ' = ' + mapping.value,
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
        list = this.$_.concat(list, child.value)
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
              [child.key]: object
            })
            break
          case 'list':
            let list = this.traverseList(child)
            obj = this.$_.merge(obj, {
              [child.key]: child.value
            })
            obj[child.key] = list
            break
          case 'value':
            obj = this.$_.merge(obj, {
              [child.key]: child.value
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
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedGateway'])
  },
  mounted () {
    this.initTreeData()
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
    pre {
      font-size: 14px;
      background-color: #f2f2f2;
      padding: 20px;
      height: 450px;
      overflow: auto;
      border: 1px solid #d8d8d8;
      border-radius: 4px;
    }
  }

</style>
