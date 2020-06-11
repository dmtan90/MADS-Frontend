<template>
  <div class="storage-container">
    <div class="widgets-section">
      <div class="widget-item tank-temperature">
        <span class="text">BCU Tank <br> Temperature</span>
        <span class="value">30°C</span>
        <highcharts :options="tempWidgetOptions" class="widget">
        </highcharts>
      </div>
      <div class="widget-item circuit-voltage">
        <span class="absolute-text">BCU Battery Open <br> Circuit Voltage</span>
        <highcharts :options="circuitVoltageOptions" class="widget-circuit-voltage">
        </highcharts>
      </div>
      <div class="widget-item battery-pressure">
        <span class="text">Battery Pressure</span>
        <span class="value">0.2bar</span>
        <highcharts :options="pressureWidgetOptions" class="widget">
        </highcharts>
      </div>
    </div>
    <div class="charts-section">
      <div class="chart-item">
        <highcharts :options="tempChartOptions" class="chart">
        </highcharts>
      </div>
      <div class="chart-item">
        <highcharts :options="socChartOptions" class="chart">
        </highcharts>
      </div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import hcMore from 'highcharts/highcharts-more'
import solidgauge from 'highcharts/modules/solid-gauge'

hcMore(Highcharts)
solidgauge(Highcharts)

export default {
  data () {
    return {
      tempWidgetOptions: {},
      pressureWidgetOptions: {},
      circuitVoltageOptions: {},
      tempChartOptions: {},
      socChartOptions: {}
    }
  },
  mounted () {
    this.tempWidgetOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        backgroundColor: '#ffe5ce'
      },

      title: {
        text: ''
      },

      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#FFF'],
              [1, '#333']
            ]
          },
          borderWidth: 0,
          outerRadius: '109%'
        }, {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#333'],
              [1, '#FFF']
            ]
          },
          borderWidth: 1,
          outerRadius: '107%'
        }, {
          // default background
        }, {
          backgroundColor: '#DDD',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '103%'
        }]
      },

      // the value axis
      yAxis: {
        min: 0,
        max: 200,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: '°C',
          y: 10
        },
        plotBands: [{
          from: 0,
          to: 120,
          color: '#55BF3B' // green
        }, {
          from: 120,
          to: 160,
          color: '#DDDF0D' // yellow
        }, {
          from: 160,
          to: 200,
          color: '#DF5353' // red
        }]
      },

      series: [{
        name: 'Temperature',
        data: [30],
        tooltip: {
          valueSuffix: '°C'
        }
      }]

    }

    this.pressureWidgetOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        backgroundColor: '#CEE7FF'
      },

      title: {
        text: ''
      },

      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#FFF'],
              [1, '#333']
            ]
          },
          borderWidth: 0,
          outerRadius: '109%'
        }, {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#333'],
              [1, '#FFF']
            ]
          },
          borderWidth: 1,
          outerRadius: '107%'
        }, {
          // default background
        }, {
          backgroundColor: '#DDD',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '103%'
        }]
      },

      // the value axis
      yAxis: {
        min: 0,
        max: 1,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: 'bar',
          y: 10
        },
        plotBands: [{
          from: 0,
          to: 3,
          color: '#55BF3B' // green
        }, {
          from: 3,
          to: 7,
          color: '#DDDF0D' // yellow
        }, {
          from: 7,
          to: 10,
          color: '#DF5353' // red
        }]
      },

      series: [{
        name: 'Pressure',
        data: [0.2],
        tooltip: {
          valueSuffix: 'bar'
        }
      }]

    }

    this.circuitVoltageOptions = {
      chart: {
        type: 'solidgauge',
        height: '140',
        width: '190'
      },

      title: {
        text: ''
      },

      pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },

      exporting: {
        enabled: false
      },

      tooltip: {
        enabled: false
      },

      // the value axis
      yAxis: {
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16
        },
        min: 0,
        max: 2,
        title: {
          text: ''
        }
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      },
      credits: {
        enabled: false
      },

      series: [{
        name: '',
        data: [0.8],
        dataLabels: {
          format:
                '<div style="text-align:center">' +
                '<span style="font-size:20px; color: #19A137">{y} V</span>' +
                '</div>'
        },
        tooltip: {
          valueSuffix: ' V'
        }
      }]
    }

    this.tempChartOptions = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'BCU Tank Temperature',
        align: 'left',
        margin: 35
      },
      xAxis: {
        categories: ['3pm', '5pm', '7pm', '9pm', '11pm']
      },
      yAxis: {
        title: {
          text: 'Temperature'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        name: 'Tank1',
        data: [500000, 600000.0, 850000.9, 1100000.5, 1500000.5]
      }, {
        name: 'Tank2',
        data: [100000, 200000, 300000, 400000, 500000.5]
      }, {
        name: 'Average',
        data: [300000, 400000, 600000, 800000, 1000000.5]
      }]
    }

    this.socChartOptions = {
      title: {
        text: 'BCU State of Charge',
        align: 'left',
        margin: 35
      },

      yAxis: {
        title: {
          text: 'State Of Charge(SOC)'
        }
      },

      xAxis: {
        categories: ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm']
      },

      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },

      series: [{
        name: 'Time',
        data: [7, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .storage-container {
    max-width: 1200px;
    .widgets-section {
      display: flex;
      justify-content: space-between;
      .widget-item {
        width: 32%;
        border-radius: 8px;
        height: 190px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 20px;
        position: relative;
        .text {
            font-size: 18px;
          }
          .value {
            font-size: 41px;
            color: #19A137;
            margin-top: 25px;
            margin-bottom: 25px;
            span {
              font-size: 22px;
            }
          }
          .widget {
            position: absolute;
            width: 200px;
            height: 180px;
            right: 0;
            bottom: 0;
            border-radius: 80px;
          }
        &.tank-temperature {
          background-color: #ffe5ce;
        }
        &.battery-pressure {
          background-color: #CEE7FF;
        }
        &.circuit-voltage {
          border: 1px solid #e2e2e2;
          padding-left: 0;
          .absolute-text {
            position: absolute;
            top: 0;
            font-size: 15px;
            z-index: 99;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
          }
          .widget-circuit-voltage {
            position: absolute;
            bottom: 0px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .charts-section {
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
      .chart-item {
        width: 49%;
        border: 1px solid #e2e2e2;
        padding: 10px;
        height: 420px;
        border-radius: 8px;
      }
    }
  }
</style>
