<template>
  <div class="data-excel">
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
    <table>
      <thead>
        <tr>
          <th></th>
          <th
            :class="{ active: selectedColumn === column }"
            v-for="column in columns"
            :key="column"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="index in 11" :key="index">
          <td class="row-no" :class="{ active: selectedRow === index }">
            {{ index }}
          </td>
          <td v-for="column in columns" :key="column">
            <input
              :id="column + index"
              type="text"
              autocomplete="none"
              @focus="
                selectedRow = index
                selectedColumn = column
              "
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  data () {
    return {
      selectedRow: null,
      selectedColumn: null,
      columns: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J'
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
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
      width: 90%;
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
    background-color: white;
    table {
      width: 100%;
      position: relative;
      overflow: auto;
      thead {
        z-index: 99;
        tr {
          height: 30px;
          background-color: #f2f2f2;
          th {
            border: 1px solid #cccccc;
            padding: 0;
            text-align: center;
            font-size: 12px;
            width: 90px;
            &:first-child {
              border-left: none;
            }
            &:last-child {
              border-right: none;
            }
            &.active {
              border-bottom: 2px solid #217346;
            }
          }
        }
      }
      tbody {
        position: absolute;
        top: 30px;
        tr {
          height: 30px;
          td {
            padding: 0;
            border-right: 1px solid #f2f2f2;
            border-bottom: 1px solid #f2f2f2;
            text-align: center;
            font-size: 12px;
            width: 90px;
            &.row-no {
              background-color: #f2f2f2;
              border-bottom: 1px solid #cccccc;
              border-right: 1px solid #cccccc;
            }
            input {
              border: none;
              width: 100%;
            }

            &.active {
              border-right: 2px solid #217346;
            }
          }
        }
      }
    }
  }
</style>
