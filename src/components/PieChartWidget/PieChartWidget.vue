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
    <div :class="{ 'd-none': isDragged }">
      <img src="https://img.icons8.com/cotton/64/000000/pie-chart.png" width="50"/>
    </div>
    <div :id="widgetId" :class="{ 'd-none': !isDragged }"></div>
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
      this.$emit('instanceUsed')
      this.x = x
      this.y = y
    },
    onDragStop (x, y) {
      if (!this.isDragged) {
        this.width = 300
        this.height = 240

        this.pie = c3.generate({
          size: {
            height: 240,
            width: 300
          },
          bindto: '#' + this.widgetId,
          data: {
            columns: [
              ['data1', 50],
              ['data2', 50]
            ],
            type: 'pie'
          }
        })
      }

      this.isDragged = true
    },
    onPieChartResize (x, y, width, height) {
      this.pie.resize({
        height: height,
        width: width
      })
    }
  }
}
</script>
