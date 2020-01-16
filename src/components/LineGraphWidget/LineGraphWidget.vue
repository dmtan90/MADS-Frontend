<template>
  <vue-draggable-resizable
    @dragging="onDrag"
    @resizing="onLineChartResize"
    @dragstop="onDragStop"
    @resizestop="onResizeStop"
    :w="300"
    :h="240"
    :x="x"
    :y="y"
  >
    <div :class="{ 'd-none': isDragged }">
      <img
        name="line"
        draggable="true"
        width="70"
        src="https://img.icons8.com/carbon-copy/100/000000/graph.png"
      />
    </div>
    <div id="line" :class="{ 'd-none': !isDragged }"></div>
  </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  data () {
    return {
      resizing: false,
      width: 0,
      height: 0,
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
      this.dragging = true
      this.x = x
      this.y = y
    },
    onDragStop (x, y) {
      this.isDragged = true
      this.dragging = false
    },
    onResize (x, y, width, height) {
      this.resizing = true
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onResizeStop (x, y, width, height) {
      this.resizing = false
    },
    onLineChartResize (x, y, width, height) {
      this.$emit('line-chart-resize', { width: width, height: height })
    }
  }
}
</script>
