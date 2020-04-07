<template>
  <div class="fixed-background" id="fullScreen" :style="{background: getBackgroundUrl()}">
    <div class="taskbar" :class="{'auto-hide': isAutohideTaskbar, 'bottom-taskbar': taskbarPosition === 'bottom', 'left-taskbar': taskbarPosition === 'left', 'right-taskbar': taskbarPosition === 'right'}">
      <div class="taskbar-container">
        <div class="home-icon" @click="toggleSlider()">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#app-launcher"></use>
          </svg>
        </div>
        <div class="taskbar-center">
          <div class="taskbar-icons app-icon" v-tooltip="'App Store'">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-app-icons.svg#mads-app-store"></use>
            </svg>
          </div>
          <div class="taskbar-icons app-icon" v-tooltip="'Settings'">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-app-icons.svg#mads-settings"></use>
            </svg>
          </div>
          <div class="taskbar-icons app-icon" v-tooltip="'Support'">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-app-icons.svg#mads-support"></use>
            </svg>
          </div>
          <div class="taskbar-icons app-icon" v-tooltip="'Voice Assistant'">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-app-icons.svg#mads-voice-assistant"></use>
            </svg>
          </div>
          <div class="taskbar-icons app-icon" v-tooltip="'Dashboard'">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-app-icons.svg#mads-dashboard"></use>
            </svg>
          </div>
          <div class="taskbar-icons app-icon" :class="{'opened': openedApps['widget-manager']}" @click="openAppWindow('widget-manager')" v-tooltip="'Widget Manager'">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-app-icons.svg#mads-widget-manager"></use>
            </svg>
            <div class="active"></div>
          </div>
          <div class="taskbar-icons app-icon" :class="{'opened': openedApps['data-cruncher']}" @click="openAppWindow('data-cruncher')" v-tooltip="'Data Cruncher'">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-app-icons.svg#mads-data-cruncher"></use>
            </svg>
            <div class="active"></div>
          </div>
        </div>
        <div class="taskbar-right">
          <div class="txt-white">SG</div>
          <div class="fullscreen">
            <svg class="icon collapse-icon" v-if="isFullScreen" @click="exitFullScreen()">
              <use xlink:href="/assets/img/mads-app-window-icons.svg#collapse"></use>
            </svg>
            <svg class="icon expand-icon" v-if="!isFullScreen" @click="goFullScreen()">
              <use xlink:href="/assets/img/mads-app-window-icons.svg#expand"></use>
            </svg>
          </div>
          <div class="txt-white">10:30</div>
        </div>
      </div>
    </div>
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
            <div class="recent">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-app-icons.svg#mads-settings"></use>
              </svg>
              <span>Settings</span>
            </div>
            <div class="recent">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-app-icons.svg#mads-support"></use>
              </svg>
              <span>Support</span>
            </div>
            <div class="recent">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-app-icons.svg#mads-voice-assistant"></use>
              </svg>
              <span>Voice Assistant</span>
            </div>
            <div class="recent">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-app-icons.svg#mads-dashboard"></use>
              </svg>
              <span>Dashboard</span>
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
    <div>
      <div class="app-container"
        :class="{'maximized': openedApps['widget-manager'] && openedApps['widget-manager']['state'] === 'maximize'}"
        :style="{'z-index': openedApps['widget-manager'] && openedApps['widget-manager'].zIndex}"
        >
        <widget-manager v-if="openedApps['widget-manager']"></widget-manager>
      </div>
      <div class="app-container"
        :class="{'maximized': openedApps['data-cruncher'] && openedApps['data-cruncher']['state'] === 'maximize'}"
        :style="{'z-index': openedApps['data-cruncher'] && openedApps['data-cruncher'].zIndex}"
      >
        <data-cruncher v-if="openedApps['data-cruncher']"></data-cruncher>
      </div>
      <div class="mads-desktop" @contextmenu="$easycm($event,$root)">
        <easy-cm :list="getContextMenuOptions()" @ecmcb="desktopContextMenuEvent" :underline="false" :arrow="true"></easy-cm>
      </div>
      <b-modal id="set-wallpaper-modal" ref="setWallpaperModal" size="lg" hide-footer>
        <b-row>
          <b-colxx xxs="3" class="left-panel">
            <ul class="categories">
              <li v-for="category in wallpaperCategories" :key="category.key" class="item" :class="{'active': category.key === selectedWallpaperCateogry.key}" @click="selectedWallpaperCateogry = category">
                {{category.name}}
              </li>
            </ul>
          </b-colxx>
          <b-colxx xxs="9" class="right-panel">
            <div class="current-wallpaper">
              <div class="wallpaper-img"><img :src="'/assets/img/' + selectedWallpaper" alt=""></div>
              <div class="text-info">
                <div class="currently">Currently set</div>
                <div class="category">{{selectedWallpaperCateogry.name}}</div>
              </div>
            </div>
            <b-row class="wallpaper-options">
              <b-colxx xxs="4" v-for="(wallpaper, index) in wallpapers[selectedWallpaperCateogry.key]" :key="index"
                class="wallpaper-img"
              >
                <img :src="'/assets/img/' + wallpaper" alt="" @click="changeWallpaper(wallpaper)">
                </b-colxx>
            </b-row>
          </b-colxx>
        </b-row>
      </b-modal>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import widgetManager from './../widgetManager'
