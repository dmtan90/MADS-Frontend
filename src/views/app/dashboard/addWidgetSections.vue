<template>
  <div>
    <h3>Add New Widget</h3>
    <section v-if="selectedSectionIndex === 1" class="select-widget">
      <div class="widget-category">
        <span class="category" :class="{'active': selectedCategory === 'charts'}" @click="setCategory('charts')">Charts</span>
        <span class="category" :class="{'active': selectedCategory === 'stocks'}" @click="setCategory('stocks')">Stocks</span>
        <span class="category" :class="{'active': selectedCategory === 'maps'}" @click="setCategory('maps')">Maps</span>
        <span class="category" :class="{'active': selectedCategory === 'gantt'}" @click="setCategory('gantt')">Gantt</span>
      </div>
      <div class="widgets-section">
        <div class="widgets">
          <b-row>
            <b-colxx lg="4" md="4" sm="6" xs="12" xxs="12" class="widget" v-for="(widget, index) in widgetList" :key="index">
              <div class="widget-container" @click="selectedWidget = widget.key" :class="{'active': selectedWidget === widget.key}">
                <div class="widget-image">
                  <img :src="widget.imageUrl" alt="">
                </div>
                <div class="widget-info">
                  <h3>{{widget.name}}</h3>
                </div>
              </div>
            </b-colxx>
          </b-row>
        </div>
      </div>
    </section>
    <section v-if="selectedSectionIndex === 2" class="select-data">
      <div class="widget-category data-type-category">
        <span class="category" :class="{'active': selectedDataType === 'entityData'}" @click="setDataType('entityData')">Entity Data</span>
        <span class="category" :class="{'active': selectedDataType === 'functionData'}" @click="setDataType('functionData')">Function</span>
      </div>
      <div class="data-type-section">
        <div v-if="selectedDataType === 'entityData'" class="vue-tree-container">
          <mads-tree
            ref="tree"
            :treeView="'file'"
            :treeOptions="treeOptions"
          ></mads-tree>
        </div>
        <div v-if="selectedDataType === 'functionData'" class="vue-tree-container">
          <functions-data :selectable="true"></functions-data>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import madsTree from './../shared/madsTree/index'
import functionsData from './../dataCruncher/workspace/leftPanel/functions'

export default {
  components: {
    madsTree,
    functionsData
  },
  props: {
    selectedSectionIndex: {
      type: Number,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedCategory: 'charts',
      selectedDataType: 'entityData',
      selectedWidget: null,
      widgetList: [],
      chartList: [],
      stockList: [],
      mapList: [],
      ganttList: [],
      treeOptions: {
        selectable: true,
        singleSelect: true
      }
    }
  },
  methods: {
    setCategory (category) {
      this.selectedCategory = category
      switch (category) {
        case 'charts':
          this.widgetList = this.chartList
          break
        case 'stocks':
          this.widgetList = this.stockList
          break
        case 'maps':
          this.widgetList = this.mapList
          break
        case 'gantt':
          this.widgetList = this.ganttList
          break
      }
    },
    setDataType (type) {
      this.selectedDataType = type
    },
    getAllWidgets () {
      this.chartList = [
        {
          name: 'Line Charts',
          key: 'line',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highcharts/line-basic-default.png'
        },
        {
          name: 'Area Charts',
          key: 'area',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highcharts/area-basic-default.png'
        },
        {
          name: 'Column and bar Charts',
          key: 'column_bar',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highcharts/bar-basic-default.png'
        },
        {
          name: 'Pie Charts',
          key: 'pie',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highcharts/pie-basic-default.png'
        },
        {
          name: 'Gauges',
          key: 'gauge',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highcharts/gauge-solid-default.png'
        }
      ]
      this.stockList = [
        {
          name: 'Stock Chart',
          key: 'stock',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highstock/stock-tools-gui-default.png'
        },
        {
          name: 'CandleStick Chart',
          key: 'candlestick',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highstock/candlestick-and-volume-default.png'
        },
        {
          name: 'Intraday Area',
          key: 'intraday',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highstock/intraday-area-default.png'
        },
        {
          name: 'Depth Chart',
          key: 'depth',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highstock/depth-chart-default.png'
        },
        {
          name: 'Column Chart',
          key: 'column',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highstock/column-default.png'
        }
      ]
      this.mapList = [
        {
          name: 'Categorized areas',
          key: 'categorized',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highmaps/category-map-default.png'
        },
        {
          name: 'Distribution map',
          key: 'distribution',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highmaps/distribution-default.png'
        },
        {
          name: 'Map bubble',
          key: 'map',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highmaps/map-bubble-default.png'
        }
      ]
      this.ganttList = [
        {
          name: 'Subtasks',
          key: 'subtasks',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/gantt/subtasks-default.png'
        },
        {
          name: 'Interactive Gantt',
          key: 'interactive',
          imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/gantt/interactive-gantt-default.png'
        }
      ]
    }
  },
  mounted () {
    this.getAllWidgets()
    this.widgetList = this.chartList
  }
}
</script>

<style lang="scss" scoped>
  .widget-category {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    .category {
      width: 80px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #797979;
      cursor: pointer;
      &.active {
        border-bottom: 2px solid rgba(59, 124, 168, 1);
      }
    }
    &.data-type-category {
      justify-content: flex-start;
      width: 200px;
      .category {
        width: 100px;
      }
    }
  }
  .widgets-section {
    .widgets {
      padding: 40px 0;
      max-width: 1200px;
      margin: 0 auto;
      .widget-container {
        background: #f9f9f9;
        box-shadow: 0 3px 4px #ddd;
        .widget-image {
          height: 110px;
          max-height: 110px;
          background-color: #fff;
          img {
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
        .widget-info {
          border-top: 1px solid #EDEDED;
          padding: 10px;
          text-align: center;
          h3 {
            text-transform: capitalize;
            margin: 0;
            color: #6B6FCE;
            font-size: 12px;
          }
        }
        &.active {
          border: 2px solid #4c92c3;
        }
      }
      .widget {
        margin: 20px 0;
      }
    }
  }
  .select-data {
    ul {
      list-style: none;
      padding-left: 0;
      display: flex;
    }
    .data-type-section {
      .vue-tree-container {
        margin-top: 20px;
        border: 1px solid #e2e2e2;
        height: 430px;
        border-radius: 4px;
        padding-bottom: 20px;
        overflow: auto;
      }
    }
  }
</style>
