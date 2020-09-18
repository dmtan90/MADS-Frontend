<template>
  <div class="view-detail-wrap h-100">
    <div class="left-section">
      <ul>
        <li>Date</li>
        <li>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
          </svg>
          <span>AlarmPropagationAsset</span>
        </li>
        <li>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
          </svg>
          <span>Building</span></li>
        <li>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
          </svg>
          <span>TbServiceQueue</span></li>
        <li>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
          </svg>
          <span>apartment</span></li>
        <li>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
          </svg>
          <span>building</span></li>
        <li>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
          </svg>
          <span>default</span></li>
        <li>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
          </svg>
          <span>energyMeter</span></li>
        <li>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
          </svg>
          <span>heatMeter</span></li>
        <li>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
          </svg>
          <span>thermostat</span></li>
      </ul>
    </div>
    <div class="right-section">
      <div class="view-header">
        <h3>TbServiceQueue</h3>
        <svg class="icon">
          <use xlink:href="/assets/img/mads-common-icons.svg#save"></use>
        </svg>
        <svg class="icon">
          <use xlink:href="/assets/img/mads-common-icons.svg#copy"></use>
        </svg>
        <!-- <svg class="icon">
          <use xlink:href="/assets/img/mads-common-icons.svg#id"></use>
        </svg> -->
        <svg class="icon dustbin">
          <use xlink:href="/assets/img/mads-common-icons.svg#dustbin"></use>
        </svg>
        <b-button>View Mode</b-button>
      </div>
      <div class="chart-options">
        <div class="x-axis-options option-section">
          <div class="section-header">X axis</div>
          <div class="section-body">
            <div class="column">Date (RAW)</div>
          </div>
        </div>
        <div class="y-axis-options option-section">
          <div class="section-header">Y Axis</div>
          <div class="section-body">
            <div class="column">TbServiceQueue: successfulMsgs (AVG)</div>
          </div>
        </div>
        <div class="series-options option-section">
          <div class="section-header">Series</div>
          <div class="section-body">
            <div class="column">TbServiceQueue: TbServiceQueue (UNIQ)</div>
          </div>
        </div>
        <div class="build-report">
          <b-button class="custom-btn">Build Report</b-button>
        </div>
      </div>
      <div class="chart-filters">
        <b-form-group label="Range">
          <multiselect v-model="selectedRange" :options="rangeList" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Select range">
          </multiselect>
        </b-form-group>
        <b-form-group label="Group By">
          <multiselect v-model="selectedGroupBy" :options="groupByList" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Select group by">
          </multiselect>
        </b-form-group>
      </div>
      <div class="widget-container">
        <div id="view-detail-chart" style="display: flex; justify-content: center;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts'

export default {
  data () {
    return {
      rangeList: ['Today', 'Yesterday', 'Last 3 days', 'This Week', 'Prev Week', 'This Month', 'Prev Month', 'Last 3 Months', 'Custom'],
      groupByList: ['week', 'day', 'hour', 'minute'],
      selectedRange: null,
      selectedGroupBy: null
    }
  },
  methods: {
    generateChart () {
      let chartOptions = {
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: [
            '07 Sep',
            '08 Sep',
            '09 Sep',
            '10 Sep',
            '11 Sep',
            '12 Sep',
            '13 Sep',
            '14 Sep',
            '15 Sep',
            '16 Sep',
            '17 Sep',
            '18 Sep'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'successfulMsgs'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} msgs</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Main_datakrew-analytics',
          data: [499, 715, 1064, 1292, 1440, 1760, 1356, 1485, 2164, 1941, 956, 544]
        }]
      }

      this.widget = Highcharts.chart('view-detail-chart', chartOptions)
    }
  },
  mounted () {
    this.generateChart()
    this.selectedRange = this.rangeList[3]
    this.selectedGroupBy = this.groupByList[2]
  }
}
</script>

<style lang="scss" scoped>
  .view-detail-wrap {
    display: flex;
    .left-section {
      width: 300px;
      border-right: 1px solid #f2f2f2;
      ul {
        list-style: none;
        padding-left: 0;
        li {
          height: 35px;
          display: flex;
          align-items: center;
          font-size: 15px;
          .icon {
            width: 14px;
            height: 14px;
            transform: rotate(-90deg);
          }
          span {
            font-weight: bold;
            font-size: 15px;
            padding-left: 10px;
          }
        }
      }
    }
    .right-section {
      padding-left: 10px;
      width: calc(100% - 300px);
      .view-header {
        display: flex;
        align-items: center;
        h3 {
          margin-right: 10px;
          margin-bottom: 0;
        }
        .icon {
          width: 21px;
          height: 21px;
          margin: 0 5px;
          &.dustbin {
            width: 24px;
            height: 24px;
            border: 1px solid black;
            border-radius: 4px;
            padding: 2px;
          }
        }
        .btn {
          margin: 0 0 0 auto;
        }
      }
      .chart-options {
        margin-top: 20px;
        display: flex;
        background: hsla(0,0%,87.5%,.39);
        border: 1px solid hsla(0,0%,76.9%,.14);
        box-sizing: border-box;
        border-radius: 5px;
        padding: 1px 6px 19px;
        max-height: 185px;
        box-shadow: 0 3px 4px -2px rgba(0,0,0,.45);
        position: relative;
        .option-section {
          flex: 1;
          padding: 5px;
          display: flex;
          flex-direction: column;
          .section-header {
            font-size: 15px;
            text-align: center;
            padding: 6px 0 5px;
            background: #949494;
            border-radius: 3px 3px 0 0;
            color: #fff;
          }
          .section-body {
            .column {
              display: flex;
              flex-direction: row;
              background: rgba(0,0,0,.08);
              border-radius: 70px;
              flex: 1;
              align-items: center;
              cursor: grab;
              margin: 5px 0;
              padding: 5px;
            }
          }
        }
        .build-report {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -25px;
        }
      }
      .chart-filters {
        display: flex;
        margin-top: 30px;
      }
      .widget-container {
        margin-top: 30px;
      }
    }
  }
</style>

<style lang="scss">
  .form-group {
    margin-right: 20px;
  }
</style>
