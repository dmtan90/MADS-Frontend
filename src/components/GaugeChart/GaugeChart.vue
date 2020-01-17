<template>
  <vue-draggable-resizable
    @dragging="onDrag"
    @resizing="onGaugeChartResize"
    @dragstop="onDragStop"
    :w="width"
    :h="height"
    :x="x"
    :y="y"
  >
    <img
      class="close"
      :class="{ 'd-none': !isDragged }"
      width="30"
      src="https://img.icons8.com/carbon-copy/100/000000/close-window.png"
    />
    <div :class="{ 'd-none': isDragged }">
      <img src="https://img.icons8.com/ios/50/000000/speed.png" width="50" />
    </div>
    <b-card
      :id="widgetId"
      :class="{ 'd-none': !isDragged }"
      title="Gauge Chart"
    >
    </b-card>
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
        this.height = 240
        this.width = 300

        this.gauge = c3.generate({
          size: {
            height: 240,
            width: 300
          },
          bindto: '#' + this.widgetId,
          data: {
            columns: [['data', 91.4]],
            type: 'gauge'
          }
        })
      }

      this.isDragged = true
    },
    onGaugeChartResize (x, y, width, height) {
      this.gauge.resize({
        height: height,
        width: width
      })
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
