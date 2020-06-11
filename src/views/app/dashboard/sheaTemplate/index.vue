<template>
  <div class="theme-container">
    <div class="sidebar">
      <button class="btn back-btn" @click="goBack()">All Themes</button>
      <ul>
        <li :class="{'active': selectedTab === 'energy'}" @click="selectedTab = 'energy'">
          Energy
        </li>
        <li :class="{'active': selectedTab === 'storage'}" @click="selectedTab = 'storage'">
          Storage
        </li>
        <li :class="{'active': selectedTab === 'water'}" @click="selectedTab = 'water'">
          Water
        </li>
        <li :class="{'active': selectedTab === 'occupancy'}" @click="selectedTab = 'occupancy'">
          Occupancy
        </li>
      </ul>
    </div>
    <div class="content">
      <energy v-if="selectedTab === 'energy'"></energy>
      <storage v-if="selectedTab === 'storage'"></storage>
      <water v-if="selectedTab === 'water'"></water>
      <occupancy v-if="selectedTab === 'occupancy'"></occupancy>
    </div>
  </div>
</template>

<script>
import Energy from './energy'
import Storage from './storage'
import Water from './water'
import Occupancy from './occupancy'

export default {
  components: {
    Energy,
    Storage,
    Water,
    Occupancy
  },
  data () {
    return {
      selectedTab: 'energy'
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
