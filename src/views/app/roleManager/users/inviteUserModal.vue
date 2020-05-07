<template>
  <b-modal id="invite-user-modal" ref="inviteUserModal" size="lg" hide-header hide-footer>
    <div class="modal-heading">
      <h3>{{reinvite ? 'Re-Invite' : 'Invite'}} User</h3>
      <div class="steps-header">
        <div class="current-step">{{currentStep}}/3</div>
        <div class="steps">
          <div class="step" :class="{'completed': currentStep >= 1}"></div>
          <div class="step" :class="{'completed': currentStep >= 2}"></div>
          <div class="step" :class="{'completed': currentStep >= 3}"></div>
        </div>
      </div>
    </div>
    <section v-if="currentStep === 1" class="details">
      <b-form>
        <b-form-group label="Email" label-for="email">
          <b-form-input v-model="inviteEmail" id="email" type="email" required></b-form-input>
        </b-form-group>
        <b-form-group label="Select Role" label-for="role">
          <multiselect v-model="selectedRole" :options="roles" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Select role" label="name" track-by="id">
          </multiselect>
        </b-form-group>
        <b-form-group label="Select Teams">
          <multiselect v-model="selectedTeams" :options="teams" :multiple="true" :close-on-select="false" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Search teams" label="name" track-by="id">
            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} teams selected</span></template>
            <template slot="option" slot-scope="props">
              <div class="multiple-select-options">
                <span>{{props.option.name}}</span>
                <b-form-checkbox :checked="isTeamSelected(props.option.id)" class="option-checkbox"></b-form-checkbox>
              </div>
            </template>
          </multiselect>
        </b-form-group>
        <b-form-group label="Activity Tracking">
          <toggle-button :value="true" :labels="{checked: 'on', unchecked: 'off'}"/>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="currentStep === 2" class="assets">
      <h5>Select Assets</h5>
      <div class="assets-container">
        <tree-view ref="treeView" :treeData="treeData" :multiple="true" :halfcheck="true" v-if="treeData"></tree-view>
      </div>
    </section>
    <section v-if="currentStep === 3" class="apps">
      <h5>Select Apps</h5>
      <apps-list></apps-list>
    </section>
    <div class="footer">
      <b-button  @click="currentStep = 1; $bvModal.hide('invite-user-modal')">Cancel</b-button>
      <b-button v-if="currentStep < 3" @click="next()">Next</b-button>
      <b-button v-if="currentStep === 3" @click="inviteUser()">Save</b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import organizationService from '@/services/organization.service'
import invitationService from '@/services/invitation.service'
import treeView from '../../shared/outlineTreeView'
import appsList from '../../shared/modalAppsList'
import EventBus from '../eventBus'

export default {
  props: {
    roles: {
      type: Array,
      required: true
    },
    reinvite: {
      type: Boolean,
      default: false
    },
    invitation: {
      default: null
    }
  },
  components: {
    treeView,
    appsList
  },
  data () {
    return {
      inviteEmail: '',
      selectedTeams: [],
      teams: [
        { name: 'Datakrew', id: 1 },
        { name: 'Dailploy', id: 2 },
        { name: 'Aviabird', id: 3 },
        { name: 'Stackavenue', id: 4 },
        { name: 'Aviahire', id: 5 }
      ],
      currentStep: 1,
      selectedRole: null,
      selectedTeam: [],
      treeData: null,
      selectedAssets: [],
      selectedApps: []
    }
  },
  methods: {
    loadOrganization () {
      let config = { orgId: this.currentUser.org.id }
      organizationService
        .read(config)
        .then(response => {
          this.orgData = response
          this.makeTreeData()
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
          chkDisabled: (entity.type === 'Sensor' || entity.type === 'Organisation'),
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
    inviteUser () {
      this.$refs.inviteUserModal.hide()
      let payload = {
        invitation: {
          email: this.inviteEmail,
          assets: this.selectedAssets,
          apps: this.selectedApps,
          role_id: this.selectedRole.id
        }
      }
      invitationService.create(payload)
        .then((response) => {
          this.selectedAssets = []
          this.selectedApps = []
          this.selectedRole = null
          this.email = ''

          EventBus.$emit('reload-invites')
        })
      this.currentStep = 1
    },
    next () {
      if (this.currentStep === 2) {
        let checkedNodes = this.$refs.treeView.getNodes('checked')
        let halfcheckedNodes = this.$refs.treeView.getNodes('halfcheck')
        this.selectedAssets = this.$_.map(this.$_.concat(checkedNodes, halfcheckedNodes), (node) => {
          return { id: node.id }
        })
      }
      this.currentStep = this.currentStep + 1
    },
    isTeamSelected (teamId) {
      let selectedIds = this.$_.map(this.selectedTeams, (team) => team.id)
      return this.$_.includes(selectedIds, teamId)
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  watch: {
    invitation (invitation) {
      this.inviteEmail = invitation.email
      this.selectedRole = invitation.role
    }
  },
  mounted () {
    this.loadOrganization()
  }
}
</script>

<style lang="scss" scoped>
  .modal-heading {
    position: relative;
    margin-bottom: 30px;
    .steps-header {
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      .steps {
        display: flex;
        .step {
          width: 50px;
          height: 5px;
          border: 1px solid #1261A0;
          border-radius: 2px;
          &.completed {
            background-color: #1261A0;
          }
        }
      }
    }
  }
  .assets {
    margin: 0 auto;
    margin-bottom: 20px;
    .assets-container {
      height: 400px;
      overflow: auto;
      border: 1px solid #efefef;
      padding: 20px 0 0;
    }
  }
  .footer {
    position: absolute;
    text-align: right;
    bottom: 1.75rem;
    right: 1.75rem;
  }
</style>

<style lang="scss">
  .app {
    position: relative;
    .custom-control {
      position: absolute;
      left: 4px;
      top: 2px;
    }
  }
  .footer {
    .btn {
      min-width: 105px;
    }
  }
  #invite-user-modal {
    .modal-content {
      min-height: 600px;
    }
  }
  .team-section {
    padding-left: 0;
    padding-right: 0;
    background-color: #ffffff !important;
    color: #333 !important;
    border-color: #e4e9ef !important;
    border-radius: 4px;
    .dropdown-toggle {
      border: none;
      padding-right: 0;
      padding-bottom: 0;
      padding-top: 0;
    }
    ul.list-inline {
      padding-left: 1rem;
      .list-inline-item {
        .badge-info {
          font-size: 14px;
          background-color: #f8f8f8;
          border: 1px solid #f3f3f3;
          color: #333;
          font-weight: initial;
          .close {
            background-color: transparent !important;
            font-size: 18px;
          }
        }
      }
    }
    .b-dropdown {
      ul.dropdown-menu {
        padding: 0;
        top: 12px !important;
        li > .dropdown-item {
          cursor: pointer;
          &:hover {
            background-color: #f8f8f8 !important;
          }
        }
      }
    }
  }
  .multiple-select-options {
    display: flex;
    .option-checkbox {
      margin: 0 0 0 auto;
    }
  }
</style>
