<template>
  <mads-tree
    v-if="!isDataLoading"
    ref="tree"
    :treeData="treeData"
    :treeView="treeView"
    :treeOptions="options"
    :isAnyNodeSelected="isAnyNodeSelected"
    @on-add-sibling-node="onAddSiblingNode"
    @on-add-child-node="onAddChildNode"
    @on-node-click="onNodeClick"
    @on-node-select="onNodeSelect" 
  ></mads-tree>
  <div v-else class="loading"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import madsTree from './../../shared/madsTree/madsTree'
import treeService from '@/services/tree.service'
import entityService from '@/services/entity.service'

export default {
  components: {
    madsTree
  },
  data () {
    return {
      isDataLoading: false,
      orgData: null,
      treeData: null,
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
    isAnyNodeSelected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    loadProjectEntities () {
      this.isDataLoading = true
      let config = { orgId: this.currentUser.org.id, projectId: 1 }
      entityService
        .read(config)
        .then(response => {
          this.orgData = response
          this.treeData = treeService.initData(this.orgData, 'sensor-parameter', this.selectedNodes)
          this.isDataLoading = false
        })
    },
    getSelectedNodes () {
      return this.$refs.tree.getCheckedNodes()
    },
    // In case of single select
    getSingleSelectedNode () {
      let selectedNodes = this.getSelectedNodes()
      return (this.$_.size(selectedNodes) > 0) ? selectedNodes[0] : null
    },

    // Event Emitter Functions
    onNodeClick (event, data) {
      this.$emit('on-node-click', event, data)
    },
    onAddSiblingNode (event, data) {
      this.$emit('on-add-sibling-node', event, data)
    },
    onAddChildNode (event, data) {
      this.$emit('on-add-child-node', event, data)
    },
    onNodeSelect (event, data) {
      this.$emit('on-node-select', event, data)
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.options = this.$_.merge(this.options, this.treeOptions)
    this.loadProjectEntities()
  }
}
</script>

<style lang="scss" scoped>

</style>
