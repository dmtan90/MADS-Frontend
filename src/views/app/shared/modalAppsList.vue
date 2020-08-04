<template>
  <div>
    <div class="apps-container">
      <div class="screen" :class="{'active': screen === 0}">
        <div v-if="screen === 0">
            <div v-for="category in $_.take(appCategories, 3)" :key="category">
              <div v-if="$_.size(apps[category])" class="apps-row">
                <div v-for="app in apps[category]" :key="app.key" class="app" @click="selectApp(app)">
                   <b-form-checkbox @change="selectApp(app)"></b-form-checkbox>
                  <svg class="icon">
                    <use :xlink:href="'/assets/img/mads-app-icons.svg#' + app.icon_id"></use>
                  </svg>
                  <span>
                    {{app.name}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="screen" :class="{'active': screen === 1}">
          <div v-if="screen === 1 && $_.size(apps) > 3">
            <div v-for="category in $_.takeRight(appCategories, 3)" :key="category">
              <div v-if="$_.size(apps[category])" class="apps-row">
                <div v-for="app in apps[category]" :key="app.key" class="app" @click="selectApp(app)">
                <b-form-checkbox @change="selectApp(app)"></b-form-checkbox>
                  <svg class="icon">
                    <use :xlink:href="'/assets/img/mads-app-icons.svg#' + app.icon_id"></use>
                  </svg>
                  <span>
                    {{app.name}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div class="select-all">
        <b-form-checkbox v-model="selectAll"  @change="onSelectAll()"></b-form-checkbox>
        <span>Select All</span>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      screen: 0,
      selectAll: false,
      allAppCategories: ['Core', 'Productivity', 'Management', 'Analytics', 'Security', 'General'],
      appCategories: [],
      apps: {},
      selectedApps: [],
      selected:[]
    }
  },
  methods: {
    getAllApps () {
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
    },
    selectApp (app) {
      // debugger
      this.selectedApps = this.$_.assign({}, this.selectedApps, {
        [app.id]: !this.selectedApps[app.id]
      })
      this.$emit('selectApps', this.selectedApps)
    },
    onSelectAll () {
    }
  },
  computed: {
    ...mapGetters(['orgApps'])
  },
  mounted () {
    let apps = this.$_.groupBy(this.orgApps, (app) => { return app.category })
    this.apps = this.$_.assign({}, apps)
    this.appCategories = this.$_.filter(this.allAppCategories, (category) => {
      let displayedCategories = this.$_.keys(this.apps)
      return this.$_.includes(displayedCategories, category)
    })
  }
}
</script>

<style lang="scss" scoped>
    .apps-container {
      margin-top: 3%;
      vertical-align: middle;
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #efefef;
      padding: 0 0 10px 10px;
      position: relative;
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
          margin-right: 8px;
          border-radius: 4px;
          flex-direction: column;
          .icon {
            width: 21px;
            height: 21px;
          }
          span {
            padding-top: 9px;
            display: block;
            font-size: 12px;
          }
          .app-div {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
          }
        }
        .apps-row {
          display: flex;
        }
      }
      .select-all {
        display: flex;
        position: absolute;
        top: -30px;
        right: 10px;
        align-items: center;
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
</style>



