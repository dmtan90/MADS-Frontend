<template>
  <div class="theme-container">
    <div class="sidebar">
      <div class="sidebar-background"></div>
      <div class="sidebar-menu">
        <ul>
          <!-- <li :class="{'active': selectedTab === 'dashboard'}" @click="selectedTab = 'dashboard'">
            Dashboard
          </li>
          <li :class="{'active': selectedTab === 'data_history'}" @click="selectedTab = 'data_history'">
            Process Data History
          </li> -->
        </ul>
        <div class="action-btn-group">
          <b-button class="back-btn sidebar-btn" @click="goBack()">
            <svg class="icon back">
              <use xlink:href="/assets/img/mads-common-icons.svg#back"></use>
            </svg>
            <span>Back</span>
          </b-button>
          <b-button class="new-tab-btn sidebar-btn">
            <span>New Tab</span>
            <svg class="icon plus">
              <use xlink:href="/assets/img/mads-common-icons.svg#plus"></use>
            </svg>
          </b-button>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <dashboard-header></dashboard-header>
      <div class="content">
        <widget :visualSettings="visualSettings" :series="series"></widget>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dashboardHeader from './../dashboardHeader'
import widget from './../../shared/widgets/highChart'

export default {
  components: {
    dashboardHeader,
    widget
  },
  data () {
    return {
      selectedTab: 'dashboard',
      series: [],
      visualSettings: {}
    }
  },
  methods: {
    goBack () {
      this.$emit('show-all')
    }
  },
  watch: {
    selectedDashboard (dashboard) {
      let widget = dashboard.widgets || []

      if (widget.length) {
        widget = widget[1]
        this.series = widget.series
        this.visualSettings = widget.visual_properties
      }
    }
  },
  computed: {
    ...mapGetters(['selectedDashboard'])
  }
}
</script>

<style lang="scss" scoped>
  .theme-container {
    display: flex;
    height: 100%;
    .sidebar {
      width: 260px;
      position: relative;
      height: 100%;
      .sidebar-background {
        // background-image: url("https://heveaconnect.herokuapp.com/images/sidebar-backgroundd.jpg");
        z-index: 1;
        top: 0;
        left: 0;
        background-size: cover;
        background-position: 50%;
        position: absolute;
        height: 100%;
        width: 100%;
        display: block;
      }
      .sidebar-menu {
        z-index: 4;
        background-color: rgba(0, 0, 0, 0.8);
        position: relative;
        height: 100%;
        padding: 30px 10px;
        ul {
        list-style: none;
        padding-left: 0;
          li {
            cursor: pointer;
            height: 45px;
            font-size: 15px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            padding-left: 10px;
            color: white;
            &.active {
              background-color: #4a81d4 !important;
            }
          }
        }
        .action-btn-group {
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 10px;
          left: 0;
          justify-content: space-around;
          width: 100%;
          .sidebar-btn {
            height: 40px;
            line-height: 1;
            border-radius: 20px !important;
            display: flex;
            align-items: center;
            font-size: 16px;
            margin: 0;
            padding: 0;
            justify-content: center;
            width: 46%;
            background-color: #4a81d4 !important;
            color: white !important;
            border-color: #4a81d4 !important;
            .icon {
              width: 23px;
              height: 23px;
              fill: white;
              &.back {
                margin-right: 5px;
              }
              &.plus {
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
    .content-wrap {
      width: calc(100% - 260px);
      overflow: auto;
      background-color: #f2f2f2;
      .content {
        padding: 40px 40px 60px;
        width: 500px;
      }
    }
  }
  .btn.back-btn {
    margin-bottom: 20px;
    width: 105px;
    height: 10px;
    display: flex;
    align-items: center;
  }
</style>
