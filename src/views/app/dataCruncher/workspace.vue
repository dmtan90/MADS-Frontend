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
        <div id="canvas-options" v-show="leftPanelSection === 'data'"></div>
        <div v-if="leftPanelSection === 'functions'">Functions</div>
        <div v-if="leftPanelSection === 'widgets'">Widgets</div>
      </b-colxx>
      <b-colxx xxs="9" class="right-panel">
        <div class="data-canvas">
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
  <!-- <div>
    <joint-demo></joint-demo>
  </div> -->
</template>

<script>
/* eslint-disable */

import $ from "jquery"
import "jointjs/dist/joint.core.css"
import * as joint from "jointjs"
import _ from "lodash"
import jointDemo from "./jointDemo"

export default {
  components: {
    jointDemo
  },
  data() {
    return {
      leftPanelSection: "data",
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

      // Canvas from which you take shapes
      this.stencilGraph = new joint.dia.Graph()
      this.stencilPaper = new joint.dia.Paper({
        el: $("#canvas-options"),
        width: 400,
        height: 800,
        model: this.stencilGraph,
        interactive: false
      })

      this.buildElementAndLinkChild(this.organisation, this.xPos, this.yPos)

      this.stencilPaper.on(
        "element:pointerdown",
        this.stencilPaperOnListener.bind(this)
      )
    },
    getOrganisationHierarchy() {
      return {
        name: "Organisation",
        background: "#9dd4e8",
        entities: [
          {
            name: "Site 1",
            background: "#f2b3bd",
            entities: [
              {
                name: "Section 1.1",
                background: "#f9ad81",
                entities: [
                  {
                    name: "Sensor 1.1A",
                    background: "#a4d0a9",
                    entities: []
                  }
                ]
              }
            ]
          },
          {
            name: "Site 2",
            background: "#f2b3bd",
            entities: [
              {
                name: "Sensor 2.A",
                background: "#a4d0a9",

                entities: []
              },
              {
                name: "Sensor 2.B",
                background: "#a4d0a9",
                entities: []
              }
            ]
          },
          {
            name: "Site 3",
            background: "#f2b3bd",
            entities: [
              {
                name: "Section 3.1",
                background: "#f9ad81",
                entities: [
                  {
                    name: "Sensor 3.1.A",
                    background: "#a4d0a9",
                    entities: []
                  }
                ]
              },
              {
                name: "Sensor 3.A",
                background: "#a4d0a9",
                entities: []
              }
            ]
          }
        ]
      }
    },
    buildElementAndLinkChild(element, xPos, yPos, parent = null) {
      // joint.shapes.basic.DecoratedRect = joint.shapes.basic.Generic.extend({
      //   markup:
      //     '<g class="rotatable"><g class="scalable"><rect/></g><image/><text/></g>',

      //   defaults: joint.util.deepSupplement(
      //     {
      //       type: "basic.DecoratedRect",
      //       size: { width: 100, height: 60 },
      //       attrs: {
      //         rect: {
      //           fill: element.background,
      //           strokeWidth: 1,
      //           stroke: "#cccccc",
      //           width: 100,
      //           height: 60
      //         },
      //         text: {
      //           "font-size": 14,
      //           text: "",
      //           "ref-x": 0.5,
      //           "ref-y": 0.5,
      //           ref: "rect",
      //           "y-alignment": "middle",
      //           "x-alignment": "middle",
      //           fill: "black"
      //         },
      //         image: {
      //           "ref-x": 2,
      //           "ref-y": 2,
      //           ref: "rect",
      //           width: 16,
      //           height: 16
      //         }
      //       }
      //     },
      //     joint.shapes.basic.Generic.prototype.defaults
      //   )
      // })

      let shape = new joint.shapes.standard.Rectangle({
        position: {
          x: xPos,
          y: yPos
        },
        size: {
          width: this.entityWidth,
          height: this.entityHeight
        },
        attrs: {
          text: {
            text: element.name,
            fontSize: "12",
            magnet: true
          },
          body: {
            fill: element.background,
            strokeWidth: 1,
            stroke: "#cccccc"
          }
        }
      })

      shape.addTo(this.stencilGraph)

      this.yPos = this.yPos + this.yOffset

      if (parent) {
        let link = new joint.shapes.standard.Link({
          attrs: {
            line: {
              strokeWidth: 1,
              stroke: "#cccccc",
              targetMarker: null
            }
          }
        })
        link.source(parent, {
          anchor: {
            name: "bottomLeft",
            args: {
              dx: 10
            }
          }
        })
        link.target(shape, {
          anchor: {
            name: "left",
            args: {
              dy: -10
            }
          }
        })
        link.router("manhattan")
        link.connector("normal")
        link.addTo(this.stencilGraph)
      }

      let that = this

      _.forEach(element.entities, function(entity) {
        that.buildElementAndLinkChild(
          entity,
          xPos + that.xOffset,
          that.yPos,
          shape
        )
      })
    },
    stencilPaperOnListener(cellView, e, x, y) {
      let that = this
      $("body").append(
        '<div id="flyPaper" style="position:fixed; z-index:100; opacity:.7; pointer-event:none;"></div>'
      )
      var flyGraph = new joint.dia.Graph(),
        flyPaper = new joint.dia.Paper({
          el: $("#flyPaper"),
          model: flyGraph,
          width: 90,
          height: 35,
          interactive: false
        }),
        flyShape = cellView.model.clone(),
        pos = cellView.model.position(),
        offset = {
          x: x - pos.x,
          y: y - pos.y
        }

      flyShape.position(0, 0)
      flyGraph.addCell(flyShape)
      $("#flyPaper").offset({
        left: e.pageX - offset.x,
        top: e.pageY - offset.y
      })
      $("body").on("mousemove.fly", function(e) {
        $("#flyPaper").offset({
          left: e.pageX - offset.x,
          top: e.pageY - offset.y
        })
      })
      $("body").on("mouseup.fly", function(e) {
        var x = e.pageX,
          y = e.pageY,
          target = that.diagramPaper.$el.offset()

        // Dropped over paper ?
        if (
          x > target.left &&
          x < target.left + that.diagramPaper.$el.width() &&
          y > target.top &&
          y < target.top + that.diagramPaper.$el.height()
        ) {
          var s = flyShape.clone()
          s.position(x - target.left - offset.x, y - target.top - offset.y)
          that.diagramGraph.addCell(s)
        }
        $("body")
          .off("mousemove.fly")
          .off("mouseup.fly")
        flyShape.remove()
        $("#flyPaper").remove()
      })
    }
  },
  mounted() {
    this.organisation = this.getOrganisationHierarchy()
    this.jointjsDemo()
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
      border-right: 1px solid gray;
      padding: 0;
      height: 100%;
      overflow: scroll;
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
        overflow: scroll;
        padding: 2px;
        table {
          width: 100%;
          position: relative;
          overflow: scroll;
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
