<template>
  <div class="theme-container">
    <div class="sidebar">
      <div class="sidebar-background"></div>
      <div class="sidebar-menu">
        <ul>
          <li :class="{'active': selectedTab === 'dashboard'}" @click="selectedTab = 'dashboard'">
            Dashboard
          </li>
          <li :class="{'active': selectedTab === 'data_history'}" @click="selectedTab = 'data_history'">
            Process Data History
          </li>
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
        <dashboard v-if="selectedTab === 'dashboard'"></dashboard>
        <data-history v-if="selectedTab === 'data_history'"></data-history>
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from './dashboard'
import DataHistory from './processDataHistory'
import dashboardHeader from './../dashboardHeader'

export default {
  components: {
    Dashboard,
    DataHistory,
    dashboardHeader
  },
  data () {
    return {
      selectedTab: 'dashboard'
    }
  },
  methods: {
    goBack () {
      this.$emit('show-all')
    }
  }
}
</script>

<style lang="scss" scoped>
  .theme-container {
    display: flex;
    height: 100%;
    .sidebar {
      width: 150px;
      position: relative;
      height: 100%;
      .sidebar-background {
        background-image: url("https://heveaconnect.herokuapp.com/images/sidebar-backgroundd.jpg");
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
        padding-top: 40px;
        ul {
          list-style: none;
          padding: 0 1px 0 2px;
          margin-top: 20px;
          li {
            height: 40px;
            margin: 20px -1px;
            display: flex;
            align-items: center;
            padding-left: 15px;
            color: white;
            font-size: 16px;
            cursor: pointer;
            &.active {
              background-color: white;
              color: #000000;
              border-top-left-radius: 21px;
              border-bottom-left-radius: 21px;
            }
          }
        }
        .action-btn-group {
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 10px;
          justify-content: space-around;
          width: 100%;
          flex-direction: column;
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
            width: 75%;
            margin: 10px 0;
            .icon {
              width: 23px;
              height: 23px;
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
      width: calc(100% - 150px);
      overflow: auto;
      .content {
        width: 100%;
        height: calc(100% - 60px);
        padding: 20px;
        margin-top: 50px;
        overflow: auto;
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
