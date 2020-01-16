<template>
  <div class="draw-menubar">
    <LineGraphWidget v-on:line-chart-resize="onLineChartResize" />
    <PieChartWidget v-on:pie-chart-resize="onPieChartResize" />
  </div>
</template>

<script>
import LineGraphWidget from '../../../components/LineGraphWidget/LineGraphWidget'
import PieChartWidget from '../../../components/PieChartWidget/PieChartWidget'

export default {
  components: {
    LineGraphWidget,
    PieChartWidget
  },
  data () {
    return {
      resizing: false,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      active: false,
      isDragged: false,
      menuBarItems: [
        {
          lineGraph:
            '<LineGraphWidget v-on:line-chart-resize="onLineChartResize" />'
        }
      ]
    }
  },
  methods: {
    onLineChartResize (c) {
      this.$emit('line-chart-resize', { width: c.width, height: c.height })
    },
    onPieChartResize (c) {
      this.$emit('pie-chart-resize', { width: c.width, height: c.height })
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

<!-- <vue-draggable-resizable
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
    </vue-draggable-resizable> -->

<!-- <div
      draggable="true"
      @dragstart="drag"
      id="line"
      class="c3-ele"
      style="display: none"
    >
    </div> -->
<!-- <div :class="{'d-none': !isDragged}">
        <img
          name="line"
          draggable="true"
          @dragstart="onIconDrag"
          width="70"
          src="https://img.icons8.com/carbon-copy/100/000000/graph.png"
        />
      </div> -->
<!-- <vue-draggable-resizable
      @dragging="onDrag"
      @resizing="onLineChartResize"
      @dragstop="onDragStop"
      @resizestop="onResizeStop"
      @activated="onActivated"
      @deactivated="onDeactivated"
      :w="300"
      :h="240"
      :x="0"
      :y="0"
      id="line"
    >
      <div></div>
    </vue-draggable-resizable> -->

<!-- <img
      name="pie"
      draggable="true"
      @dragstart="onIconDrag"
      width="70"
      src="https://img.icons8.com/cotton/64/000000/pie-chart.png"
    />

    <img
      name="gauge"
      draggable="true"
      @dragstart="onIconDrag"
      width="70"
      src="https://img.icons8.com/carbon-copy/100/000000/speed.png"
    /> -->
<!-- <vue-draggable-resizable
      @dragging="onDrag"
      @dragstop="onDragStop"
      @resizing="onGaugeResize"
      @resizestop="onResizeStop"
      :w="300"
      :h="240"
      id="gauge"
    >
    </vue-draggable-resizable> -->
<!-- <div
      draggable="true"
      @dragstart="drag"
      id="gauge"
      class="c3-ele"
      style="display: none"
    ></div>
    // onIconDrag (ev) {
    //   ev.dataTransfer.setData('text', ev.target.name)
    // },
        onPieResize: function (x, y, width, height) {
      this.$emit('pie-resize', { width: width, height: height })
    },
    onBarResize: function (x, y, width, height) {
      this.$emit('bar-resize', { width: width, height: height })
    },
    onGaugeResize: function (x, y, width, height) {
      this.$emit('gauge-resize', { width: width, height: height })
    }
    -->
