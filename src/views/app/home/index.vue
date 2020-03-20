<template>
  <div class="fixed-background">
    <div class="taskbar">
      <div class="taskbar-icons home-icon" @click="openSlider()">
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#C1-AppStore"></use>
        </svg>
      </div>
      <div class="taskbar-icons app-icon">
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#C1-AppStore"></use>
        </svg>
      </div>
      <div class="taskbar-icons app-icon">
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#C2-Settings"></use>
        </svg>
      </div>
      <div class="taskbar-icons app-icon">
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#C3-Support"></use>
        </svg>
      </div>
      <div class="taskbar-icons app-icon">
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#C4-Voice-Assistant"></use>
        </svg>
      </div>
      <div class="taskbar-icons app-icon">
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#P1-Dashboards"></use>
        </svg>
      </div>
      <div class="taskbar-right">
        <div class="txt-white">SG</div>
        <div class="txt-white">10:30</div>
      </div>
    </div>
    <div class="slider-div" :class="{'small-height-slider': isSmallSlider, 'large-height-slider': isLargeSlider}">
      <div v-if="isSmallSlider">
        <div class="slider-up-icon" :class="{'d-none': isLargeSlider}" @click="openLargeSlider()">
          <img src="/assets/img/u212.svg" class="inner-icon" alt="">
        </div>
      </div>
      <div v-if="isLargeSlider">
        <div class="hide-slider-content" :class="{'d-none': isSmallSlider}" @click="hideLargeSlider()"></div>
      </div>
      <div class="slider-content">
        <div class="app-search-bar">
          <b-form>
            <svg class="icon">
              <use xlink:href="/assets/img/icons-sprite.svg#C1-AppStore"></use>
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
              <use xlink:href="/assets/img/icons-sprite.svg#C2-Settings"></use>
            </svg>
            <span>Settings</span>
          </div>
          <div class="recent">
            <svg class="icon">
              <use xlink:href="/assets/img/icons-sprite.svg#C3-Support"></use>
            </svg>
            <span>Support</span>
          </div>
          <div class="recent">
            <svg class="icon">
              <use xlink:href="/assets/img/icons-sprite.svg#C4-Voice-Assistant"></use>
            </svg>
            <span>Voice Assistant</span>
          </div>
          <div class="recent">
            <svg class="icon">
              <use xlink:href="/assets/img/icons-sprite.svg#P1-Dashboards"></use>
            </svg>
            <span>Dashboard</span>
          </div>
        </div>
        <div class="break"></div>
        <div class="all-apps" v-if="isLargeSlider">
          <div v-for="(app, key) in displayedApps" :key="key" class="app">
            <svg class="icon">
              <use :xlink:href="'/assets/img/icons-sprite.svg#' + app.iconId"></use>
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
</template>

<script>
/* eslint-disable */
import _ from 'lodash'

export default {
  data() {
    return {
      displayedApps: {},
      allApps: {},
      searchApp: '',
      isSmallSlider: false,
      isLargeSlider: false
    }
  },
  methods: {
    openSlider: function() {
      this.isSmallSlider = !this.isSmallSlider;
      if(this.isLargeSlider) {
        this.isSmallSlider = false;
        this.isLargeSlider = false;
      }
    },
    openLargeSlider: function() {
      this.isSmallSlider = false;      
      this.isLargeSlider = true;
    },
    hideLargeSlider: function() {
      this.isSmallSlider = false;
      this.isLargeSlider = false;
    },
    getAllApps: function() {
      return {
        'App Store': {
          displayName: 'App Store',
          iconId: 'C1-AppStore'
        },
        'Settings': {
          displayName: 'Settings',
          iconId: 'C2-Settings'
        },
        'Support': {
          displayName: 'Support',
          iconId: 'C3-Support'
        },
        'HeyMADS!': {
          displayName: 'HeyMADS!',
          iconId: 'C4-Voice-Assistant'
        },
        'Dashboards': {
          displayName: 'Dashboards',
          iconId: 'P1-Dashboards'
        },
        'Digital Twin': {
          displayName: 'Digital Twin',
          iconId: 'P2-Digital-Twin'
        },
        'Task Organiser': {
          displayName: 'Task Organiser',
          iconId: 'P3-Task-Organiser'
        },
        'Report Wizard': {
          displayName: 'Report Wizard',
          iconId: 'P4-Report-Wizard'
        },
        'Alerts Reminder': {
          displayName: 'Alerts Reminder',
          iconId: 'P5-Alerts-Reminders'
        },
        'Madsbook': {
          displayName: 'Madsbook',
          iconId: 'P6-Madsbook'
        },
        'VR Simulator': {
          displayName: 'VR Simulator',
          iconId: 'P7-VR-Simulator'
        },
        'File Manager': {
          displayName: 'File Manager',
          iconId: 'M1-File-Manager'
        },
        'IOT Manager': {
          displayName: 'IOT Manager',
          iconId: 'M2-IoT-Manager'
        },
        'Role Manager': {
          displayName: 'Role Manager',
          iconId: 'M3-Role-Manager'
        },
        'Entity-Manager': {
          displayName: 'Entity-Manager',
          iconId: 'M4-Entity-Manager'
        },
        'Tool-Manager': {
          displayName: 'Tool-Manager',
          iconId: 'M5-Tool-Manager'
        },
        'Widget-Manager': {
          displayName: 'Widget-Manager',
          iconId: 'M6-Widget-Manager'
        }
      }
    }
  },
  watch: {
    searchApp() {
      if(!this.searchApp) {
        this.displayedApps = this.allApps;
      }
      this.displayedApps = _.filter(this.allApps, (app) => {
        return _.includes(_.toLower(app.displayName), _.toLower(this.searchApp));
      });
    }
  },
  mounted() {
    this.displayedApps = this.getAllApps();
    this.allApps = this.getAllApps();

  }
}
</script>

<style lang="scss" scoped>
	.taskbar {
    display: flex;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
		box-shadow: none;
    align-items: center;
  }

  .taskbar-icons {
    border-width: 0px;
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    .icon {
      width: 24px;
      height: 24px;
    }
  }

  .taskbar-right {
    position: absolute;
    right: 30px;
    display: flex;
    border-width: 0px;
    width: 100px;
    height: 35px;
    background-color: rgba(255, 255, 255, 0.498039215686275);
    border: none;
    border-radius: 70px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    align-items: center;
    justify-content: center;
    .txt-white {
      font-family: 'Lato-Bold', 'Lato Bold', 'Lato', sans-serif;
      color: white;
      font-weight: 700;
      font-size: 14px;
      padding: 0 5px;
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
    &.small-height-slider {
      height: 301px;
      .slider-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 90px;
      }
    }
    &.large-height-slider {
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
            border-radius: 16px;
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

  .break{
    flex-basis: 100%;
    height: 0;
  }
</style>
