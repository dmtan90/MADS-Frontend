<template>
  <div v-if="treeData">
    <mads-tree
      ref="tree"
      :treeData="treeData"
      :treeView="treeView"
      :treeOptions="options"
      :isAnyNodeSelected="isAnyNodeSelected"
      @on-add-sibling-node="onAddSiblingNode"
      @on-add-child-node="onAddChildNode"
      @on-node-click="onNodeClick"
      @on-node-select="onNodeSelect"
      @on-node-mouse-over="onNodeMouseOver"
      @on-node-mouse-leave="onNodeMouseLeave"
      @on-node-drag-start="onNodeDragStart"
    ></mads-tree>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import madsTree from './../../shared/madsTree/madsTree'
import treeService from '@/services/tree.service'
import entityService from '@/services/entity.service'
import orgService from '@/services/organization.service'
import TreeEventBus from './treeEventBus'

export default {
  components: {
    madsTree
  },
  data () {
    return {
      orgData: null,
      treeData: null,
      relativeEntity: {},
      entityRelation: '',
      options: {
        childrenKey: 'entities',
        selectable: false,
        showHoverOptions: false,
        singleSelect: false
      }
    }
  },
  props: {
    treeView: {
      type: String
    },
    treeOptions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectedNodes: {
      type: Array,
      default: () => {
        return []
      }
    },
    hiddenEntities: {
      type: Array,
      default: () => {
        return ['SensorParameter']
      }
    },
    selectableEntities: {
      type: Array,
      default: () => {
        return ['Organisation', 'Asset']
      }
    },
    isAnyNodeSelected: {
      type: Boolean,
      default: false
    },
    editingEntity: {
      default: null
    },
    type: {
      type: String,
      default: 'project'
    }
  },
  methods: {
    loadProjectEntities () {
      let loader = this.$loading.show()

      let config = { orgId: this.currentUser.org.id, projectId: (this.selectedProject ? this.selectedProject.id : 1) }
      entityService
        .read(config)
        .then(response => {
          loader.hide()

          this.orgData = response
          this.treeData = treeService.initData(this.orgData, {
            selectedNodes: this.selectedNodes,
            hiddenEntities: this.hiddenEntities,
            selectableEntities: this.selectableEntities,
            editingEntity: this.editingEntity
          })
        })
    },
    loadOrgEntities () {
      let loader = this.$loading.show()

      let config = { orgId: this.currentUser.org.id }
      orgService
        .readEntities(config)
        .then(response => {
          loader.hide()

          this.orgData = response
          this.treeData = treeService.initData(this.orgData, {
            selectedNodes: this.selectedNodes,
            hiddenEntities: this.hiddenEntities,
            selectableEntities: this.selectableEntities,
            editingEntity: this.editingEntity
          })
        })
    },
    getTreeData () {
      return this.treeData
    },
    getSelectedNodes () {
      return this.$refs.tree.getCheckedNodes()
    },
    // In case of single select
    getSingleSelectedNode () {
      let selectedNodes = this.getSelectedNodes()
      return (this.$_.size(selectedNodes) > 0) ? selectedNodes[0] : null
    },
    getParentNode () {
      return (this.entityRelation === 'sibling') ? this.relativeEntity.parentNode : this.relativeEntity.node
    },

    // Event Emitter Functions
    onNodeClick (event, data) {
      this.$emit('on-node-click', event, data)
    },
    onAddSiblingNode (event, data) {
      // this.$emit('on-add-sibling-node', event, data)
      this.entityRelation = 'sibling'
      this.relativeEntity = data
      TreeEventBus.$emit('show-entity-modal', 'sibling')
    },
    onAddChildNode (event, data) {
      // this.$emit('on-add-child-node', event, data)
      this.entityRelation = 'child'
      this.relativeEntity = data
      TreeEventBus.$emit('show-entity-modal', 'child')
    },
    onNodeSelect (event, data) {
      this.$emit('on-node-select', event, data)
    },
    onNodeMouseOver (event, data) {
      this.$emit('on-node-mouse-over', event, data)
    },
    onNodeMouseLeave (event, data) {
      this.$emit('on-node-mouse-leave', event, data)
    },
    onNodeDragStart (event, data) {
      this.$emit('on-node-drag-start', event, data)
    },

    // Tree Event Bus Functions
    addEntity (entityData, entityType) {
      let parentNode = (this.entityRelation === 'sibling') ? this.relativeEntity.parentNode : this.relativeEntity.node
      let node = this.$_.assign(entityData, { action: 'create', type: entityType, parent_id: parentNode.id || null }, {
        options: {
          label: entityData.name,
          classes: [entityType],
          expanded: false,
          selected: false,
          hoverOptions: { sibling: true, child: entityType === 'Asset' },
          visible: true,
          selectable: false,
          icon: entityType === 'Asset' ? '/assets/img/mads-entity-manager-icons.svg#assets' : '/assets/img/mads-entity-manager-icons.svg#sensors',
          isLeafNode: true
        }
      })
      let entities = this.$_.concat(parentNode.entities || [], node)
      this.$set(parentNode, 'entities', entities)
      this.$set(parentNode.options, 'expanded', true)
      this.$set(parentNode.options, 'isLeafNode', false)

      this.treeData = this.$_.assign({}, this.treeData)
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  },
  mounted () {
    this.options = this.$_.merge(this.options, this.treeOptions)

    if (this.type === 'project') {
      this.loadProjectEntities()
    } else {
      this.loadOrgEntities()
    }

    TreeEventBus.$on('add-entity', (entityData, entityType) => {
      this.addEntity(entityData, entityType)
    })

    TreeEventBus.$on('reload-entities', () => {
      this.loadProjectEntities()
    })
  }
}
</script>
