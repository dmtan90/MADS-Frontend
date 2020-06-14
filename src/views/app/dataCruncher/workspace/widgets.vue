<template>
  <div class="widgets-container">
    <div class="category" v-for="(category, index) in widgetList" :key="index">
      <div class="category-name" @click="toggleCategory(category)">
        <svg class="icon">
          <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
        </svg>
        <span>{{category.name}}</span>
      </div>
      <div v-if="category.expanded">
        <div class="category-list" v-for="(widget, fnIndex) in category.list" :key="fnIndex">
          <div class="widget-container" draggable="true" @dragstart="dragStart(widget, $event)">
            <div class="widget-image">
              <img :src="widget.imageUrl" alt="">
            </div>
            <div class="widget-info">
              <h3>{{widget.name}}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      widgetList: []
    }
  },
  methods: {
    getAllWidgets () {
      this.widgetList = [
        {
          name: 'Charts',
          key: 'tsu',
          expanded: true,
          list: [
            {
              name: 'Line Charts',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highcharts/line-basic-default.png'
            },
            {
              name: 'Area Charts',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highcharts/area-basic-default.png'
            },
            {
              name: 'Column and bar Charts',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highcharts/bar-basic-default.png'
            },
            {
              name: 'Pie Charts',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highcharts/pie-basic-default.png'
            },
            {
              name: 'Gauges',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highcharts/gauge-solid-default.png'
            }
          ]
        },
        {
          name: 'Stocks',
          key: 'tsu',
          list: [
            {
              name: 'Stock Chart',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highstock/stock-tools-gui-default.png'
            },
            {
              name: 'CandleStick Chart',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highstock/candlestick-and-volume-default.png'
            },
            {
              name: 'Intraday Area',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highstock/intraday-area-default.png'
            },
            {
              name: 'Depth Chart',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highstock/depth-chart-default.png'
            },
            {
              name: 'Column Chart',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highstock/column-default.png'
            }
          ]
        },
        {
          name: 'Maps',
          key: 'tsu',
          list: [
            {
              name: 'Categorized areas',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highmaps/category-map-default.png'
            },
            {
              name: 'Distribution map',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highmaps/distribution-default.png'
            },
            {
              name: 'Map bubble',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/highmaps/map-bubble-default.png'
            }
          ]
        },
        {
          name: 'Gantt',
          key: 'tsu',
          list: [
            {
              name: 'Subtasks',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/gantt/subtasks-default.png'
            },
            {
              name: 'Interactive Gantt',
              key: 'tsu_max',
              imageUrl: 'https://assets.highcharts.com/images/demo-thumbnails/gantt/interactive-gantt-default.png'
            }
          ]
        }
      ]
    },
    toggleCategory (category) {
      this.$set(category, 'expanded', !category.expanded)
    },
    dragStart (widget, event) {
      this.$emit('set-dragged-entity-text', { text: widget.name, color: '#FFA07A' })
    }
  },
  mounted () {
    this.getAllWidgets()
  }
}
</script>

<style lang="scss" scoped>
  .widgets-container {
    .category {
      margin-bottom: 10px;
      .category-name {
        background-color: #e2e2e2;
        padding: 7px;
        font-size: 15px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .icon {
          width: 13px;
          height: 13px;
          margin-right: 10px;
        }
      }
      .category-list {
        padding: 7px 20px 7px 20px;
        margin: 5px 0;
        .widget-container {
          background: #f9f9f9;
          box-shadow: 0 3px 4px #ddd;
          .widget-image {
            height: 180px;
            max-height: 180px;
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
            }
          }
        }
      }
    }
  }
</style>
