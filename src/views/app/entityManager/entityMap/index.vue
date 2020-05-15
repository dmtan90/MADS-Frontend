<template>
  <div class="entity-map">
    <div class="vue-tree-container">
      <div class="vue-tree-header">Organization Tree</div>
      <div class="vue-tree" v-if="!$_.isEmpty(treeData)">
        <mads-org-tree
          :data="treeData"
          @on-expand-collapse-click="onExpandCollapseClick"
          @on-add-sibling-entity="addSiblingEntity"
          @on-add-child-entity="addChildEntity"
        >
        </mads-org-tree>
      </div>
      <div v-else class="loading"></div>
    </div>
    <div class="properties-settings">
      <ul class="nav">
        <li :class="{active: selectedTab === 'properties'}">Properties</li>
        <li :class="{active: selectedTab === 'settings'}">Settings</li>
      </ul>
      <entity-properties v-if="selectedTab === 'properties'"></entity-properties>
      <div v-else>
      </div>
    </div>

    <entity-modal ref="addEntityModal" :relativeEntity="relativeEntity" :newEntityType="newEntityType"></entity-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import organizationService from '@/services/organization.service'
import madsOrgTree from './../../shared/renderTree.js'
import entityModal from './newEntityModal'
import entityProperties from './entityProperties'

export default {
  components: {
    madsOrgTree,
    entityModal,
    entityProperties
  },
  data () {
    return {
      orgData: null,
      treeData: {},
      relativeEntity: {},
      newEntityType: '',
      selectedTab: 'properties'
    }
  },
  methods: {
    loadOrganization () {
      let config = { orgId: this.currentUser.org.id }
      organizationService
        .read(config)
        .then(response => {
          this.orgData = response
          this.treeData = this.makeTreeData(this.orgData, true)
        })
    },
    makeTreeData (entity, isRoot = false) {
      let childrenPresent = (entity.type !== 'Sensor')
      let that = this
      if (childrenPresent) {
        return {
          id: entity.id,
          label: entity.name,
          type: entity.type,
          isRoot: isRoot,
          classes: [entity.type],
          expanded: true,
          children: this.$_.map(entity.entities, function (entity) {
            return that.makeTreeData(entity)
          })
        }
      } else {
        return {
          id: entity.id,
          label: entity.name,
          type: entity.type,
          isLeaf: true,
          classes: [entity.type]
        }
      }
    },
    onExpandCollapseClick (e, data) {
      this.$set(data, 'expanded', !data.expanded)
    },
    addSiblingEntity (e, data) {
      this.newEntityType = 'sibling'
      this.$refs.addEntityModal.$refs.entityModal.show()
    },
    addChildEntity (e, data) {
      this.newEntityType = 'child'
      this.$refs.addEntityModal.$refs.entityModal.show()
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadOrganization()
  }
}
</script>

<style lang="scss" scoped>
  .entity-map {
    display: flex;
    height: 100%;
    justify-content: center;
    .vue-tree-container {
      width: 80%;
      overflow: scroll;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      .vue-tree-header {
        height: 40px;
        border-bottom: 1px solid #ddd;
      }
      .vue-tree {
        // padding: 0 40px;
      }
    }
    .properties-settings {
      border-left: 1px solid #ddd;
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
          &.active {
            border: 1px solid;
            background-color: #e4e4e4;
          }
        }
      }
    }
  }
</style>
