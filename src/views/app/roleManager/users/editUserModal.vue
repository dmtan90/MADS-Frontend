<template>
  <b-modal id="edit-user-modal" ref="editUserModal" size="lg" hide-footer>
    <div class="edit-user-details row">
      <div class="left-panel col col-3">
        <ul class="sections">
          <li @click="section = 1" class="item" :class="{'active': section === 1}">Edit User Details</li>
          <li @click="section = 2" class="item" :class="{'active': section === 2}">Edit User Assets</li>
          <li @click="section = 3" class="item" :class="{'active': section === 3}">Edit User Apps</li>
        </ul>
      </div>
      <div class="right-panel col col-9">
        <section v-if="section === 1" class="details">
          <h3>Edit User Details</h3>
          <b-form style="margin-top: 30px">
            <b-form-group label="Email" label-for="email">
              <b-form-input v-model="userEmail" id="email" type="email" required></b-form-input>
            </b-form-group>
            <b-form-group label="Select Role" label-for="role">
              <multiselect v-model="selectedRole" :options="roles" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Select role" label="name" track-by="id">
              </multiselect>
            </b-form-group>
            <b-form-group label="Activity Tracking">
              <toggle-button :value="true" :labels="{checked: 'on', unchecked: 'off'}"/>
            </b-form-group>
          </b-form>
        </section>
        <section v-if="section === 2" class="assets">
          <h3>Edit User Assets</h3>
          <div class="assets-container">
            <mads-tree ref="tree" :treeData="treeData" :treeView="'file'" :treeOptions="treeOptions"></mads-tree>
          </div>
        </section>
        <section v-if="section === 3" class="apps">
          <h3>Edit User Apps</h3>
          <apps-list></apps-list>
        </section>
        <div class="footer">
          <b-button @click="$bvModal.hide('edit-user-modal')">Cancel</b-button>
          <b-button @click="saveUser()">Save</b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import entityService from '@/services/entity.service'
import userService from '@/services/user.service'
import treeService from '@/services/tree.service'
import madsTree from '../../shared/madsTree/madsTree'
import appsList from '../../shared/modalAppsList'
import EventBus from './../eventBus'

export default {
  props: ['roles', 'user'],
  components: {
    madsTree,
    appsList
  },
  data () {
    return {
      section: 1,
      selectedRole: null,
      userEmail: '',
      orgData: null,
      treeData: null,
      treeOptions: {}
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
          this.treeOptions = treeService.initOptions({ selectable: true })
          this.treeData = treeService.initData(this.orgData)
          this.isDataLoading = false
        })
    },
    formatSensorParameterData (entity) {
      let childrenPresent = (entity.type !== 'Parameter')
      let that = this
      if (childrenPresent) {
        return {
          id: entity.id,
          type: entity.type,
          title: entity.name,
          expanded: (entity.type !== 'Sensor'),
          chkDisabled: (entity.type === 'Sensor'),
          children: this.$_.map(entity.entities, function (entity) {
            return that.formatSensorParameterData(entity)
          })
        }
      } else {
        return {
          id: entity.id,
          type: entity.type,
          title: entity.name,
          chkDisabled: true
        }
      }
    },
    formatAssetPropertyData (entity) {
      let isPropertiesPresent = entity.properties && this.$_.size(entity.properties) > 0
      let that = this
      if (!isPropertiesPresent) {
        return {
          id: entity.id,
          type: entity.type,
          title: entity.name,
          expanded: true,
          children: this.$_.map(entity.entities, function (entity) {
            return that.formatAssetPropertyData(entity)
          })
        }
      } else {
        return {
          id: entity.id,
          type: entity.type,
          title: entity.name,
          expanded: true,
          children: this.$_.map(entity.properties, function (property) {
            return {
              chkDisabled: true,
              title: '<span draggable="true" class="draggable-element" data-name="' + property + '">' + property + '</span>'
            }
          })
        }
      }
    },
    makeTreeData () {
      let entity = this.orgData
      this.sensorParameterData = [this.formatSensorParameterData(entity)]
      this.treeData = this.sensorParameterData
      this.assetPropertyData = [this.formatAssetPropertyData(entity)]
    },
    saveUser () {
      this.$refs.editUserModal.hide()
      if (this.section === 1) {
        this.updateUserDetails()
      }
    },
    updateUserDetails () {
      let config = { orgId: this.currentUser.org.id, userId: this.user.id }
      let payload = {
        role_id: this.selectedRole.id
      }
      userService.update(config, payload)
        .then((response) => {
          EventBus.$emit('reload-users')
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  watch: {
    user (user) {
      this.userEmail = this.user.email || ''
      this.selectedRole = this.user.originialRole || null
    }
  },
  mounted () {
    this.loadProjectEntities()
  }
}
</script>

<style lang="scss" scoped>
  .edit-user-details {
    margin: 0;
    height: 600px;
    .left-panel {
      padding: 20px;
      border-right: 1px solid #f3f3f3;
      .sections {
        padding-top: 30px;
        padding-left: 0;
        margin-bottom: 0;
        li.item {
          list-style: none;
          font-size: 18px;
          cursor: pointer;
          height: 40px;
          display: flex;
          align-items: center;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          margin-bottom: 20px;
          color: black;
          &.active {
            font-weight: 700;
          }
        }
      }
    }
    .right-panel {
      section > h3 {
        font-weight: 600;
      }
      padding: 20px;
      height: 100%;
      .assets {
        margin: 0 auto;
        margin-bottom: 20px;
        .assets-container {
          margin-top: 30px;
          height: 400px;
          overflow: auto;
          border: 1px solid #efefef;
          padding: 20px 0 0;
        }
      }
      .apps {
        h3 {
          margin-bottom: 30px;
        }
      }
      .footer {
        position: absolute;
        text-align: right;
        bottom: 1.75rem;
        right: 1.75rem;
      }
    }
  }
</style>

<style lang="scss">
  #edit-user-modal {
    .modal-content {
      min-height: 600px;
    }
    .modal-body {
      padding: 0;
    }
  }
</style>
