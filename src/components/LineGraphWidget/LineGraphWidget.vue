<template>
  <vue-draggable-resizable
    @dragging="onDrag"
    @resizing="onPieChartResize"
    @dragstop="onDragStop"
    :w="width"
    :h="height"
    :x="x"
    :y="y"
  >
    <img
      v-on:click="onCloseClick"
      class="close"
      :class="{ 'd-none': !isDragged }"
      width="30"
      src="https://img.icons8.com/carbon-copy/100/000000/close-window.png"
    />
    <div :class="{ 'd-none': isDragged }">
      <img
        src="https://img.icons8.com/carbon-copy/100/000000/graph.png"
        width="50"
      />
    </div>
    <b-card :id="widgetId" :class="{ 'd-none': !isDragged }"></b-card>
  </vue-draggable-resizable>
</template>

<script>
import c3 from 'c3'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  props: ['widgetId'],
  data () {
    return {
      width: 50,
      height: 50,
      x: 0,
      y: 0,
      isDragged: false
    }
  },
  components: {
    VueDraggableResizable
  },
  methods: {
    onDrag (x, y) {
      this.$emit('instanceUsed', this.widgetId)
      this.x = x
      this.y = y
    },
    onDragStop (x, y) {
      if (!this.isDragged) {
        this.width = 300
        this.height = 240

        this.lineChart = c3.generate({
          size: {
            height: 240,
            width: 300
          },
          bindto: '#' + this.widgetId,
          data: {
            x: 'x',
            columns: [
              [
                'x',
                '2013-01-01',
                '2013-01-02',
                '2013-01-03',
                '2013-01-04',
                '2013-01-05',
                '2013-01-06'
              ],
              ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 130, 340, 200, 500, 250, 350],
              ['data3', 400, 500, 450, 700, 600, 500]
            ]
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%Y-%m-%d'
              }
            }
          }
        })
      }

      this.isDragged = true
    },
    onPieChartResize (x, y, width, height) {
      this.lineChart.resize({
        height: height,
        width: width
      })
    },
    onCloseClick () {
      this.$emit('onCloseClick', this.widgetId)
    }
  }
}
</script>

<style scoped>
.vdr {
  position: relative;
}
.close {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -150%);
}
</style>
