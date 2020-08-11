<template>
  <div class="theme-container">
    <div class="sidebar">
      <ul>
        <li :class="{'active': selectedTab === 'dashboard'}" @click="selectedTab = 'dashboard'">
          Dashboard
        </li>
        <li :class="{'active': selectedTab === 'settings'}">
          Settings
        </li>
        <li :class="{'active': selectedTab === 'contact_us'}">
          Contact Us
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
    <div class="content-wrap">
      <dashboard-header></dashboard-header>
      <div class="content">
        <dashboard></dashboard>
      </div>
    </div>
  </div>
</template>

<script>
import dashboard from './dashboard'
import dashboardHeader from './../dashboardHeader'

export default {
  components: {
    dashboard,
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
      width: 180px;
      background-color: #1E3664;
      position: relative;
      padding-top: 30px;
      height: 100%;
      ul {
        list-style: none;
        padding: 0 1px 0 2px;
        margin-top: 20px;
        li {
          height: 40px;
          margin: 20px -1px;
          display: flex;
          align-items: center;
          padding-left: 40px;
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
    .content-wrap {
      width: calc(100% - 180px);
      overflow: auto;
      position: relative;
      .content {
        width: 100%;
        height: calc(100% - 50px);
        padding: 20px;
        margin-top: 50px;
        overflow: auto;
      }
    }
  }
  .btn.back-btn {
    margin: 20px;
    width: 105px;
    height: 10px;
    display: flex;
    align-items: center;
  }
</style>
