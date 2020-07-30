<template>
    <div v-if="mappingTreeData">
        <b-button @click="saveMappings">Save Mappings</b-button>
        <vue-tree @on-add-sibling-node="onAddSiblingNode"
                  @on-add-child-node="onAddChildNode"
                  :treeData="mappingTreeData"
                  :treeOptions="treeOptions"
                  :treeView="treeView">
        </vue-tree>
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
      isParameterMappingsEmpty: true
    }
  },
  methods: {
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

      debugger
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

      if (parentNode.type === 'List') {
        let value = this.$_.concat(parentNode.value || [], { type: mapping.type, value: mapping.value })
        this.$set(parentNode, 'value', value)
      }
      if (parentNode.type === 'Object') {
        let value = this.$_.merge({}, parentNode.value, { type: mapping.type, value: mapping.value })
        this.$set(parentNode, 'value', value)
      }
      this.$set(parentNode, 'children', children)
      this.$set(parentNode.options, 'expanded', true)

      this.mappingTreeData = this.$_.merge({}, this.mappingTreeData)
    },
    onSaveMapping (mapping) {
      switch (mapping.type) {
        case 'Object':
          this.addObjectType(mapping)
          break
        case 'List':
          this.addListType(mapping)
          break
        case 'Value':
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
    addObjectToMapping () {

    },
    addListToMapping () {

    },
    saveMappings () {
      // this.$_.forEach(this.mappingTreeData, (key, ) => {

      // })
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

</style>
