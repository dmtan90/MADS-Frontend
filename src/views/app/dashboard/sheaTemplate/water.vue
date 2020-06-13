<template>
  <div class="water-container">
    <h2>Water Quality</h2>
    <div class="first-row">
      <highcharts :options="tempWidgetOptions" class="widget">
      </highcharts>
      <highcharts :options="pHWidgetOptions" class="widget ph-widget">
      </highcharts>
    </div>
    <div class="second-row">
      <div class="widget turbidity">
        <div class="left-section">
          <div class="heading">Turbidity (NTU)</div>
          <img src="https://heveaconnect.herokuapp.com/images/turbidity-icon.png" alt="">
        </div>
        <div class="right-section">
          <span>365 NTU</span>
        </div>
      </div>
      <div class="widget conductivity">
        <div class="left-section">
          <div class="heading">Conductivity (mV)</div>
          <img src="https://heveaconnect.herokuapp.com/images/conductivity-icon.png" alt="">
        </div>
        <div class="right-section">
          <span>0.17 mV</span>
        </div>
      </div>
      <div class="widget orp">
        <div class="left-section">
          <div class="heading">ORP (mS/cm)</div>
          <img src="https://heveaconnect.herokuapp.com/images/orp-icon.png" alt="">
        </div>
        <div class="right-section">
          <span>650.63 mS/cm</span>
        </div>
      </div>
    </div>
    <h2>Water Level</h2>
    <div class="water-level">
      <div class="water-filled"></div>
      <span>60%</span>
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
      pHWidgetOptions: {}
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
        text: 'Temperature (°C)'
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

    this.pHWidgetOptions = {
      chart: {
        type: 'solidgauge',
        height: '210',
        width: '300'
      },

      title: {
        text: 'pH(0-14)'
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
          [0, '#55BF3B'], // green
          [7, '#DDDF0D'], // yellow
          [14, '#DF5353'] // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16
        },
        min: 0,
        max: 14,
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
        data: [6.02],
        dataLabels: {
          format:
                '<div style="text-align:center">' +
                '<span style="font-size:20px; color: #19A137">{y} pH</span>' +
                '</div>'
        },
        tooltip: {
          valueSuffix: ' pH'
        }
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
  .water-container {
    .first-row {
      display: flex;
      margin-top: 30px;
      .widget {
        width: 400px;
        border-radius: 8px;
        height: 230px;
        &.ph-widget {
          background-color: white;
          border: 1px solid #e2e2e2;
          margin-left: 20px;
        }
      }
    }
    .second-row {
      margin-top: 40px;
      margin-bottom: 60px;
      display: flex;
      .widget {
        max-width: 400px;
        width: 32%;
        border: 1px solid #e2e2e2;
        border-radius: 8px;
        display: flex;
        padding: 10px;
        .left-section {
          width: 180px;
          .heading {
            font-size: 18px;
            margin-bottom: 10px;
          }
          img {
            width: 100px;
            height: 100px;
          }
        }
        .right-section {
          width: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          color: #797979;
        }

        &.conductivity, &.orp {
          margin-left: 20px;
        }
      }
    }

    .water-level {
      margin-top: 20px;
      height: 90px;
      width: 100%;
      max-width: 1200px;
      border-radius: 12px;
      // background-color: #f6f6f6;
      border: 1px solid #e2e2e2;
      position: relative;
      text-align: right;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 27px;
      padding-right: 15%;
      color: #797979;
      .water-filled {
        width: 60%;
        height: 100%;
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        position: absolute;
        border: 1px solid white;
        left: 0;
        top: 0;
        z-index: 99;
        background: url("https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_1280.jpg");
        background-size: cover !important;
        background-position: center !important;
      }
    }
  }
</style>

<style lang="scss">
  .ph-widget {
    .highcharts-container  {
      margin: 0 auto;
    }
  }
</style>
