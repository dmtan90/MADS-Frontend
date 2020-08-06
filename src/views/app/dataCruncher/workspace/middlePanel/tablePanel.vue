<template>
  <div class="data-excel-wrap h-100">
    <div class="canvas-header" style="margin-bottom: 30px;">
      <ul>
        <li>Data Viewer</li>
        <li class="widget-canvas">Message Log</li>
      </ul>
      <div class="canvas-actions">
        <div class="icon-container">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#save"></use>
          </svg>
        </div>
        <div class="icon-container">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#open-menu"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="data-excel">
      <div id="x-spreadsheet-demo"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-new */

import Spreadsheet from 'x-data-spreadsheet'

export default {
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    new Spreadsheet('#x-spreadsheet-demo')
  }
}
</script>

<style lang="scss" scoped>
  .data-excel-wrap {
    background-color: white;
    .canvas-header {
      display: flex;
      height: 40px;
      ul {
        list-style: none;
        display: flex;
        padding-left: 0;
        height: 40px;
        li {
          width: 105px;
          display: flex;
          align-items: center;
          justify-content: center;
          &.widget-canvas {
            border-left: 1px solid gray;
            border-right: 1px solid gray;
            border-bottom: 1px solid gray;
          }
        }
      }
      .canvas-actions {
        border-bottom: 1px solid gray;
        width: 95%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .icon-container {
          height: 40px;
          display: flex;
          align-items: center;
          padding: 10px;
          border-right: 1px solid #e2e2e2;
        }
        .icon {
          width: 20px;
          height: 20px;
          margin: 0 5px;
          cursor: pointer;
        }
      }
    }
    .data-excel {
      height: calc(100% - 70px);
      overflow: scroll;
    }
  }
</style>
