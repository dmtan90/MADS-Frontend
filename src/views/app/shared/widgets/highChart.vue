<template>
  <div class="widget-container">
    <div :id="widgetId" style="display: flex; justify-content: center;"></div>
  </div>
</template>

<script>

import Highcharts from 'highcharts'
import Exporting from 'highcharts/modules/exporting'
import StockInit from 'highcharts/modules/stock'
import Boost from 'highcharts/modules/boost'
import ExportData from 'highcharts/modules/export-data'

Exporting(Highcharts)
StockInit(Highcharts)
Boost(Highcharts)
ExportData(Highcharts)

export default {
  props: {
    visualProperties: {
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
    category: {
      type: String,
      default: 'highchart'
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
    },
    widgetKey: {
      type: String
    }
  },
  data () {
    return {
      widget: null
    }
  },
  methods: {
    generateWidget () {
      let widgetOptions = this.$_.merge(
        this.visualProperties,
        {
          series: this.series,
          caption: {
            text: ''
          },
          boost: {
            useGPUTranslations: true
          },
          plotOptions: {
            line: {
              marker: {
                enabled: false
              }
            }
          }
        }
      )

      if (this.category === 'stock_chart') {
        this.widget = Highcharts.stockChart(this.widgetId, widgetOptions)
      } else {
        this.widget = Highcharts.chart(this.widgetId, widgetOptions)
      }
    },
    renderWidget () {
      this.generateWidget()
      if (this.page === 'dashboard') {
        this.resizeWidget()
      }
    },
    resizeWidget () {
      let width = this.colWidth * this.cols + (20 * (this.cols - 1))
      let height = this.colHeight * this.rows + (20 * (this.rows - 1)) - 28

      this.widget.setSize(width, height)
    },
    addDataPoint (point) {
      this.widget.series[0].addPoint(point, true, true)
    }
  },
  watch: {
    series (value) {
      this.renderWidget()
    },
    rows () {
      this.resizeWidget()
    },
    cols () {
      this.resizeWidget()
    }
  },
  mounted () {
    this.renderWidget()
  }
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
