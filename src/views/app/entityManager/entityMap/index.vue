<template>
  <div class="entity-map">
    <div class="vue-tree-container">
      <tree-header @save-tree-data="saveTreeData()" :selectedView="selectedView" @change-view="changeView($event)"></tree-header>
      <div class="vue-tree-wrap">
        <mads-tree
          ref="tree"
          :treeView="selectedView"
          :treeOptions="{showHoverOptions: true}"
          @on-node-click="onSelectEntity"
          >
        </mads-tree>
      </div>
    </div>
    <div class="right-section">
      <ul class="nav">
        <li :class="{active: selectedTab === 'properties'}" @click="selectedTab = 'properties'">Properties</li>
        <li :class="{active: selectedTab === 'settings'}" @click="selectedTab = 'settings'">Settings</li>
      </ul>
      <div v-if="selectedEntity" class="properties">
        <entity-properties v-if="selectedTab === 'properties'" :entityData="selectedEntity" @entity-deleted="onEntityDeleted()"></entity-properties>
        <entity-settings v-else></entity-settings>
      </div>
    </div>

    <entity-modal ref="addEntityModal" :entityType="entityRelation" :entityMapParentNode="entityMapParentNode"></entity-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import entityService from '@/services/entity.service'
import madsTree from './../../shared/madsTree/index'
import entityProperties from './entityProperties'
import entitySettings from './entitySettings'
import treeHeader from './vueTreeHeader'
import entityModal from './newEntityModal'
import TreeEventBus from './../../shared/madsTree/treeEventBus'

export default {
  components: {
    madsTree,
    entityProperties,
    entitySettings,
    treeHeader,
    entityModal
  },
  data () {
    return {
      entityRelation: '',
      selectedTab: 'properties',
      selectedEntity: null,
      selectedParentEntity: null,
      selectedView: 'map',
      entityMapParentNode: null
    }
  },
  methods: {
    ...mapActions(['selectProject']),
    onEntityDeleted () {
      this.selectedEntity = null
    },
    saveTreeData () {
      let loader = this.$loading.show()
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      let payload = this.$refs.tree.getTreeData()

      entityService.create(config, payload)
        .then(response => {
          TreeEventBus.$emit('reload-entities')
          loader.hide()
          this.$toast.success('Entity Map Saved Successfully', { position: 'top-right' })
        })
    },
    changeView (view) {
      this.selectedView = view
    },

    // Event Emitter Functions
    onSelectEntity (e, data) {
      this.selectedEntity = data.node
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  },
  mounted () {
    TreeEventBus.$on('show-entity-modal', (entityRelation) => {
      this.entityRelation = entityRelation
      this.entityMapParentNode = this.$refs.tree && this.$refs.tree.getParentNode()
      this.$refs.addEntityModal && this.$refs.addEntityModal.$refs.entityModal.show()
    })
  },
  beforeDestroy () {
    this.selectProject(null)
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
      .vue-tree-wrap {
        overflow: auto;
        height: calc(100% - 60px);
        background-color: #f9fafc;
      }
    }
    .right-section {
      border-left: 1px solid #c8cbce;
      width: 20%;
      margin-left: 5px;
      background-color: #f8f8f8;
      ul.nav {
        height: 45px;
        li {
          width: 50%;
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
      .properties {
        height: calc(100% - 45px);
      }
    }
  }
</style>
