<template>
  <b-modal id="create-team-modal" ref="createTeamModal" size="lg" hide-footer>
    <div class="modal-heading">
      <h2>Add Team</h2>
      <div class="steps-header">
        <div class="current-step">{{currentStep}}/4</div>
        <div class="steps">
          <div class="step" :class="{'completed': currentStep >= 1}"></div>
          <div class="step" :class="{'completed': currentStep >= 2}"></div>
          <div class="step" :class="{'completed': currentStep >= 3}"></div>
          <div class="step" :class="{'completed': currentStep >= 4}"></div>
        </div>
      </div>
    </div>
    <div class="section-container">
      <section v-if="currentStep === 1" class="details">
        <b-form>
          <b-form-group label="Team Name" label-for="team-name">
            <b-form-input id="team-name" v-model="name" type="text" required></b-form-input>
          </b-form-group>
          <b-form-group label="Team Description" label-for="team-description">
            <b-form-textarea id="team-description" v-model="description" rows="6" max-rows="6"></b-form-textarea>
          </b-form-group>
          <b-form-group label="Activity Tracking">
            <toggle-button :value="true" :labels="{checked: 'on', unchecked: 'off'}"/>
          </b-form-group>
        </b-form>
      </section>
      <section v-if="currentStep === 2" class="users">
        <b-form-group label="Select Users">
          <multiselect v-model="selectedUsers" :options="orgUsers" :multiple="true" :close-on-select="false" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Search users" label="first_name" track-by="id">
            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} users selected</span></template>
            <template slot="option" slot-scope="props">
              <div class="multiple-select-options">
                <span>{{props.option.first_name}}</span>
                <b-form-checkbox :checked="isUserSelected(props.option.id)" class="option-checkbox"></b-form-checkbox>
              </div>
            </template>
          </multiselect>
        </b-form-group>
        <b-form-group label="Select Team Lead">
          <multiselect v-model="selectedTeamLead" :options="orgUsers" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Select role" label="first_name" track-by="id">
          </multiselect>
        </b-form-group>
      </section>
      <section v-if="currentStep === 3" class="assets">
        <h5>Select Assets</h5>
        <div class="assets-container">
          <tree-view ref="treeView" :treeData="treeData" :multiple="true" :halfcheck="true" v-if="treeData"></tree-view>
        </div>
      </section>
      <section v-if="currentStep === 4" class="apps">
        <h5>Select Apps</h5>
        <apps-list></apps-list>
      </section>
    </div>
    <div class="footer">
      <b-button  @click="$bvModal.hide('create-team-modal')">Cancel</b-button>
      <b-button v-if="currentStep < 4" @click="next()">Next</b-button>
      <b-button v-if="currentStep === 4" @click="createTeam()">Save</b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import organizationService from '@/services/organization.service'
import teamService from '@/services/team.service.js'
import treeView from '../../shared/outlineTreeView'
import appsList from '../../shared/modalAppsList'

export default {
  props: ['orgUsers'],
  components: {
    treeView,
    appsList
  },
  data () {
    return {
      currentStep: 1,
      name: '',
      description: '',
      selectedTeamLead: null,
      selectedUsers: [],
      selectedAssets: [],
      selectedApps: [],
      treeData: null
    }
  },
  methods: {
    loadOrganization () {
      let config = { userId: this.currentUser.id }
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
    createTeam () {
      let config = { orgId: this.currentUser.org.id }
      let selectedUsers = this.$_.map(this.selectedUsers, (user) => {
        return { id: user.id }
      })

      this.$refs.createTeamModal.hide()
      let payload = {
        team: {
          name: this.name,
          description: this.description,
          team_lead_id: this.selectedTeamLead ? this.selectedTeamLead.id : null,
          members: selectedUsers,
          assets: this.selectedAssets,
          apps: this.selectedApps
        }
      }
      teamService.create(config, payload)
        .create(response => {
        })
      this.currentStep = 1
    },
    next () {
      if (this.currentStep === 3) {
        let checkedNodes = this.$refs.treeView.getNodes('checked')
        let halfcheckedNodes = this.$refs.treeView.getNodes('halfcheck')
        this.selectedAssets = this.$_.map(this.$_.concat(checkedNodes, halfcheckedNodes), (node) => {
          return { id: node.id }
        })
      }
      this.currentStep = this.currentStep + 1
    },
    isUserSelected (userId) {
      let selectedIds = this.$_.map(this.selectedUsers, (user) => user.id)
      return this.$_.includes(selectedIds, userId)
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
  .modal-heading {
    position: relative;
    margin-bottom: 20px;
    height: 60px;
    .steps-header {
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 20px;
      .steps {
        display: flex;
        .step {
          width: 50px;
          height: 6px;
          border: 1px solid #1261A0;
          border-radius: 2px;
          &.completed {
            background-color: #1261A0;
          }
        }
      }
    }
  }
  .section-container {
    width: 80%;
    margin: 0 auto;
    .details {
    }
    .assets {
      margin: 0 auto;
      margin-bottom: 20px;
      .assets-container {
        height: 350px;
        overflow: auto;
        border: 1px solid #efefef;
        padding: 20px 0 0;
      }
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
  #create-team-modal {
    .modal-content {
      min-height: 600px;
      .form-group {
        margin-bottom: 1.5rem;
      }
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
</style>
