<template>
  <div>
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
          <svg class="icon" @click="deployTask()">
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
          <svg class="icon" @click="registerTask()">
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
    <div class="data-canvas" @dragover.prevent @drop="dragElement($event)" v-on:keyup.delete="deleteSelectedCells()">
      <div id="canvas-diagram"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

import $ from 'jquery'
import 'jointjs/dist/joint.core.css'
import * as joint from 'jointjs'
import { mapGetters } from 'vuex'
import taskService from '@/services/task.service'

export default {
  props: {
    draggedEntity: {
      default: {}
    }
  },
  data () {
    return {
      diagramGraph: null,
      diagramPaper: null,
      paperCurrentZoom: 1,
      selectedCells: {},
      graphObject: {},
      taskId: null
    }
  },
  methods: {
    initCanvas () {
      let that = this

      this.diagramGraph = new joint.dia.Graph()
      this.diagramPaper = new joint.dia.Paper({
        el: $('#canvas-diagram'),
        model: this.diagramGraph,
        width: 4800,
        height: 4800,
        gridSize: 10,
        drawGrid: {
          name: 'doubleMesh',
          args: [
            { color: '#cccccc', thickness: 0.3 },
            { color: '#cccccc', thickness: 0.6, scaleFactor: 4 }
          ]
        },
        background: {
          color: 'white'
        },
        linkPinning: false,
        defaultLink: new joint.dia.Link({
          attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } },
          connector: {
            name: 'smooth'
          }
        })
      })
      this.diagramPaper.on('cell:pointerclick', function (cellView) {
        let id = cellView.id
        if (that.selectedCells[id]) {
          delete that.selectedCells[id]
          cellView.unhighlight()
        } else {
          that.selectedCells[id] = cellView
          cellView.highlight()
        }
      })
    },
    getGraphObject () {
      let graph = this.diagramGraph.toJSON()
      this.graphObject = {}

      this.$_.forEach(graph.cells, (cell) => {
        this.graphObject[cell.id] = cell
      })
    },
    getInputNodes () {
      let inputNodes = {}

      this.$_.forEach(this.graphObject, (cell) => {
        if (cell.entityType === 'input') {
          inputNodes[cell.id] = []
        }
      })

      this.$_.forEach(this.graphObject, (cell) => {
        if (cell.type === 'link') {
          let linkSourceId = cell.source.id
          let isLinkFromInput = inputNodes[linkSourceId]

          if (isLinkFromInput) {
            let linkTargetId = cell.target.id
            let linkTarget = this.graphObject[linkTargetId]

            inputNodes[linkSourceId] = this.$_.concat(inputNodes[linkSourceId], {
              'id': linkTarget.id,
              'module': linkTarget.entity.module,
              'i_port': linkTarget.entity.inports[0]
            })
          }
        }
      })

      return inputNodes
    },
    getWorkFlowInputs () {
      let inputNodes = this.getInputNodes(this.graphObject)
      let inputs = []

      this.$_.forEach(this.graphObject, (cell) => {
        if (cell.entityType === 'input') {
          let sensor = cell.entity
          let sensorType = sensor.sensor_type
          let parameterId = sensorType.parameters[0].id

          inputs = this.$_.concat(inputs, {
            id: cell.id,
            'start_date': '2020-06-15',
            'end_date': '2020-06-16',
            sensor_id: 7,
            parameter_id: parameterId,
            nodes: inputNodes[cell.id]
          })
        }
      })

      return inputs
    },
    getVertices () {
      let vertices = []

      this.$_.forEach(this.graphObject, (cell) => {
        if (cell.type !== 'link' && cell.entityType !== 'input') {
          vertices = this.$_.concat(vertices, {
            'id': cell.id,
            'module': cell.entity.module,
            'type': cell.entityType,
            'o_ports': cell.entity.outports[0]
          })
        }
      })

      return vertices
    },
    getEdgeList () {
      let edges = []

      this.$_.forEach(this.graphObject, (cell) => {
        if (cell.type === 'link') {
          let linkSourceId = cell.source.id
          let linkTargetId = cell.target.id
          let linkSource = this.graphObject[linkSourceId]
          let linkTarget = this.graphObject[linkTargetId]

          if (linkSource.entityType !== 'input') {
            edges = this.$_.concat(edges, {
              'source_node': {
                'id': linkSource.id,
                'module': linkSource.entity.module,
                'o_ports': linkSource.entity.outports[0],
                'type': linkSource.entityType
              },
              'target_node': {
                'id': linkTarget.id,
                'module': linkTarget.entity.module,
                'o_ports': linkTarget.entity.outports[0],
                'type': linkTarget.entityType
              }
            })
          }
        }
      })

      return edges
    },
    registerTask () {
      let loader = this.$loading.show()

      this.getGraphObject()
      let inputs = this.getWorkFlowInputs()
      let vertices = this.getVertices()
      let edges = this.getEdgeList()

      let payload = {
        name: 'Demo Task',
        type: 'one-time',
        description: 'Demo Task Description',
        workflows: [
          {
            input_data: inputs,
            graph: {
              edge_list: edges,
              vertices: vertices
            }
          }
        ]
      }
      let config = { orgId: this.currentUser.org.id, userId: this.currentUser.id }
      taskService.create(config, payload)
        .then((response) => {
          loader.hide()
          this.$toast.success('Task Registered Successfully')
          this.taskId = response.id
        })
    },
    deployTask () {
      let loader = this.$loading.show()

      let payload = {
        name: 'Demo Task',
        type: 'one-time',
        description: 'Demo Task Description',
        id: this.taskId,
        action: 'execute'
      }

      let config = { orgId: this.currentUser.org.id, userId: this.currentUser.id }

      taskService.create(config, payload)
        .then((response) => {
          loader.hide()
          this.$toast.success('Task Deployed Successfully')
          this.taskId = response.id
        })
    },
    dragElement (event) {
      let elementText = this.draggedEntity.text || ''
      let width = this.$_.size(elementText) * 8 + 20 > 90 ? this.$_.size(elementText) * 8 + 20 : 90

      let height = (this.draggedEntity.inPorts.length > this.draggedEntity.outPorts.length) ? (this.draggedEntity.inPorts.length * 20 + 20) : (this.draggedEntity.outPorts.length * 20 + 20)

      let flyShape = new joint.shapes.devs.Model({
        position: {
          x: event.offsetX,
          y: event.offsetY
        },
        size: {
          width: width,
          height: height
        },
        attrs: {
          text: {
            text: elementText,
            fontSize: '13',
            fill: '#fff'
          },
          rect: {
            fill: this.draggedEntity.backgroundColor,
            rx: '5'
          }
        },
        inPorts: this.draggedEntity.inPorts || [],
        outPorts: this.draggedEntity.outPorts || [],
        ports: {
          groups: {
            'in': {
              attrs: {
                '.port-body': {
                  fill: '#16A085',
                  magnet: 'passive'
                },
                circle: {
                  r: 8
                }
              }
            },
            'out': {
              attrs: {
                '.port-body': {
                  fill: '#E74C3C'
                },
                circle: {
                  r: 8
                }
              }
            }
          }
        },
        entity: this.draggedEntity.entity,
        entityType: this.draggedEntity.entityType
      })

      flyShape.addTo(this.diagramGraph)
    },
    zoomOut () {
      this.paperCurrentZoom = this.paperCurrentZoom + 0.2
      this.diagramPaper.scale(this.paperCurrentZoom)
    },
    zoomIn () {
      this.paperCurrentZoom = this.paperCurrentZoom - 0.2
      this.diagramPaper.scale(this.paperCurrentZoom)
    },
    deleteSelectedCells () {
      this.$_.forEach(this.selectedCells, (cell, _) => {
        cell.model.remove()
      })
    }
  },
  mounted () {
    this.initCanvas()

    document.addEventListener('keyup', (event) => {
      let key = event.keyCode
      event.preventDefault()
      if (key === 8 || key === 46) {
        this.deleteSelectedCells()
      }
    })
  },
  computed: {
    ...mapGetters(['currentUser'])
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
  .data-canvas {
    height: calc(100% - 40px);
    overflow: auto;
  }
</style>
