<template>
  <div class="app-window">
    <div class="header">
      <slot name="header"></slot>
      <div class="right-section">
        <div>Min</div>
        <div>Max</div>
        <div>Close</div>
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

export default {
}
</script>

<style lang="scss" scoped>
  .app-window {
    position: absolute;
    background-color: white;
    height: calc(100% - 60px);
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
      position: fixed;
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
    .content {
      display: inline-block;
      height: calc(100% - 40px);
      width: calc(100% - 100px);
      margin-left: 100px;
      margin-top: 40px;
    }
  }
</style>
