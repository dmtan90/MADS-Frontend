<template>
  <div class="widget-container">
    <div :id="widgetId" :style="{ height: '230px', width: '373px' }" style="display: flex; justify-content: center;"></div>
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
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    colWidth: {
      type: Number,
      required: true
    },
    colHeight: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  methods: {
    generateChart() {
      let chartOptions = _.merge(
        this.visualSettings,
        {
          series: this.series,
          chart: {
            type: this.type
          },
          caption: {
            text: ''
          },
          credits: {
            enabled: false
          }
        }
      )
      this.chart = Highcharts.chart(this.widgetId, chartOptions)
    }
  },
  watch: {
    series(value) {
      this.generateChart()
    },
    width () {
      this.chart.setSize(this.width * this.colWidth, this.height * this.colHeight)
    },
    height () {
      this.chart.setSize(this.width * this.colWidth, this.height * this.colHeight)
    }
  },
  mounted() {
    Exporting(Highcharts)
    this.generateChart()
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
