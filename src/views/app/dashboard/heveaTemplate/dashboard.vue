/* eslint-disable no-undef */
/* eslint-disable no-new */
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-sm-12">
        <div class="card">
          <div class="card-body ribbon-box">
            <div class="ribbon ribbon-blue float-left">
              Welcome
            </div>
            <p class="text-blue float-right">About Project and Platform</p>
            <div style="height: 10%;"></div>
            <div class="ribbon-content" style="padding-top: 40px; font-size: 15px; word-wrap: normal;">
              <p style="color: #808080">
                Welcome to Project Apricot POC Dashboard. Project Apricot is an Internet-of-Things (IoT) trial project to capture and display real-time factory data using industrial sensors from the HalcyonAgri PT. Pulau Bintan Djaya (PBD) crumb rubber factory at Bintan, Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body ribbon-box">
            <div class="ribbon ribbon-blue float-left">
              Site Explorer
            </div>
            <p class="text-blue float-right">Bird's-eye View</p>
            <div style="height: 10%;"></div>
            <div class="ribbon-content">
              <div class="google-map" id="google-map" style="width: 100%; height: 180px;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body ribbon-box">
            <div class="ribbon ribbon-blue float-left">
              Site Layout
            </div>
            <p class="text-blue float-right">Proceses and Sensor Locations</p>
            <div style="height: 10%;"></div>
            <div class="ribbon-content">
              <img class="" src="https://heveaconnect.herokuapp.com/images/pbd-process-sensor-location.png" alt="" style="cursor: pointer;" data-toggle="modal" data-target="#exampleModal">
              <!-- Modal -->
              <!-- <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document" style="max-width: 75vw;">
                  <div class="modal-content">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true" style="float: right;">&times;</span>
                    </button>
                    <div class="modal-body">
                      <img class="" src="/images/pbd-process-sensor-location.png" alt="">
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top: 30px;">
      <div class="col-sm-12">
        <div class="list-container process-data-history-container">
          <div class="col-12">
            <div class="row">
              <div class="col-lg-8 col-md-12 col-sm-12" style="padding-left: 0">
                <ul class="nav nav-tabs navtab-bg nav-justified">
                  <li class="nav-item" :class="{'active': selectedTab === 'water_inlet'}" @click="selectedTab = 'water_inlet'">
                    IPAL Water Inlet
                  </li>
                  <li class="nav-item" :class="{'active': selectedTab === 'pre_breaker'}" @click="selectedTab = 'pre_breaker'">
                    Wet Pre-breaker 1 (Line 2)
                  </li>
                  <li class="nav-item" :class="{'active': selectedTab === 'dryer_inlet'}" @click="selectedTab = 'dryer_inlet'">
                    Dryer (Line 2)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="water-container" v-if="selectedTab === 'water_inlet'">
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
    </div>
    <div class="water-container breaker-container" v-if="selectedTab === 'pre_breaker'">
      <div class="first-row">
        <highcharts :options="tempWidgetOptions" class="widget">
        </highcharts>
      </div>
      <div class="first-row average-data">
        <highcharts :options="avgCurrentChartObj" class="widget">
        </highcharts>
        <highcharts :options="avgVoltageChartObj" class="widget">
        </highcharts>
        <highcharts :options="activePowerChartObj" class="widget">
        </highcharts>
      </div>
      <div class="active-enery">
        <div class="left-section">
          <div class="heading">Total Active Energy (kWh)</div>
          <img src="https://image.flaticon.com/icons/svg/99/99744.svg" alt="">
        </div>
        <div class="right-section">
          <span>15554 kWh</span>
        </div>
      </div>
    </div>
    <div class="water-container" v-if="selectedTab === 'dryer_inlet'">
      <div class="first-row">
        <highcharts :options="tempWidgetOptions" class="widget">
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
      selectedTab: 'water_inlet',
      tempWidgetOptions: {},
      pHWidgetOptions: {}
    }
  },
  mounted () {
    const element = document.getElementById('google-map')
    const options = {
      zoom: 0,
      center: new google.maps.LatLng(0.905497, 104.553407),
      disableDefaultUI: true
    }

    let position = new google.maps.LatLng(0.905497, 104.553407)

    const map = new google.maps.Map(element, options)

    // eslint-disable-next-line no-new
    new google.maps.Marker({
      position,
      animation: google.maps.Animation.DROP,
      map,
      title: 'Site Location'
    })

    this.tempWidgetOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
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

    let vuMeterOptions = {
      chart: {
        type: 'gauge',
        plotBorderWidth: 1,
        plotBackgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#FFF4C6'],
            [0.3, '#FFFFFF'],
            [1, '#FFF4C6']
          ]
        },
        plotBackgroundImage: null,
        height: 200
      },

      title: {
        text: 'VU meter'
      },

      pane: {
        startAngle: -45,
        endAngle: 45,
        background: null,
        center: ['50%', '145%'],
        size: 300
      },

      exporting: {
        enabled: false
      },

      tooltip: {
        enabled: true
      },

      yAxis: {
        min: -20,
        max: 6,
        minorTickPosition: 'outside',
        tickPosition: 'outside',
        labels: {
          rotation: 'auto',
          distance: 20
        },
        plotBands: [{
          from: 0,
          to: 6,
          color: '#C02316',
          innerRadius: '100%',
          outerRadius: '105%'
        }],
        pane: 0,
        title: {
          text: 'VU<br/><span style="font-size:8px">Channel A</span>',
          y: -40
        }
      },

      plotOptions: {
        gauge: {
          dataLabels: {
            enabled: true
          },
          dial: {
            radius: '100%'
          }
        }
      },

      series: [{
        name: 'Channel A',
        data: [-20],
        yAxis: 0
      }]
    }

    this.avgCurrentChartObj = Object.assign({}, vuMeterOptions, { title: { text: 'Avg. Current' } },
      {
        yAxis: {
          min: 0,
          max: 70,
          minorTickPosition: 'outside',
          tickPosition: 'outside',
          labels: {
            rotation: 'auto',
            distance: 10
          },
          plotBands: [{
            from: 50,
            to: 70,
            color: '#C02316',
            innerRadius: '100%',
            outerRadius: '105%'
          }],
          pane: 0,
          title: {
            text: 'VU<br/><span style="font-size:8px">Channel A</span>',
            y: -40
          }
        }
      },
      {
        series: [{
          name: 'Avg Current',
          data: [0],
          tooltip: {
            valueSuffix: ' A'
          }
        }]
      })

    this.avgVoltageChartObj = Object.assign({}, vuMeterOptions, { title: { text: 'Avg. Voltage' } },
      {
        yAxis: {
          min: 380,
          max: 450,
          minorTickPosition: 'outside',
          tickPosition: 'outside',
          labels: {
            rotation: 'auto',
            distance: 10
          },
          plotBands: [{
            from: 430,
            to: 450,
            color: '#C02316',
            innerRadius: '100%',
            outerRadius: '105%'
          }],
          pane: 0,
          title: {
            text: 'VU<br/><span style="font-size:8px">Channel A</span>',
            y: -40
          }
        }
      },
      {
        series: [{
          name: 'Avg Voltage',
          data: [380],
          tooltip: {
            valueSuffix: ' V'
          }
        }]
      })
    this.activePowerChartObj = Object.assign({}, vuMeterOptions, { title: { text: 'Active Power' } },

      {
        yAxis: {
          min: 0,
          max: 80,
          minorTickPosition: 'outside',
          tickPosition: 'outside',
          labels: {
            rotation: 'auto',
            distance: 10
          },
          plotBands: [{
            from: 60,
            to: 80,
            color: '#C02316',
            innerRadius: '100%',
            outerRadius: '105%'
          }],
          pane: 0,
          title: {
            text: 'VU<br/><span style="font-size:8px">Channel A</span>',
            y: -40
          }
        }
      },
      {
        series: [{
          name: 'Active Power',
          data: [0],
          tooltip: {
            valueSuffix: ' W'
          }
        }]
      })
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
        border: 1px solid #e2e2e2;
        background-color: white;
        &.ph-widget {
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
        background-color: white;
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

  .average-data {
    max-width: 1300px;
    justify-content: space-between;
    .widget {
      max-width: 400px;
      width: 32% !important;
    }
  }

  .active-enery {
    width: 400px;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    display: flex;
    padding: 10px;
    margin-top: 40px;
    background-color: white;
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

  .card {
    height: 250px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    height: 45px;
    padding: 10px;
    background-color: white;
    border: 1px solid #f8f8f8;
    cursor: pointer;
    font-size: 14px;
    &.active {
      background-color: #4a81d4;
      color: #fff!important;
    }
  }

  /* Card Ribbon  */
  .ribbon-box {
    position: relative;
    padding: 5% !important;
  }

  .ribbon-box .ribbon.float-left {
    left: -10px;
    top: 10px;
    border-radius: 0 3px 3px 0;
  }

  .ribbon-box .ribbon-blue {
    background: #4a81d4;
  }

  .ribbon-box .ribbon {
    position: absolute;
    clear: both;
    padding: 6px 12px;
    margin-bottom: 15px;
    box-shadow: 2px 5px 10px rgba(50,58,70,.15);
    color: #fff;
    font-size: 13px;
  }

  .ribbon-box .ribbon-blue:before {
    border-color: #2d67be transparent transparent;
  }

  .ribbon-box .ribbon:before {
    content: " ";
    border-style: solid;
    border-width: 10px;
    display: block;
    position: absolute;
    bottom: -10px;
    left: 0;
    margin-bottom: -10px;
    /* z-index: -1; */
  }

  .ribbon-box .ribbon-content {
    /* clear: both; */
    /* height: 220px; */
  }

  .ribbon-box .ribbon-content img {
    height: 180px;
    width: 100%;
  }

  .ribbon-box .text-blue {
    color: #4a81d4 !important;
  }
</style>

<style lang="scss">
  .ph-widget {
    .highcharts-container  {
      margin: 0 auto;
    }
  }
</style>
