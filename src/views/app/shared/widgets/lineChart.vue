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
        {},
        {
          width: 500
        },
        this.visualSettings,
        {
          series: this.series
        },
        {
          xAxis: {
            accessibility: {
              rangeDescription: "Range: 2010 to 2017",
            },
          },
          plotOptions: {
            series: {
              label: {
                connectorAllowed: false,
              },
              pointStart: 2010,
            },
          },
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
