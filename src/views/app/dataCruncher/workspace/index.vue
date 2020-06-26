<template>
  <div class="workspace-container">
    <splitpanes vertical>
      <pane size="20">
        <div class="left-panel">
          <div class="header">
            <div
              class="item"
              :class="{ active: leftPanelSection === 'data' }"
              @click="leftPanelSection = 'data'"
            >
              Data
            </div>
            <div
              class="item"
              :class="{ active: leftPanelSection === 'functions' }"
              @click="leftPanelSection = 'functions'"
            >
              Functions
            </div>
            <div
              class="item"
              :class="{ active: leftPanelSection === 'widgets' }"
              @click="leftPanelSection = 'widgets'"
            >
              Widgets
            </div>
          </div>
          <div id="canvas-options" class="tree-section" v-show="leftPanelSection === 'data'">
            <div class="section-toggle">
              <div class="section" :class="{ active: treeSection === 'sensor_parameters' }" @click="toggleTreeSection('sensor_parameters')">
                Sensor Parameters
              </div>
              <div class="section" draggable="true" :class="{ active: treeSection === 'asset_properties' }" @click="toggleTreeSection('asset_properties')">
                Asset Properties
              </div>
            </div>
            <div class="vue-tree-container">
              <mads-tree
                ref="tree"
                :treeView="'file'"
                :treeOptions="treeOptions"
                @on-node-click="onNodeClick"
                @on-node-drag-start="onNodeDragStart"
              ></mads-tree>
            </div>
          </div>
          <div v-if="leftPanelSection === 'functions'">
            <functions @set-dragged-entity-text="setDraggedEntity"></functions>
          </div>
          <div v-if="leftPanelSection === 'widgets'">
            <widgets @set-dragged-entity-text="setDraggedEntity"></widgets>
          </div>
        </div>
      </pane>
      <pane size="65" class="middle-panel">
        <splitpanes horizontal>
          <pane size="60">
            <div class="canvas-header">
              <ul>
                <li>Data Canvas</li>
                <li class="widget-canvas">Widget Canvas</li>
              </ul>
              <div class="canvas-actions">
                <div class="icon-container">
                  <svg class="icon">
                    <use xlink:href="/assets/img/mads-common-icons.svg#debug"></use>
                  </svg>
                  <svg class="icon">
                    <use xlink:href="/assets/img/mads-common-icons.svg#stop-button"></use>
                  </svg>
                  <svg class="icon">
                    <use xlink:href="/assets/img/mads-common-icons.svg#play-button"></use>
                  </svg>
                </div>
                <div class="icon-container">
                  <svg class="icon" @click="zoomOut()">
                    <use xlink:href="/assets/img/mads-common-icons.svg#zoom-in"></use>
                  </svg>
                  <svg class="icon" @click="zoomIn()">
                    <use xlink:href="/assets/img/mads-common-icons.svg#zoom-out"></use>
                  </svg>
                </div>
                <div class="icon-container">
                  <svg class="icon">
                    <use xlink:href="/assets/img/mads-common-icons.svg#undo"></use>
                  </svg>
                  <svg class="icon">
                    <use xlink:href="/assets/img/mads-common-icons.svg#redo"></use>
                  </svg>
                </div>
                <div class="icon-container">
                  <svg class="icon" @click="deleteSelectedCells()">
                    <use xlink:href="/assets/img/mads-common-icons.svg#dustbin"></use>
                  </svg>
                </div>
                <div class="icon-container">
                  <svg class="icon">
                    <use xlink:href="/assets/img/mads-common-icons.svg#list"></use>
                  </svg>
                </div>
              </div>
            </div>
            <div class="data-canvas" @dragover.prevent @drop="dragElement($event)" v-on:keyup.delete="deleteSelectedCells()">
              <div id="canvas-diagram"></div>
            </div>
          </pane>
          <pane size="40">
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
                      <use xlink:href="/assets/img/mads-common-icons.svg#list"></use>
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
          </pane>
        </splitpanes>
      </pane>
      <pane size="15">
        <div class="right-panel">
          <properties></properties>
        </div>
      </pane>
    </splitpanes>
  </div>

</template>

<script>
/* eslint-disable */

