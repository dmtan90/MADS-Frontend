<template>
  <div>
    <div class="apps-container">
      <div v-if="screen === 0" class="screen">
        <div v-for="(appsList, index) in displayedApps[0]" :key="index" class="apps-div">
          <div v-for="app in appsList" :key="app.key" class="app" @click="selectApp(app.key)">
            <b-form-checkbox v-model="selectedApps[app.key]"></b-form-checkbox>
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
export default {
  data () {
    return {
      screen: 0,
      selectAll: false,
      displayedApps: [],
      selectedApps: {}
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
    selectApp (key) {
      this.selectedApps = this.$_.assign({}, this.selectedApps, {
        [key]: !this.selectedApps[key]
      })
    },
    onSelectAll () {
    }
  },
  mounted () {
    this.displayedApps = this.getAllApps()
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