import dataCruncher from './../dataCruncher'

export default {
  components: {
    widgetManager,
    dataCruncher
  },
  data() {
    return {
      displayedApps: {},
      allApps: {},
      searchApp: '',
      screen: 0,
      showSlider: false,
      isAutohideTaskbar: false,
      wallpaperCategories: [
        {key: 'landscapes', name: 'Landscapes'}, {key: 'seascapes', name: 'Seascapes'}, {key: 'art', name: 'Art'},
        {key: 'cityscapes', name: 'Cityscapes'}, {key: 'life', name: 'Life'}, {key: 'textures', name: 'Textures'},
        {key: 'earth', name: 'Earth'}, {key: 'geometric_shapes', name: 'Geometric Shapes'}, {key: 'solid_colors', name: 'Solid Colors'}],
      wallpapers: {},
      selectedWallpaperCateogry: {key: 'landscapes', name: 'Landscapes'},
      selectedWallpaper: 'landspaces_4.jpeg',
      isFullScreen: false,
      taskbarPosition: 'bottom'
    }
  },
  methods: {
    ...mapActions(['openApp', 'maximizeApp']),
    toggleSlider: function() {
      this.screen = 0;
      this.searchApp = '';
      this.showSlider = !this.showSlider;
    },
    getAllApps: function() {
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
    openAppWindow(app) {
      this.showSlider = false;
      if(this.openedApps[app]) {
        this.maximizeApp(app);
      } else {
        this.openApp(app);
      }
    },
    setWallpaper() {
      this.$refs.setWallpaperModal.show();
    },
    changeWallpaper(wallpaper) {
      this.selectedWallpaper = wallpaper;
    },
    getBackgroundUrl() {
      return "url('/assets/img/" + this.selectedWallpaper + "')";
    },
    getContextMenuOptions() {
      let autohideTaskbarName = this.isAutohideTaskbar ? 'Show Taskbar' : 'Autohide Taskbar';
      return [
        {text: autohideTaskbarName},
        {text: 'Taskbar Position'},
        {text: 'Set Wallpaper'}
      ]
    },
    getAllWallpapers () {
      return {
        landscapes: ["landspaces_1.jpeg", "landspaces_2.jpeg", "landspaces_3.jpeg", "landspaces_4.jpeg", "landspaces_5.jpeg", "landspaces_6.jpeg", "landspaces_7.jpeg"],
        seascapes: ["seascapes_1.jpeg", "seascapes_2.jpeg", "seascapes_3.jpeg", "seascapes_4.jpeg", "seascapes_5.jpeg", "seascapes_6.jpeg", "seascapes_7.jpeg"],
        art: ["art_1.jpeg", "art_2.jpeg", "art_3.jpeg", "art_4.jpeg", "art_5.jpeg", "art_6.jpeg", "art_7.jpeg"],
        cityscapes: ["cityscapes_1.jpeg", "cityscapes_2.jpeg", "cityscapes_3.jpeg", "cityscapes_4.jpeg", "cityscapes_5.jpeg", "cityscapes_6.jpeg", "cityscapes_7.jpeg"],
        life: ["life_1.jpeg", "life_2.jpeg", "life_3.jpeg", "life_4.jpeg", "life_5.jpeg", "life_6.jpeg", "life_7.jpeg"],
        textures: ["textures_1.jpeg", "textures_2.jpeg", "textures_3.jpeg", "textures_4.jpeg", "textures_5.jpeg", "textures_6.jpeg", "textures_7.jpeg"],
        earth: ["earth_1.jpeg", "earth_2.jpeg", "earth_3.jpeg", "earth_4.jpeg", "earth_5.jpeg", "earth_6.jpeg", "earth_7.jpeg"],
        geometric_shapes: ["geometric_shapes_1.jpeg", "geometric_shapes_2.jpeg", "geometric_shapes_3.jpeg", "geometric_shapes_4.jpeg", "geometric_shapes_5.jpeg", "geometric_shapes_6.jpeg", "geometric_shapes_7.jpeg"],
        solid_colors: ["solid_colors_1.jpeg", "solid_colors_2.jpeg", "solid_colors_3.jpeg", "solid_colors_4.jpeg", "solid_colors_5.jpeg", "solid_colors_6.jpeg", "solid_colors_7.jpeg"]
      }
    },
    exitFullScreen() {
      this.isFullScreen = false;
      // exit full-screen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    goFullScreen() {
      this.isFullScreen = true;
      let i = document.getElementById("body");

      // go full-screen
      if (i.requestFullscreen) {
        i.requestFullscreen();
      } else if (i.webkitRequestFullscreen) {
        i.webkitRequestFullscreen();
      } else if (i.mozRequestFullScreen) {
        i.mozRequestFullScreen();
      } else if (i.msRequestFullscreen) {
        i.msRequestFullscreen();
      }
    },
    setTaskbarPosition(event) {
      switch(event) {
        case 0:
          this.taskbarPosition = 'bottom';
          break;
        case 1:
          this.taskbarPosition = 'left';
          break;
        case 2:
          this.taskbarPosition = 'right';
          break;
      }
    },
    desktopContextMenuEvent(event){
      switch(event[0]) {
        case 0:
          this.isAutohideTaskbar = !this.isAutohideTaskbar;
          break;
        case 1:
          this.setTaskbarPosition(event[1]);
          break;
        case 2:
          this.setWallpaper();
          break;
      }
    }
  },
  watch: {
    searchApp() {
      if(!this.searchApp) {
        this.displayedApps = this.allApps;
      }
      else {
        this.screen = 0;
        this.displayedApps = 
          _.chain(this.allApps)
          .flattenDeep()
          .filter((app) => {
            return _.includes(_.toLower(app.displayName), _.toLower(this.searchApp));
          })
          .value();

        this.displayedApps = [[this.displayedApps]];
      }
    }
  },
  mounted() {
    this.displayedApps = this.getAllApps();
    this.allApps = this.getAllApps();
    this.wallpapers = this.getAllWallpapers();
  },
  computed: {
    ...mapGetters(['openedApps'])
  }
}
</script>

<style lang="scss" scoped>
  .taskbar {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 60px;
    transition: all 0.3s ease-out;
    .taskbar-container {
      display: flex;
      background-color: rgba(0, 0, 0, 0.6);
      border: none;
      border-radius: 0px;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      align-items: center;
      .home-icon {
        border-width: 0px;
        position: relative;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        fill: white;
        cursor: pointer;
        transform: rotate(180deg);
        .icon {
          width: 24px;
          height: 24px;
        }
      }
      .taskbar-center {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
      }
    }
    &.auto-hide {
      height: 0;
    }
  }

  .taskbar-icons {
    border-width: 0px;
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .icon {
      width: 24px;
      height: 24px;
    }
    &.home-icon {
      fill: white;
    }
    &.opened {
      .active {
        width: 6px;
        height: 6px;
        position: absolute;
        background-color: white;
        bottom: 6px;
        border-radius: 3px;
      }
    }
  }

  .taskbar-right {
    margin-right: 15px;
    display: flex;
    border-width: 0px;
    height: 35px;
    background-color: rgba(255, 255, 255, 0.498039215686275);
    border: none;
    border-radius: 70px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    .txt-white {
      font-family: 'Lato-Bold', 'Lato Bold', 'Lato', sans-serif;
      color: white;
      font-weight: 700;
      font-size: 14px;
      padding: 0 5px;
    }
    .fullscreen {
      display: flex;
      .icon {
        margin: 0 10px;
        width: 15px;
        height: 15px;
        fill: white;
        cursor: pointer;
      }
    }
  }

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
            border-radius: 32px;
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

  .app-container {
    height: 0;
    width: 100%;
    position: absolute;
    transition: all .5s ease-out;
    bottom: 60px;
    &.maximized {
      height: calc(100% - 60px);
      width: 100%;
      left: 0;
    }
  }

  .mads-desktop {
    position: absolute;
    height: calc(100% - 60px);
    background-color: transparent;
    width: 100%;
    z-index: 1000;
  }
</style>
