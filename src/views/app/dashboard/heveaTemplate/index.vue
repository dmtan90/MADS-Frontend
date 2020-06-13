<template>
  <div class="theme-container">
    <div class="sidebar">
      <div class="sidebar-background"></div>
      <div class="sidebar-menu">
      <button class="btn back-btn" @click="goBack()">All Themes</button>
        <ul>
          <li :class="{'active': selectedTab === 'dashboard'}" @click="selectedTab = 'dashboard'">
            Dashboard
          </li>
          <li :class="{'active': selectedTab === 'data_history'}" @click="selectedTab = 'data_history'">
            Process Data History
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <dashboard v-if="selectedTab === 'dashboard'"></dashboard>
      <data-history v-if="selectedTab === 'data_history'"></data-history>
    </div>
  </div>
</template>

<script>
import Dashboard from './dashboard'
import DataHistory from './processDataHistory'

export default {
  components: {
    Dashboard,
    DataHistory
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
      width: 260px;
      position: relative;
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
      }
    }
    .content {
      width: calc(100% - 260px);
      overflow: auto;
      padding: 30px 20px 60px;
      background: #f8f8f8;
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
