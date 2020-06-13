<template>
  <div class="theme-container">
    <div class="sidebar">
      <button class="btn back-btn" @click="goBack()">All Themes</button>
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
    </div>
    <div class="content">
      <dashboard></dashboard>
    </div>
  </div>
</template>

<script>
import dashboard from './dashboard'

export default {
  components: {
    dashboard
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
      background-color: #1E3664;
      ul {
        list-style: none;
        padding: 0 1px 0 2px;
        margin-top: 20px;
        li {
          height: 50px;
          margin: 20px 0;
          border-radius: 23px;
          display: flex;
          align-items: center;
          padding-left: 40px;
          color: white;
          font-size: 21px;
          font-weight: bold;
          cursor: pointer;
          &.active {
            background-color: white;
            color: #1E3664;
          }
        }
      }
    }
    .content {
      width: calc(100% - 260px);
      overflow: auto;
      padding: 40px 40px 60px;
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
