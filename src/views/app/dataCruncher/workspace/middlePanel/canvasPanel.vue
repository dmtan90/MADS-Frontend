<template>
  <div class="h-100">
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
        <div class="icon-container" :class="{'active': anyNewChanges}">
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
import canvasService from '@/services/canvas.service'

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
      taskId: null,
      anyNewChanges: false,
      rectangleSelect: null,
      rectangleSelectInit: false
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

      // this.diagramPaper.on('blank:pointerdown', (evt, x, y) => {
      // })

      this.diagramPaper.on('blank:pointermove', (evt, x, y) => {
        if (!this.rectangleSelectInit) {
          this.rectangleSelectInit = true

          this.rectangleSelectOriginX = x
          this.rectangleSelectOriginY = y

          this.rectangleSelect = new joint.shapes.standard.Rectangle({
            position: {
              x: this.rectangleSelectOriginX,
              y: this.rectangleSelectOriginX
            },
            size: {
              width: 0,
              height: 0
            },
            attrs: {
              body: {
                fill: '#0779e4',
                strokeDasharray: '10,2',
                opacity: 0.3
              }
            }
          })

          this.rectangleSelect.addTo(this.diagramGraph)
        }

        let rectangleSelectWidth = x - this.rectangleSelectOriginX
        let rectangleSelectHeight = y - this.rectangleSelectOriginY
        this.rectangleSelect.resize(rectangleSelectWidth, rectangleSelectHeight)
      })

      this.diagramPaper.on('blank:pointerup', (evt, x, y) => {
        this.rectangleSelectEndX = x
        this.rectangleSelectEndY = y

        this.rectangleSelect.remove()
        this.rectangleSelectInit = false

        let cells = that.diagramGraph.getCells()

        this.$_.forEach(cells, (cell) => {
          let cellView = cell.findView(this.diagramPaper)

          let cellOriginX = cell.position.x
          let cellOriginY = cell.position.y

          let cellEndX = cell.position.x + cell.size.width
          let cellEndY = cell.position.y + cell.size.height

          if ((this.rectangleSelectOriginX <= cellOriginX <= this.rectangleSelectEndX) || (this.rectangleSelectOriginX <= cellEndX <= this.rectangleSelectEndX)) {
            let id = cellView.id
            that.selectedCells[id] = cellView
            cellView.highlight()
          } else if ((this.rectangleSelectOriginY <= cellOriginY <= this.rectangleSelectEndY) || (this.rectangleSelectOriginY <= cellEndY <= this.rectangleSelectEndY)) {
            let id = cellView.id
            that.selectedCells[id] = cellView
            cellView.highlight()
          }
        })
      })

      this.diagramGraph.on('add', (cell) => {
        this.anyNewChanges = true
      })

      this.diagramGraph.on('remove', (cell) => {
        this.anyNewChanges = true
      })

      this.diagramGraph.on('change:target', (cell) => {
        this.anyNewChanges = true
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
    getGraphObject (graph) {
      let graphObject = {}

      this.$_.forEach(graph.cells, (cell) => {
        graphObject[cell.id] = cell
      })

      return graphObject
    },
    getWorkflowObject (workflow) {
      let workflowObject = {}

      this.$_.forEach(workflow, (cell) => {
        workflowObject[cell.id] = cell
      })

      return workflowObject
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
              'inports': linkTarget.entity.inports[0]
            })
          }
        }
      })

      return inputNodes
    },
    getWorkFlowInputs (workflowObject) {
      let todayDate = this.$moment()
      let endDate = todayDate.format('YYYY-MM-DD')
      let startDate = todayDate.subtract(1, 'months').format('YYYY-MM-DD')

      let inputNodes = this.getInputNodes()
      let inputs = []

      this.$_.forEach(workflowObject, (cell) => {
        if (cell.entityType === 'input') {
          let sensorParameter = cell.entity

          inputs = this.$_.concat(inputs, {
            id: cell.id,
            'start_date': startDate,
            'end_date': endDate,
            sensor_id: sensorParameter.parentId,
            parameter_id: sensorParameter.id,
            nodes: inputNodes[cell.id]
          })
        }
      })

      return inputs
    },
    getVertices (workflowObject) {
      let vertices = []

      this.$_.forEach(workflowObject, (cell) => {
        if (cell.type !== 'link' && cell.entityType !== 'input') {
          vertices = this.$_.concat(vertices, {
            'id': cell.id,
            'module': cell.entity.module,
            'type': cell.entityType,
            'inports': cell.entity.inports,
            'outports': cell.entity.outports
          })
        }
      })

      return vertices
    },
    getEdgeList (workflowObject) {
      let edges = []

      this.$_.forEach(workflowObject, (cell) => {
        if (cell.type === 'link') {
          let linkSourceId = cell.source.id
          let linkTargetId = cell.target.id
          let linkSource = workflowObject[linkSourceId]
          let linkTarget = workflowObject[linkTargetId]

          if (linkSource.entityType !== 'input') {
            edges = this.$_.concat(edges, {
              'source_node': {
                'id': linkSource.id,
                'module': linkSource.entity.module,
                'inports': linkSource.entity.inports[0],
                'outports': linkSource.entity.outports[0],
                'type': linkSource.entityType
              },
              'target_node': {
                'id': linkTarget.id,
                'module': linkTarget.entity.module,
                'inports': linkTarget.entity.inports[0],
                'outports': linkTarget.entity.outports[0],
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

      let graph = this.diagramGraph.toJSON()
      this.graphObject = this.getGraphObject(graph)
      let workflowGraphs = canvasService.findGraphConnectedComponents(this.graphObject)
      let workflows = []

      this.$_.forEach(workflowGraphs, (workflow) => {
        let workflowObject = this.getWorkflowObject(workflow)
        let inputs = this.getWorkFlowInputs(workflowObject)
        let vertices = this.getVertices(workflowObject)
        let edges = this.getEdgeList(workflowObject)

        workflows = this.$_.concat(workflows, {
          input_data: inputs,
          graph: {
            edge_list: edges,
            vertices: vertices
          }
        })
      })

      let payload = {
        name: 'Demo Task',
        type: 'one-time',
        description: 'Demo Task Description',
        workflows: workflows
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
        .icon {
          width: 20px;
          height: 20px;
          margin: 0 5px;
          cursor: pointer;
        }
        &.active {
          background-color: #ffa07a;
          .icon {
            fill: white;
          }
        }
      }
    }
  }
  .data-canvas {
    height: calc(100% - 40px);
    overflow: auto;
  }
</style>
