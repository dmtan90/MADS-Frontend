<template>
  <div class="widget-container">
    <div :id="widgetId" style="display: flex; justify-content: center;"></div>
  </div>
</template>

<script>
/* eslint-disable */

import Highcharts from "highcharts"
import Exporting from "highcharts/modules/exporting"

export default {
  props: {
    visualSettings: {
      type: Object,
      required: true
    },
    series: {
      type: Array,
      required: true
    },
    widgetId: {
      type: String,
      required: true
    },
    page: {
      type: String,
      default: ''
    },
    colWidth: {
      type: Number,
      default: 0
    },
    colHeight: {
      type: Number,
      default: 0
    },
    cols: {
      type: Number,
      default: 0
    },
    rows: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      widget: null
    }
  },
  methods: {
    generateWidget() {
      let widgetOptions = _.merge(
        this.visualSettings,
        {
          series: this.series,
          caption: {
            text: ''
          }
        }
      )

      this.widget = Highcharts.chart(this.widgetId, widgetOptions)
    },
    renderWidget() {
      this.generateWidget()
      if (this.page === 'dashboard') {
        this.resizeWidget()
      }
    },
    resizeWidget() {
      let width = this.colWidth * this.cols + (20 * (this.cols - 1))
      let height = this.colHeight * this.rows + (20 * (this.rows - 1))

      this.widget.setSize(width, height)
    }
  },
  watch: {
    series(value) {
      this.renderWidget()
    },
    rows() {
      this.resizeWidget()
    },
    cols() {
      this.resizeWidget()
    }
  },
  mounted() {
    Exporting(Highcharts)
    this.renderWidget()
  },
}
</script>

<style lang="scss" scoped>
.widget-container {
  position: relative;
  background-color: white;
  .centered-loader {
    position: absolute;
    top: 50%;
    left: 50%;
  }
}
</style>

<style lang="scss">
  .highcharts-caption {
    background-color: #e0e0e0;
  }
</style>
