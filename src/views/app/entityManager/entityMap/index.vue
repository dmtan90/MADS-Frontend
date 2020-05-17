<template>
  <div class="h-100">
    <div class="entity-map" v-if="!isDataLoading">
      <div class="vue-tree-container">
        <tree-header :projectName="getProjectName()" @save-tree-data="saveTreeData()"></tree-header>
        <div class="vue-tree">
          <mads-org-tree
            :data="treeData"
            @on-expand-collapse-click="onExpandCollapseClick"
            @on-add-sibling-entity="onAddSiblingEntity"
            @on-add-child-entity="onAddChildEntity"
          >
          </mads-org-tree>
        </div>
      </div>
      <div class="properties-settings">
        <ul class="nav">
          <li :class="{active: selectedTab === 'properties'}" @click="selectedTab = 'properties'">Properties</li>
          <li :class="{active: selectedTab === 'settings'}" @click="selectedTab = 'settings'">Settings</li>
        </ul>
        <entity-properties v-if="selectedTab === 'properties'"></entity-properties>
        <entity-settings v-else></entity-settings>
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
import madsOrgTree from './../../shared/renderTree.js'
import entityModal from './newEntityModal'
import entityProperties from './entityProperties'
import entitySettings from './entitySettings'
import treeHeader from './vueTreeHeader'

export default {
  components: {
    madsOrgTree,
    entityModal,
    entityProperties,
    entitySettings,
    treeHeader
  },
  data () {
    return {
      orgData: {},
      treeData: {},
      relativeEntity: {},
      entityType: '',
      selectedTab: 'properties',
      isDataLoading: false
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
          this.treeData = this.makeTreeData(this.orgData)
          this.isDataLoading = false
        })
    },
    getProjectName () {
      return this.orgData.entities ? this.orgData.entities[0].name : ''
    },
    getHoverOptions (type) {
      let hoverOptions = {
        sibling: false,
        child: false
      }

      switch (type) {
        case 'Project':
          hoverOptions = this.$_.merge(hoverOptions, { child: true })
          break
        case 'Asset':
          hoverOptions = this.$_.merge(hoverOptions, { sibling: true, child: true })
          break
        case 'Sensor':
          hoverOptions = this.$_.merge(hoverOptions, { sibling: true })
          break
      }

      return hoverOptions
    },
    makeTreeData (entity) {
      let childrenPresent = (entity.type !== 'Sensor' && entity.entities && this.$_.size(entity.entities)) > 0
      let that = this
      if (childrenPresent) {
        return this.$_.assign(entity, {
          options: {
            label: entity.name,
            classes: [entity.type],
            expanded: true,
            hoverOptions: this.getHoverOptions(entity.type)
          }
        },
        {
          children: this.$_.map(entity.entities, function (entity) {
            return that.makeTreeData(entity)
          })
        })
      } else {
        return this.$_.assign((entity, {
          options: {
            label: entity.name,
            classes: [entity.type],
            hoverOptions: this.getHoverOptions(entity.type)
          }
        }))
      }
    },
    onExpandCollapseClick (e, data) {
      this.$set(data.options, 'expanded', !data.options.expanded)
      this.treeData = this.$_.assign({}, this.treeData)
    },
    onAddSiblingEntity (e, data) {
      this.entityType = 'sibling'
      this.relativeEntity = data
      this.$refs.addEntityModal.$refs.entityModal.show()
    },
    onAddChildEntity (e, data) {
      this.entityType = 'child'
      this.relativeEntity = data
      this.$refs.addEntityModal.$refs.entityModal.show()
    },
    addEntity (data) {
      let parentNode = (this.entityType === 'sibling') ? this.relativeEntity.parentNode : this.relativeEntity.node

      let entity = data.entity
      let node = this.$_.assign(entity, { action: 'create', type: data.type, parent_id: parentNode.id || null }, {
        options: {
          label: entity.name,
          classes: [data.type],
          hoverOptions: this.getHoverOptions(data.type)
        }
      })
      let children = this.$_.concat(parentNode.children || [], node)
      let entities = this.$_.concat(parentNode.entities || [], node)

      this.$set(parentNode, 'children', children)
      this.$set(parentNode, 'entities', entities)
      this.$set(parentNode.options, 'expanded', true)

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
