<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.dashboard')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <div class="layout-container">
          <Menubar
           v-on:line-chart-resize="onLineChartResizeSet"
           v-on:pie-chart-resize="onPieResizeSet"
          />
          <div
            @drop.prevent="drop"
            @dragover.prevent
            class="draw-container"
          ></div>
        </div>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import c3 from 'c3'
import Menubar from './Menubar'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  components: {
    Menubar
  },
  data () {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }
  },
  methods: {
    // drag (e) {
    //   e.dataTransfer.setData('text', e.target.id)
    // },
    // allowdrop (e) {
    //   e.preventDefault()
    // },
    // drop (e) {
    //   e.preventDefault()
    //   var data = e.dataTransfer.getData('text')
    //   var nodeCopy = document.getElementById(data).cloneNode(true)
    //   // nodeCopy.id = 'newid'
    //   // nodeCopy.draggable = true
    //   // nodeCopy.ondragstart = this.drag
    //   nodeCopy.style.display = 'initial'
    //   // // nodeCopy.style.height = 'auto'
    //   // // nodeCopy.onmouseout = this.onChartResize
    //   // nodeCopy.resizing = this.onLineChartResize
    //   // var nodeCopy = this.getVueDraggableElement(data)
    //   console.log('nc', nodeCopy)
    //   e.target.appendChild(nodeCopy)
    // },
    getVueDraggableElement (id) {
      return (
        <div>
          <VueDraggableResizable
            ondragstart="onDrag"
            onresize="onGaugeResize"
            width="300"
            height="240"
            id='gauge'
          >
            <div></div>
          </VueDraggableResizable>
        </div>
      )
    },
    onResize: function (x, y, width, height) {
      this.resizing = true
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onLineChartResizeSet: function (coordinates) {
      // console.log('just test', coordinates)
      this.lineChart.resize({
        height: coordinates['height'],
        width: coordinates['width']
      })
    },
    onPieResizeSet: function (coordinates) {
      this.pie.resize({
        height: coordinates['height'],
        width: coordinates['width']
      })
    },
    onBarResizeSet: function (coordinates) {
      this.bar.resize({
        height: coordinates['height'],
        width: coordinates['width']
      })
    },
    onGaugeResizeSet: function (coordinates) {
      this.gauge.resize({
        height: coordinates['height'],
        width: coordinates['width']
      })
    },
    onDrag: function (x, y) {
      this.dragging = true
      this.x = x
      this.y = y
    },
    onDragStop: function (x, y) {
      this.dragging = false
    },
    onLineChartResize: function (x, y, width, height) {
      this.onLineChartResizeSet({ width: width, height: height })
    },
    onPieResize: function (x, y, width, height) {
      this.onPieResizeSet({ width: width, height: height })
    },
    onBarResize: function (x, y, width, height) {
      this.onBarResizeSet({ width: width, height: height })
    },
    onGaugeResize: function (x, y, width, height) {
      this.onGaugeResizeSet({ width: width, height: height })
    },
    onResizeStop: function (x, y, width, height) {
      this.resizing = false
    }
  },
  mounted () {
    this.bar = c3.generate({
      size: {
        height: 240,
        width: 300
      },
      bindto: '#bar',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 80, 50, 200, 300, 400]
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5
        }
      }
    })
    this.lineChart = c3.generate({
      size: {
        height: 240,
        width: 300
      },
      bindto: '#line',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    })
    this.pie = c3.generate({
      size: {
        height: 240,
        width: 300
      },
      bindto: '#pie',
      data: {
        columns: [
          ['data1', 50],
          ['data2', 50]
        ],
        type: 'pie'
      }
    })
    this.gauge = c3.generate({
      size: {
        height: 240,
        width: 300
      },
      bindto: '#gauge',
      data: {
        columns: [['data', 90]],
        type: 'gauge'
      }
    })
  }
}
</script>

<style scoped>
.layout-container {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto auto;
}

.draw-menubar {
  border: 5px solid #eee;
  border-radius: 5px;
  height: auto !important;
}

.draw-container {
  display: flex;
  flex-wrap: wrap;
  min-height: 800px;
  background: #eee;
}

.c3-ele svg {
  width: 100% !important;
  height: 100% !important;
}
</style>
