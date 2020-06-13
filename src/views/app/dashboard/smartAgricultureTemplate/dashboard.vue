<template>
  <div>
    <div class="first-row">
      <div class="item google-map" id="google-map" style="width: 100%; height: 300px;"></div>
      <div class="item cards-section">
        <div class="card-item mb mr">
          <div class="left-section">
            <div class="heading">Temperature</div>
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#temperature"></use>
            </svg>
          </div>
          <div class="right-section">
            <span>86.3°C</span>
          </div>
        </div>
        <div class="card-item mb">
          <div class="left-section">
            <div class="heading">Pressure</div>
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#pressure"></use>
            </svg>
          </div>
          <div class="right-section">
            <span>1.01 Bar</span>
          </div>
        </div>
        <div class="card-item mr">
          <div class="left-section">
            <div class="heading">Humidity</div>
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#humidity"></use>
            </svg>
          </div>
          <div class="right-section">
            <span>46%</span>
          </div>
        </div>
        <div class="card-item">
          <div class="left-section">
            <div class="heading">Solar Radiation</div>
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#radiation"></use>
            </svg>
          </div>
          <div class="right-section">
            <span>1R</span>
          </div>
        </div>
      </div>
    </div>
    <div class="second-row">
      <div class="heading">
        <h3>Aggregated Sensor Reading</h3>
        <h3>(Last 30 days)</h3>
      </div>
      <ul class="tabs">
        <li :class="{'active': selectedTab === 'temperature'}" @click="selectedTab = 'temperature'">Temperature</li>
        <li :class="{'active': selectedTab === 'pressure'}" @click="selectedTab = 'pressure'">Pressure</li>
        <li :class="{'active': selectedTab === 'humidity'}" @click="selectedTab = 'humidity'">Humidity</li>
        <li :class="{'active': selectedTab === 'radiation'}" @click="selectedTab = 'radiation'">Solar Radiation</li>
      </ul>
      <div class="chart-container">
        <highcharts :options="tempChartOptions" class="chart-item" v-if="selectedTab === 'temperature'">
        </highcharts>
        <highcharts :options="pressureChartOptions" class="chart-item" v-if="selectedTab === 'humidity'">
        </highcharts>
        <highcharts :options="humidityChartOptions" class="chart-item" v-if="selectedTab === 'pressure'">
        </highcharts>
        <highcharts :options="radiationChartOptions" class="chart-item" v-if="selectedTab === 'radiation'">
        </highcharts>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedTab: 'temperature',
      tempChartOptions: {},
      humidityChartOptions: {},
      pressureChartOptions: {},
      radiationChartOptions: {}
    }
  },
  methods: {
  },
  mounted () {
    const element = document.getElementById('google-map')
    const options = {
      zoom: 0,
      center: new google.maps.LatLng(0.905497, 104.553407)
    }

    // let position = new google.maps.LatLng(0.905497, 104.553407)

    const map = new google.maps.Map(element, options)

    // eslint-disable-next-line no-new
    new google.maps.Marker({
      position: { lat: 0.905497, lng: 104.553407 },
      animation: google.maps.Animation.DROP,
      map
    })

    // eslint-disable-next-line no-new
    new google.maps.Marker({
      position: { lat: 59.327, lng: 18.067 },
      animation: google.maps.Animation.DROP,
      map
    })

    // eslint-disable-next-line no-new
    new google.maps.Marker({
      position: { lat: -33, lng: 151 },
      animation: google.maps.Animation.DROP,
      map
    })

    // eslint-disable-next-line no-new
    new google.maps.Marker({
      position: { lat: -33.890542, lng: 151.274856 },
      animation: google.maps.Animation.DROP,
      map
    })

    // eslint-disable-next-line no-new
    new google.maps.Marker({
      position: { lat: 59.327, lng: 151 },
      animation: google.maps.Animation.DROP,
      map
    })

    this.tempChartOptions = {
      title: {
        text: 'Temperature',
        align: 'left',
        margin: 35
      },

      yAxis: {
        title: {
          text: 'Temperature'
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
    this.humidityChartOptions = {
      title: {
        text: 'Humidity',
        align: 'left',
        margin: 35
      },

      yAxis: {
        title: {
          text: 'Humidity'
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
    this.pressureChartOptions = {
      title: {
        text: 'Pressure',
        align: 'left',
        margin: 35
      },

      yAxis: {
        title: {
          text: 'Pressure'
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
    this.radiationChartOptions = {
      title: {
        text: 'Solar Radiation',
        align: 'left',
        margin: 35
      },

      yAxis: {
        title: {
          text: 'Radiation'
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
  .first-row {
    display: flex;
    justify-content: space-between;
    .item {
      flex-basis: 49%;
      flex-grow: 0;
    }
    .cards-section {
      .card-item {
        width: 48%;
        display: inline-flex;
        height: 140px;
        background-color: #2389da;
        color: white;
        border-radius: 4px;
        &.mb {
          margin-bottom: 20px;
        }
        &.mr {
          margin-right: 10px;
        }
        .left-section {
          width: 180px;
          padding-top: 10px;
          padding-left: 20px;
          .heading {
            font-size: 14px;
            margin-bottom: 10px;
          }
          .icon {
            width: 55px;
            height: 55px;
          }
        }
        .right-section {
          width: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          color: white;
        }
      }
    }
  }
  .second-row {
    margin-top: 60px;
    .heading {
      text-align: center;
      margin-bottom: 30px;
    }
    ul.tabs {
      list-style: none;
      padding-left: 0;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      width: 750px;
      margin-bottom: 20px;
      li {
        height: 32px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        cursor: pointer;
        &.active {
          background-color: #e2e2e2;
        }
      }
    }
    .chart-container {
      margin-bottom: 90px;
    }
  }
</style>
