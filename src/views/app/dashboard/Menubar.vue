<template>
  <div class="draw-menubar">
    <!-- <div
      draggable="true"
      @dragstart="drag"
      id="line"
      class="c3-ele"
      style="display: none"
    >
    </div> -->
    <img
      name="line"
      draggable="true"
      @dragstart="onIconDrag"
      width="70"
      src="https://img.icons8.com/carbon-copy/100/000000/graph.png"
    />
    <vue-draggable-resizable
      @dragging="onDrag"
      @resizing="onLineChartResize"
      style="display: none"
      :w="300"
      :h="240"
      id="line"
    >
      <div></div>
    </vue-draggable-resizable>

    <img
      name="pie"
      draggable="true"
      @dragstart="onIconDrag"
      width="70"
      src="https://img.icons8.com/cotton/64/000000/pie-chart.png"
    />
    <vue-draggable-resizable
      @dragging="onDrag"
      @resizing="onPieResize"
      style="display: none"
      :w="300"
      :h="240"
      id="pie"
    >
      <div></div>
    </vue-draggable-resizable>
    <!-- <div
      draggable="true"
      @dragstart="drag"
      id="pie"
      class="c3-ele"
      style="display: none"
    ></div> -->

    <img
      name="bar"
      draggable="true"
      @dragstart="onIconDrag"
      width="70"
      src="https://img.icons8.com/windows/32/000000/bar-chart.png"
    />
    <vue-draggable-resizable
      @dragging="onDrag"
      @resizing="onBarResize"
      style="display: none"
      :w="300"
      :h="240"
      id="bar"
    >
    </vue-draggable-resizable>
    <!-- <div
      draggable="true"
      @dragstart="drag"
      id="bar"
      class="c3-ele"
      style="display: none"
    ></div>
    -->
    <img
      name="gauge"
      draggable="true"
      @dragstart="onIconDrag"
      width="70"
      src="https://img.icons8.com/carbon-copy/100/000000/speed.png"
    />
    <vue-draggable-resizable
      @dragging="onDrag"
      @dragstop="onDragStop"
      @resizing="onGaugeResize"
      @resizestop="onResizeStop"
      :w="300"
      :h="240"
      id="gauge"
    >
    </vue-draggable-resizable>
    <!-- <div
      draggable="true"
      @dragstart="drag"
      id="gauge"
      class="c3-ele"
      style="display: none"
    ></div>
    -->
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

export default {
  components: {
    VueDraggableResizable
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
    onIconDrag (ev) {
      ev.dataTransfer.setData('text', ev.target.name)
    },
    onDrag (x, y) {
      this.dragging = true
      this.x = x
      this.y = y
    },
    onDragStop: function (x, y) {
      this.dragging = false
    },
    onResize: function (x, y, width, height) {
      this.resizing = true
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onResizeStop: function (x, y, width, height) {
      this.resizing = false
    },
    onLineChartResize: function (x, y, width, height) {
      this.$emit('line-chart-resize', { width: width, height: height })
    },
    onPieResize: function (x, y, width, height) {
      this.$emit('pie-resize', { width: width, height: height })
    },
    onBarResize: function (x, y, width, height) {
      this.$emit('bar-resize', { width: width, height: height })
    },
    onGaugeResize: function (x, y, width, height) {
      this.$emit('gauge-resize', { width: width, height: height })
    }
  }
}
</script>

<style scoped>
.draw-menubar {
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px;
}

.icon {
  width: 50px;
  margin: auto;
  text-align: center;
}
</style>
