<template>
  <div class="h-100">
    <div class="entity-map" v-if="!isDataLoading">
      <div class="vue-tree-container">
        <tree-header :projectName="getProjectName()" @save-tree-data="saveTreeData()" :selectedView="selectedView" @change-view="changeView($event)"></tree-header>
        <mads-tree
          :treeData="treeData"
          :treeView="selectedView"
          :treeOptions="treeOptions"
          @on-node-click="onNodeClick"
          @on-add-sibling-node="onAddSiblingNode"
          @on-add-child-node="onAddChildNode"
        ></mads-tree>
      </div>
      <div class="properties-settings">
        <ul class="nav">
          <li :class="{active: selectedTab === 'properties'}" @click="selectedTab = 'properties'">Properties</li>
          <li :class="{active: selectedTab === 'settings'}" @click="selectedTab = 'settings'">Settings</li>
        </ul>
        <div v-if="selectedEntity">
          <entity-properties v-if="selectedTab === 'properties'" :entity="selectedEntity" @delete-entity="deleteEntity()"></entity-properties>
          <entity-settings v-else></entity-settings>
        </div>
      </div>
      <entity-modal ref="addEntityModal" :entityType="entityType"></entity-modal>
    </div>
    <div v-else class="loading"></div>
  </div>
</template>

<script>
import EntityMapBus from './entityMapBus'
import { mapGetters } from 'vuex'
import entityService from '@/services/entity.service'
import treeService from '@/services/tree.service'
import madsTree from './../../shared/madsTree/madsTree'
import entityModal from './newEntityModal'
import entityProperties from './entityProperties'
import entitySettings from './entitySettings'
import treeHeader from './vueTreeHeader'

export default {
  components: {
    madsTree,
    entityModal,
    entityProperties,
    entitySettings,
    treeHeader
  },
  data () {
    return {
      orgData: {},
      treeData: {},
      treeOptions: {},
      relativeEntity: {},
      entityType: '',
      selectedTab: 'properties',
      selectedEntity: null,
      selectedParentEntity: null,
      isDataLoading: false,
      selectedView: 'map'
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
          this.treeOptions = treeService.initOptions({ showHoverOptions: true })
          this.treeData = treeService.initData(this.orgData)
          this.isDataLoading = false
        })
    },
    getProjectName () {
      return this.orgData.entities ? this.orgData.entities[0].name : ''
    },
    addEntity (data) {
      let parentNode = (this.entityType === 'sibling') ? this.relativeEntity.parentNode : this.relativeEntity.node

      let entity = data.entity
      let node = this.$_.assign(entity, { action: 'create', type: data.type, parent_id: parentNode.id || null }, {
        options: {
          label: entity.name,
          classes: [data.type],
          hoverOptions: this.getHoverOptions(data.type),
          visible: true
        }
      })
      let children = this.$_.concat(parentNode.children || [], node)
      let entities = this.$_.concat(parentNode.entities || [], node)

      this.$set(parentNode, 'children', children)
      this.$set(parentNode, 'entities', entities)
      this.$set(parentNode.options, 'expanded', true)

      this.treeData = this.$_.assign({}, this.treeData)
    },
    deleteEntity () {
      this.$set(this.selectedEntity.options, 'visible', false)
      this.$set(this.selectEntity, 'action', 'delete')

      this.treeData = this.$_.assign({}, this.treeData)
    },
    formatTreeData (entity) {
      let that = this

      this.$_.map(entity.entities, function (entity) {
        that.formatTreeData(entity)
      })

      delete entity.children
      delete entity.options
    },
    saveTreeData () {
      this.isDataLoading = true

      let config = { orgId: this.currentUser.org.id, projectId: 1 }
      let payload = this.$_.assign({}, this.treeData)
      this.formatTreeData(payload)

      entityService.create(config, payload)
        .then(response => {
          this.loadProjectEntities()
        })
    },
    changeView (view) {
      this.selectedView = view
    },

    // Event Emitter Functions
    onNodeClick (e, data) {
    },
    onAddSiblingNode (e, data) {
      this.entityType = 'sibling'
      this.relativeEntity = data
      this.$refs.addEntityModal.$refs.entityModal.show()
    },
    onAddChildNode (e, data) {
      this.entityType = 'child'
      this.relativeEntity = data
      this.$refs.addEntityModal.$refs.entityModal.show()
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadProjectEntities()

    EntityMapBus.$on('add-entity', this.addEntity)
  },
  beforeDestroy () {
    EntityMapBus.$off()
  }
}
</script>

<style lang="scss" scoped>
  .entity-map {
    display: flex;
    height: 100%;
    .vue-tree-container {
      width: 80%;
      border-right: 1px solid #c8cbce;
    }
    .properties-settings {
      border-left: 1px solid #c8cbce;
      width: 20%;
      margin-left: 5px;
      background-color: #f8f8f8;
      ul.nav {
        li {
          width: 50%;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          cursor: pointer;
          &:not(.active) {
            background-color: #888888;
            border-bottom: 1px solid;
            color: white;
            &:first-child {
              border-right: 1px solid;
              border-bottom-right-radius: 4px;
            }
            &:last-child {
              border-left: 1px solid;
              border-bottom-left-radius: 4px;
            }
          }
        }
      }
    }
  }
</style>