import $ from "jquery"
import "jointjs/dist/joint.core.css"
import * as joint from "jointjs"
import _ from "lodash"
import { mapGetters, mapActions } from 'vuex'
import entityService from '@/services/entity.service'
import treeService from '@/services/tree.service'
import madsTree from './../../shared/madsTree/index'
import functions from './functions'
import widgets from './widgets'
import properties from './properties'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  components: {
    madsTree,
    functions,
    widgets,
    properties,
    Splitpanes,
    Pane
  },
  data() {
    return {
      treeData: null,
      treeOptions: {
      },
      leftPanelSection: "data",
      treeSection: "sensor_parameters",
      selectedRow: null,
      selectedColumn: null,
      diagramGraph: null,
      diagramPaper: null,
      paperCurrentZoom: 1,
      columns: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J"
      ],
      draggedEntityText: '',
      draggedEntityColor: '#b0e0e6',
      selectedCells: []
    }
  },
  methods: {
    initCanvas() {
      let that = this

      this.diagramGraph = new joint.dia.Graph()
      this.diagramPaper = new joint.dia.Paper({
        el: $("#canvas-diagram"),
        model: this.diagramGraph,
        width: 4800,
        height: 4800,
        gridSize: 10,
        drawGrid: {
          name: "doubleMesh",
          args: [
            { color: "#cccccc", thickness: 0.3 },
            { color: "#cccccc", thickness: 0.6, scaleFactor: 4 }
          ]
        },
        background: {
          color: "white"
        },
        linkPinning: false
      })
      this.diagramPaper.on('cell:pointerclick', function(cellView) {
        cellView.highlight();
        that.selectedCells = that.$_.concat(that.selectedCells, cellView)
      });
    },
    dragElement(event) {
      let elementText = this.draggedEntityText
      let width = this.$_.size(elementText) * 8

      let flyShape = new joint.shapes.standard.Rectangle({
        position: {
          x: event.offsetX,
          y: event.offsetY
        },
        size: {
          width: width,
          height: 35
        },
        attrs: {
          text: {
            text: elementText,
            fontSize: "12",
            magnet: true
          },
          body: {
            fill: this.draggedEntityColor,
            strokeWidth: 1,
            stroke: "#cccccc"
          }
        }
      });

      flyShape.addTo(this.diagramGraph);
    },
    toggleTreeSection(section) {
      this.treeSection = section;
      if(this.treeSection === 'sensor_parameters') {
        this.treeData = this.sensorParameterData;
      } else {
        this.treeData = this.assetPropertyData;
      }
    },
    formatSensorParameterData(entity) {
      let childrenPresent = (entity.type !== 'Parameter');
      let that = this;
      if(childrenPresent) {
        return {
          title: entity.name,
          expanded: true,
          children: _.map(entity.entities, function(entity) {
            return that.formatSensorParameterData(entity)
          })
        }
      } else {
        return {
          title: '<span draggable="true" class="draggable-element" data-name="' + entity.name + '">' + entity.name + '</span>'
        }
      }
    },
    formatAssetPropertyData(entity) {
      let isPropertiesPresent = entity.properties && _.size(entity.properties) > 0;
      let that = this;
      if(!isPropertiesPresent) {
        return {
          title: entity.name,
          expanded: true,
          children: _.map(entity.entities, function(entity) {
            return that.formatAssetPropertyData(entity)
          })
        }
      } else {
        return {
          title: entity.name,
          expanded: true,
          children: _.map(entity.properties, function(property) {
            return {
              title: '<span draggable="true" class="draggable-element" data-name="' + property + '">' + property + '</span>'
            }
          })
        }
      }
    },
    getCheckedNodes() {
      let checkedNodes = this.$refs.tree.getCheckedNodes()
    },
    onNodeClick (event, data) {
      this.nodeClicked = true
    },
    onNodeDragStart (event, data) {
      this.draggedEntityText = data.node ? data.node.name : ''
    },
    setDraggedEntity (setting) {
      this.draggedEntityText = setting.text
      this.draggedEntityColor = setting.color
    },
    zoomOut() {
      this.paperCurrentZoom = this.paperCurrentZoom + 0.2
      this.diagramPaper.scale(this.paperCurrentZoom)
    },
    zoomIn() {
      this.paperCurrentZoom = this.paperCurrentZoom - 0.2
      this.diagramPaper.scale(this.paperCurrentZoom)
    },
    deleteSelectedCells() {
      this.$_.forEach(this.selectedCells, (cell) => {
        cell.model.remove()
      })
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted() {
    this.initCanvas()

    document.addEventListener('keyup', (event) => {
      let key = event.keyCode
      event.preventDefault()
      if (key === 8 || key === 46) {
        this.deleteSelectedCells()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .workspace-container {
    width: 100%;
    height: 100%;
    overflow: auto;

    .left-panel {
      background-color: white;
      padding: 0;
      height: 100%;
      overflow: auto;
      .header {
        display: flex;
        background: #f1f1f1;
        height: 40px;
        .item {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #cccccc;
          border-bottom: 1px solid #cccccc;
          cursor: pointer;
          &.active {
            background: white;
          }
          &:last-child {
            border-right: none;
          }
        }
      }
      .tree-section {
        .section-toggle {
          display: flex;
          background: #f1f1f1;
          height: 40px;
          margin-bottom: 20px;
          .section {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            cursor: pointer;
            &.active {
              background: white;
            }
            &:last-child {
              border-right: none;
            }
          }
        }
      }
    }
    .middle-panel {
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
      .data-canvas {
        height: calc(100% - 40px);
        overflow: auto;
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
    }
  }
</style>

<style lang="scss">
  .splitpanes--vertical > .splitpanes__splitter {
    border: 2px solid #cccccc;
  }

  .splitpanes--horizontal > .splitpanes__splitter {
    border: 2px solid #cccccc;
  }
</style>
