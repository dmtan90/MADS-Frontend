<template>
  <b-modal id="invite-user-modal" ref="inviteUserModal" size="lg" hide-header hide-footer>
    <div class="modal-heading">
      <h3>Invite Member</h3>
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
          <b-form-input id="email" type="email" required></b-form-input>
        </b-form-group>
        <b-form-group label="Select Role" label-for="role">
          <b-dropdown id="dropdown-left" text="Select Role" v-model="selectedRole">
            <b-dropdown-item>Admin</b-dropdown-item>
            <b-dropdown-item>Managers</b-dropdown-item>
            <b-dropdown-item>Members</b-dropdown-item>
          </b-dropdown>
        </b-form-group>
        <b-form-group label="Select Teams">
          <b-form-tags v-model="value" no-outer-focus class="mb-2 team-section">
            <template v-slot="{ tags, disabled, addTag, removeTag }">
              <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                <li v-for="tag in tags" :key="tag" class="list-inline-item">
                  <b-form-tag
                    @remove="removeTag(tag)"
                    :title="tag"
                    :disabled="disabled"
                    variant="info"
                  >{{ tag }}</b-form-tag>
                </li>
              </ul>

              <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                <template v-slot:button-content>Choose teams</template>
                <b-dropdown-item-button
                  v-for="option in availableOptions"
                  :key="option"
                  @click="onOptionClick({ option, addTag })"
                >
                  {{ option }}
                </b-dropdown-item-button>
                <b-dropdown-text v-if="availableOptions.length === 0">
                  There are no teams available to select
                </b-dropdown-text>
              </b-dropdown>
            </template>
          </b-form-tags>
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
      <b-button  @click="$bvModal.hide('invite-user-modal')">Cancel</b-button>
      <b-button v-if="currentStep < 3" @click="next()">Next</b-button>
      <b-button v-if="currentStep === 3" @click="inviteUser()">Save</b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import organizationService from '@/services/organization.service'
import treeView from '../../shared/outlineTreeView'
import appsList from '../../shared/modalAppsList'

export default {
  components: {
    treeView,
    appsList
  },
  data () {
    return {
      currentStep: 1,
      selectedRole: '',
      selectedTeam: [],
      options: ['Apple', 'Orange', 'Banana', 'Lime', 'Peach', 'Chocolate', 'Strawberry'],
      value: [],
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
    inviteUser () {
      this.$refs.inviteUserModal.hide()
      this.currentStep = 1
    },
    onOptionClick ({ option, addTag }) {
      addTag(option)
      this.search = ''
    },
    next () {
      if (this.currentStep === 2) {
        this.$refs.treeView.getNodes('checked')
        this.$refs.treeView.getNodes('halfcheck')
      }
      this.currentStep = this.currentStep + 1
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    availableOptions () {
      return this.options.filter(opt => this.value.indexOf(opt) === -1)
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
      overflow: scroll;
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
</style>
