<template>
  <div class="data-cruncher">
    <b-row class="">
      <b-colxx xxs="3" class="left-panel">
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
          <tree-view :treeData="treeData" v-if="treeData"></tree-view>
        </div>
        <div v-if="leftPanelSection === 'functions'">Functions</div>
        <div v-if="leftPanelSection === 'widgets'">Widgets</div>
      </b-colxx>
      <b-colxx xxs="9" class="right-panel">
        <div class="data-canvas" @dragover.prevent @drop="dragElement($event)">
          <div id="canvas-diagram"></div>
        </div>
        <div class="data-excel">
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
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable */

import $ from "jquery"
import "jointjs/dist/joint.core.css"
import * as joint from "jointjs"
import _ from "lodash"
import { mapGetters, mapActions } from 'vuex'
import treeView from "../shared/outlineTreeView"
import organizationService from "@/services/organization.service"

export default {
  components: {
    treeView
  },
  data() {
    return {
      orgData: null,
      treeData: null,
      leftPanelSection: "data",
      treeSection: "sensor_parameters",
      selectedRow: null,
      selectedColumn: null,
      stencilGraph: null,
      stencilPaper: null,
      diagramGraph: null,
      diagramPaper: null,
      organisation: {},
      entityWidth: 90,
      entityHeight: 35,
      xPos: 20,
      yPos: 20,
      xOffset: 35,
      yOffset: 55,
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
      ]
    }
  },
  methods: {
    loadOrganization() {
      let config = {userId: this.currentUser.id}
      organizationService
        .read(config)
        .then(response => {
          this.orgData = response;
          this.makeTreeData();
        })
    },
    jointjsDemo() {
      this.diagramGraph = new joint.dia.Graph()
      this.diagramPaper = new joint.dia.Paper({
        el: $("#canvas-diagram"),
        model: this.diagramGraph,
        width: 1200,
        height: 1200,
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
    },
    dragElement(event) {
      let elementText = event.dataTransfer.getData("text");
      let flyShape = new joint.shapes.standard.Rectangle({
        position: {
          x: event.offsetX,
          y: event.offsetY
        },
        size: {
          width: 105,
          height: 35
        },
        attrs: {
          text: {
            text: elementText,
            fontSize: "12",
            magnet: true
          },
          body: {
            fill: '#b0e0e6',
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
    makeTreeData() {
      let entity = this.orgData;
      this.sensorParameterData = [this.formatSensorParameterData(entity)];
      this.treeData = this.sensorParameterData;
      this.assetPropertyData = [this.formatAssetPropertyData(entity)];
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted() {
    this.jointjsDemo()
    this.loadOrganization()
  }
}
</script>

<style lang="scss" scoped>
.data-cruncher {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .row {
    margin: 0;
    height: 100%;
    .left-panel {
      background-color: white;
      border-right: 1px solid gray;
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
    .right-panel {
      padding: 0;
      height: 100%;
      .data-canvas {
        height: 55%;
        border-bottom: 1px solid gray;
        overflow: hidden;
      }
      .data-excel {
        margin-top: 30px;
        height: 45%;
        overflow: auto;
        padding: 2px;
        background-color: white;
        table {
          width: 100%;
          position: relative;
          overflow: auto;
          thead {
            position: fixed;
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
}
</style>
