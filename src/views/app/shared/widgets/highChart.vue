<template>
  <div class="widget-container">
    <div
      id="widget"
      style="height: 400px; display: flex; justify-content: center;"
    ></div>
    <!-- <div class="loading centered-loader" v-if="!defaultValues"></div> -->
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
    type: {
      type: String,
      requied: true
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
      this.chart = Highcharts.chart("widget", chartOptions)
    },
  },
  watch: {
    series(value) {
      this.generateChart()
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
