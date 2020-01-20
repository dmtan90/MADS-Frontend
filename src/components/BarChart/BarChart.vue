<template>
  <vue-draggable-resizable
    @dragging="onDrag"
    @resizing="onBarChartResize"
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
        src="https://img.icons8.com/cotton/64/000000/bar-chart--v2.png"
        width="50"
      />
    </div>
    <b-card :id="widgetId" :class="{ 'd-none': !isDragged }" title="Bar Chart">
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

        this.Bar = c3.generate({
          size: {
            height: 240,
            width: 300
          },
          bindto: '#' + this.widgetId,
          data: {
            columns: [
              ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 130, 100, 140, 200, 150, 50]
            ],
            type: 'bar'
          }
        })

        this.isDragged = true
      }
    },
    onBarChartResize (x, y, width, height) {
      this.Bar.resize({
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
