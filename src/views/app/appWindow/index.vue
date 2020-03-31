<template>
  <div class="app-window">
    <div class="header">
      <slot name="header"></slot>
      <div class="right-section">
        <div>Min</div>
        <div>Max</div>
        <div @click="closeApp()">Close</div>
      </div>
    </div>
    <div class="break"></div>
    <div class="sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['addToOpenApps']),
    closeApp() {
      this.addToOpenApps([])
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-window {
    position: absolute;
    height: calc(100% - 60px);
    background-color: white;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    .header {
      display: flex;
      height: 40px;
      width: 100%;
      color: #f8f8f8;
      background-color: rgba(76, 146, 195, 1);
      align-items: center;
      padding-left: 20px;
      padding-right: 10px;
      position: absolute;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.149019607843137);
      z-index: 999;
      .icon {
        width: 27px;
        height: 27px;
      }
      span {
        padding-left: 24px;
        font-size: 18px;
        font-weight: 700;
      }
      .right-section {
        display: flex;
        margin-left: auto;
        div {
          padding: 0 5px;
          cursor: pointer;
        }
      }
    }
    .sidebar {
      width: 100px;
      display: inline-block;
      height: calc(100% - 40px);
      border-right: 1px solid rgba(242, 242, 242, 1);
      position: absolute;
      top: 40px;
      .item {
        width: 100px;
        height: 100px;
        border-bottom: 1px solid rgba(242, 242, 242, 1);
        text-align: center;
        padding: 6px;
        position: relative;
        .item-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          .icon {
            width: 40px;
            height: 40px;
            display: block;
            margin: 0 auto;
            fill: #808080;
          }
          span {
            display: block;
            padding-top: 5px;
            line-height: 1.2;
            font-size: 12px;
          }
        }
        .active-tab {
            position: absolute;
            width: 4px;
            height: 80px;
            top: 10px;
            left: 0;
            background-color: rgba(76, 146, 195, 1);
        }
      }
    }
    .content {
      display: inline-block;
      height: calc(100% - 40px);
      width: calc(100% - 100px);
      margin-left: 100px;
      margin-top: 40px;
    }
  }
</style>
