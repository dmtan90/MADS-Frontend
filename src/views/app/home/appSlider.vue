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
        <!-- <div class="recent-apps">
          <div class="recent" v-for="(app, index) in visualSettings.recently_visited_apps" :key="index">
            <svg class="icon">
              <use :xlink:href="'/assets/img/mads-app-icons.svg#' + apps[app].iconId"></use>
            </svg>
            <span>{{apps[app].displayName}}</span>
          </div>
        </div> -->
        <div class="break"></div>
        <div class="all-apps">
          <div class="screen" :class="{'active': screen === 0}">
            <div v-if="screen === 0">
              <div v-for="category in $_.take(appCategories, 3)" :key="category">
                <div v-if="$_.size(apps[category])">
                  <div v-for="app in apps[category]" :key="app.key" class="app" @click="openAppWindow(appKeyMappings[app.key])">
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
                <div v-if="$_.size(apps[category])">
                  <div v-for="app in apps[category]" :key="app.key" class="app" @click="openAppWindow(appKeyMappings[app.key])">
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
        </div>
      </div>
      <div class="screen-nav">
        <div @click="screen = 0">
          <div class="nav" :class="{'active': screen === 0}"></div>
        </div>
        <div @click="screen = 1" v-if="$_.size(apps) > 3">
          <div class="nav" :class="{'active': screen === 1}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventBus from './event-bus'

export default {
  data () {
    return {
      showSlider: false,
      searchApp: '',
      screen: 0,
      allAppCategories: ['Core', 'Productivity', 'Management', 'Analytics', 'Security', 'General'],
      appCategories: [],
      apps: {},
      appKeyMappings:{
        widgetManager: "Widget_Manager",
        dashboards: "Dashboards",
        dataCruncher: "Data_Cruncher",
        roleManager: "Role_Manager",
        entityManager: "Entity_Manager",
        iotManager: "IoT_Manager",
        alerts: "Alerts_Reminder"
      }
    }
  },
  methods: {
    toggleSlider () {
      this.screen = 0
      this.searchApp = ''
      this.showSlider = !this.showSlider
    },
    getAppState (app) {
      return this.$store.state.appWindow[app].appState
    },
    openAppWindow (app) {
      let appValues =  Object.values(this.appKeyMappings);
      let filterAppValues = appValues.filter((appValue) => appValue === app);
      if(filterAppValues.length > 0){
        EventBus.$emit('open-app-window', app)
      }
    },
  },
  computed: {
    ...mapGetters(['visualSettings', 'orgApps'])
  },
  watch: {
    searchApp () {
      let apps = this.orgApps
      if (this.searchApp) {
        apps = this.$_.filter(apps, (app) => {
          return this.$_.includes(this.$_.toLower(app.name), this.$_.toLower(this.searchApp))
        })
      }
      apps = this.$_.groupBy(apps, (app) => { return app.category })
      this.apps = this.$_.assign({}, apps)
      this.appCategories = this.$_.filter(this.allAppCategories, (category) => {
        let displayedCategories = this.$_.keys(this.apps)
        return this.$_.includes(displayedCategories, category)
      })
    },
    orgApps () {
      let apps = this.$_.groupBy(this.orgApps, (app) => { return app.category })
      this.apps = this.$_.assign({}, apps)
      this.appCategories = this.$_.filter(this.allAppCategories, (category) => {
        let displayedCategories = this.$_.keys(this.apps)
        return this.$_.includes(displayedCategories, category)
      })
    }
  },
  mounted () {
    EventBus.$on('toggle-slider', () => { this.toggleSlider() })
  },
  beforeDestroy () {
    EventBus.$off()
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
