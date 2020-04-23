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
    <section v-if="currentStep === 1">
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
        <tree-view ref="treeView" :treeData="treeData" v-if="treeData"></tree-view>
      </div>
    </section>
    <section v-if="currentStep === 3" class="apps">
      <h5>Select Apps</h5>
      <div class="apps-container">
        <div v-if="screen === 0" class="screen">
          <div v-for="(appsList, index) in displayedApps[0]" :key="index" class="apps-div">
            <div v-for="app in appsList" :key="app.key" class="app">
              <b-form-checkbox></b-form-checkbox>
              <div class="app-div">
                <svg class="icon">
                  <use :xlink:href="'/assets/img/mads-app-icons.svg#' + app.iconId"></use>
                </svg>
                <div class="break"></div>
                <span>
                  {{app.displayName}}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="screen === 1" class="screen">
          <div v-for="(appsList, index) in displayedApps[1]" :key="index" class="apps-div">
            <div v-for="app in appsList" :key="app.key" class="app">
              <b-form-checkbox></b-form-checkbox>
              <div class="app-div">
                <svg class="icon">
                  <use :xlink:href="'/assets/img/mads-app-icons.svg#' + app.iconId"></use>
                </svg>
                <div class="break"></div>
                <span>
                  {{app.displayName}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="screen-nav">
        <div @click="screen = 0">
          <div class="nav" :class="{'active': screen === 0}"></div>
        </div>
        <div @click="screen = 1">
          <div class="nav" :class="{'active': screen === 1}"></div>
        </div>
      </div>
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
import treeView from './../../dataCruncher/treeView'

export default {
  components: {
    treeView
  },
  data () {
    return {
      currentStep: 1,
      selectedRole: '',
      selectedTeam: [],
      options: ['Apple', 'Orange', 'Banana', 'Lime', 'Peach', 'Chocolate', 'Strawberry'],
      value: [],
      treeData: null,
      screen: 0,
      displayedApps: []
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
          expanded: true,
          children: this.$_.map(entity.entities, function (entity) {
            return that.formatSensorParameterData(entity)
          })
        }
      } else {
        return {
          id: entity.id,
          type: entity.type,
          title: entity.name
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
      console.log('invited')
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
    },
    getAllApps: function () {
      return [
        [
          [
            {
              key: 'appStore',
              displayName: 'App Store',
              iconId: 'mads-app-store'
            },
            {
              key: 'settings',
              displayName: 'Settings',
              iconId: 'mads-settings'
            },
            {
              key: 'support',
              displayName: 'Support',
              iconId: 'mads-support'
            },
            {
              key: 'heyMADS!',
              displayName: 'HeyMADS!',
              iconId: 'mads-voice-assistant'
            }
          ],
          [
            {
              key: 'dashboards',
              displayName: 'Dashboards',
              iconId: 'mads-dashboard'
            },
            {
              key: 'digitalTwin',
              displayName: 'Digital Twin',
              iconId: 'mads-digital-twin'
            },
            {
              key: 'taskOrganiser',
              displayName: 'Task Organiser',
              iconId: 'mads-task-organiser'
            },
            {
              key: 'reportWizard',
              displayName: 'Report Wizard',
              iconId: 'mads-report-wizard'
            },
            {
              key: 'alertsReminder',
              displayName: 'Alerts Reminder',
              iconId: 'mads-alerts-reminders'
            },
            {
              key: 'madsbook',
              displayName: 'Madsbook',
              iconId: 'mads-book'
            },
            {
              key: 'vrSimulator',
              displayName: 'VR Simulator',
              iconId: 'mads-vr-simulator'
            }
          ],
          [
            {
              key: 'fileManager',
              displayName: 'File Manager',
              iconId: 'mads-file-manager'
            },
            {
              key: 'iotManager',
              displayName: 'IOT Manager',
              iconId: 'mads-iot-manager'
            },
            {
              key: 'roleManager',
              displayName: 'Role Manager',
              iconId: 'mads-role-manager'
            },
            {
              key: 'entityManager',
              displayName: 'Entity Manager',
              iconId: 'mads-entity-manager'
            },
            {
              key: 'toolManager',
              displayName: 'Tool Manager',
              iconId: 'mads-tool-manager'
            },
            {
              key: 'widgetManager',
              displayName: 'Widget Manager',
              iconId: 'mads-widget-manager'
            }
          ]
        ],
        [
          [
            {
              key: 'dataCruncher',
              displayName: 'Data Cruncher',
              iconId: 'mads-data-cruncher'
            },
            {
              key: 'trendPredictor',
              displayName: 'Trend Predictor',
              iconId: 'mads-trend-predictor'
            },
            {
              key: 'usageAnalyser',
              displayName: 'Usage Analyser',
              iconId: 'mads-usage-analyser'
            }
          ],
          [
            {
              key: 'madsSecure',
              displayName: 'Role Manager',
              iconId: 'mads-secure'
            },
            {
              key: 'loginTracker',
              displayName: 'Login Tracker',
              iconId: 'mads-login-tracker'
            },
            {
              key: 'networkAnalyser',
              displayName: 'Network Analyser',
              iconId: 'mads-network-analyser'
            },
            {
              key: 'secureShare',
              displayName: 'Secure Share',
              iconId: 'mads-secure-share'
            },
            {
              key: 'appLocker',
              displayName: 'App Locker',
              iconId: 'mads-app-locker'
            },
            {
              key: 'passwordManager',
              displayName: 'Password Manager',
              iconId: 'mads-password-manager'
            }
          ],
          [
            {
              key: 'calendar',
              displayName: 'Calendar',
              iconId: 'mads-calendar'
            },
            {
              key: 'calculator',
              displayName: 'Calculator',
              iconId: 'mads-calculator'
            },
            {
              key: 'chatApp',
              displayName: 'Chat App',
              iconId: 'mads-chat-app'
            }
          ]
        ]
      ]
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
    this.displayedApps = this.getAllApps()
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
  .apps {
    .apps-container {
      margin-top: 3%;
      vertical-align: middle;
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #efefef;
      padding: 0 0 10px 10px;
      .screen{
        width: 100%;
        .apps-div {
          display: flex;
        }
        .app {
          width: 13%;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-top: 2%;
          cursor: pointer;
          border: 1px solid #f3f3f3;
          background-color: #f8f8f8;
          margin-right: 4px;
          border-radius: 4px;
          .icon {
            width: 25px;
            height: 25px;
          }
          span {
            padding-top: 9px;
            display: block;
          }
          .app-div {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      }
    }
    .screen-nav {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      bottom: 30px;
      div {
        cursor: pointer;
      }
      .nav {
        width: 12px;
        height: 12px;
        background:black;
        margin: 10px;
        border-radius: 50%;
        opacity: 0.5;
        cursor: pointer;
        &.active {
          opacity: 1;
        }
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
