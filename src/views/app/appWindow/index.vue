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
    .header {
      display: flex;
      height: 40px;
      color: #f8f8f8;
      background-color: rgba(76, 146, 195, 1);
      align-items: center;
      padding-left: 20px;
      padding-right: 10px;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.149019607843137);
      .icon {
        width: 27px;
        height: 27px;
      }
      span {
        padding-left: 24px;
        font-size: 15px;
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
      position: absolute;
      top: 40px;
      height: calc(100% - 40px);
      left: 100px;
    }
  }
</style>
