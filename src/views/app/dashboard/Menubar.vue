<template>
  <div class="draw-menubar">
    <div id="line-graph"></div>
    <div id="pie-chart"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import LineGraphWidget from '../../../components/LineGraphWidget/LineGraphWidget'
import PieChartWidget from '../../../components/PieChartWidget/PieChartWidget'

export default {
  data () {
    return {}
  },
  methods: {
    generateRandomId () {
      return 'widget-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        var r = (Math.random() * 16) | 0
        var v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    },
    createPieChartWidgetInstance () {
      let id = this.generateRandomId()
      let that = this
      const componentInstance = new Vue(
        Object.assign({}, PieChartWidget, {
          propsData: {
            widgetId: id
          },
          created () {
            this.$once('instanceUsed', () => {
              that.createPieChartWidgetInstance()
            })
          }
        })
      )
      let cmp = componentInstance.$mount()
      document.getElementById('pie-chart').appendChild(cmp.$el)
    },
    createLineGraphWidgetInstance () {
      let id = this.generateRandomId()
      let that = this
      const componentInstance = new Vue(
        Object.assign({}, LineGraphWidget, {
          propsData: {
            widgetId: id
          },
          created () {
            this.$once('instanceUsed', () => {
              that.createLineGraphWidgetInstance()
            })
          }
        })
      )
      let cmp = componentInstance.$mount()
      document.getElementById('line-graph').appendChild(cmp.$el)
    }
  },
  mounted () {
    this.createPieChartWidgetInstance()
    this.createLineGraphWidgetInstance()
  }
}
</script>

<style lang="scss" scoped>
  .draw-menubar {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px;
    border: 5px solid #eee;
    border-radius: 5px;
    height: auto !important;
  }

  #line-graph, #pie-chart {
    position: relative;
  }
</style>
