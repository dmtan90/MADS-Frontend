<template>
  <div class="slider-div" :class="{'active': showSlider}">
    <div v-if="showSlider">
      <div class="hide-slider-content" @click="toggleSlider()"></div>
      <div class="slider-content">
        <div class="app-search-bar">
          <b-form>
            <svg class="icon">
              <use xlink:href="/assets/img/mads-app-icons.svg#mads-icon"></use>
            </svg>
            <b-form-group>
              <b-form-input type="text" placeholder="Search your apps, web" v-model="searchApp"/>
            </b-form-group>
          </b-form>
        </div>
        <div class="break"></div>
        <div class="recent-apps">
          <div class="recent" v-for="(app, index) in visualSettings.recently_visited_apps" :key="index">
            <svg class="icon">
              <use :xlink:href="'/assets/img/mads-app-icons.svg#' + allAppsMap[app].iconId"></use>
            </svg>
            <span>{{allAppsMap[app].displayName}}</span>
          </div>
        </div>
        <div class="break"></div>
        <div class="all-apps">
          <div class="screen" :class="{'active': screen === 0}">
            <div v-if="screen === 0">
              <div v-for="(appsList, index) in displayedApps[0]" :key="index">
                <div v-for="app in appsList" :key="app.key" class="app">
                  <svg class="icon">
                    <use :xlink:href="'/assets/img/mads-app-icons.svg#' + app.iconId"></use>
                  </svg>
                  <span>
                    {{app.displayName}}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="screen" :class="{'active': screen === 1}">
            <div v-if="screen === 1">
              <div v-for="(appsList, index) in displayedApps[1]" :key="index">
                <div v-for="app in appsList" :key="app.key" class="app">
                  <svg class="icon">
                    <use :xlink:href="'/assets/img/mads-app-icons.svg#' + app.iconId"></use>
                  </svg>
                  <span>
                    {{app.displayName}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="screen-nav" v-if="!this.searchApp">
        <div @click="screen = 0">
          <div class="nav" :class="{'active': screen === 0}"></div>
        </div>
        <div @click="screen = 1">
          <div class="nav" :class="{'active': screen === 1}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EventBus from './event-bus'

export default {
  data () {
    return {
      showSlider: false,
      displayedApps: {},
      allApps: {},
      allAppsMap: {},
      searchApp: '',
      screen: 0
    }
  },
  methods: {
    ...mapActions(['openApp', 'maximizeApp', 'setUserProfile', 'setUserSettings', 'setRecentVisitedApp', 'setDesktopWallpaper']),
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
    getAllAppsMap () {
      let allApps = this.$_.flattenDeep(this.allApps)
      return this.$_.reduce(allApps, (appsObj, app) => {
        let key = app.key
        return _.merge(appsObj, {
          [key]: app
        })
      }, {})
    },
    toggleSlider () {
      this.screen = 0
      this.searchApp = ''
      this.showSlider = !this.showSlider
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'openedApps', 'visualSettings', 'dataSettings', 'userSettingsId'])
  },
  watch: {
    searchApp () {
      if (!this.searchApp) {
        this.displayedApps = this.allApps
      } else {
        this.screen = 0
        this.displayedApps =
          _.chain(this.allApps)
            .flattenDeep()
            .filter((app) => {
              return _.includes(_.toLower(app.displayName), _.toLower(this.searchApp))
            })
            .value()

        this.displayedApps = [[this.displayedApps]]
      }
    }
  },
  mounted () {
    EventBus.$on('toggle-slider', () => { this.toggleSlider() })
    this.displayedApps = this.getAllApps()
    this.allApps = this.getAllApps()
    this.allAppsMap = this.getAllAppsMap()
  }
}
</script>

<style lang="scss" scoped>
  .slider-div {
    position: absolute;
    bottom: 60px;
    width: 100%;
    height: 0px;
    background-color: rgba(0, 0, 0, .7);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    transition: all .4s ease-out;
    z-index: 1005;
    height: 0;
    .slider-up-icon {
      position: absolute;
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      left: 50%;
      top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .inner-icon {
        transform: rotate(90deg);
      }
    }
    .hide-slider-content {
      position: absolute;
      width: 20px;
      height: 5px;
      background-color: rgb(255, 255, 255);
      border-radius: 10px;
      left: 50%;
      top: 15px;
      cursor: pointer;
    }
    &.active {
      height: calc(100% - 60px);
      .slider-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 45px;
      }
    }
    .slider-content {
      display: none;
      .app-search-bar {
        width: 45%;
        form {
          position: relative;
          input {
            border-radius: 32px !important;
            padding-left: 40px;
            padding-right: 40px;
            &::placeholder {
              text-align: center;
              font-size: 15px;
            }
          }
          .icon {
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            width: 24px;
            height: 24px;
          }
        }
      }
      .recent-apps {
        margin-top: 20px;
        display: flex;
        .recent {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background-color: rgba(255, 255, 255, 0.3);
          margin: 0 10px;
          padding:  5px 15px;
          border-radius: 16px;
          cursor: pointer;
          .icon {
            width: 24px;
            height: 24px;
          }
          span {
            padding-left: 10px;
            font-size: 16px;
          }
        }
      }
      .all-apps {
        margin-top: 3%;
        width: 70%;
        vertical-align: middle;
        display: flex;
        flex-wrap: wrap;
        .screen{
          width: 0;
          // transition: width .5s ease-in-out;
          &.active {
            width: 100%;
          }
          .app {
            color: white;
            width: 14%;
            height: 120px;
            display: inline-block;
            text-align: center;
            margin-top: 2%;
            cursor: pointer;
            .icon {
              width: 60px;
              height: 60px;
            }
            span {
              padding-top: 9px;
              display: block;
            }
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
      position: absolute;
      bottom: 30px;
      div {
        cursor: pointer;
      }
      .nav {
        width: 12px;
        height: 12px;
        background: white;
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
</style>
