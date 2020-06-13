<template>
  <div class="energy-container">
    <div class="left-section">
      <h3>Live Status</h3>
      <div class="img-container">
        <img src="/assets/img/live_status.png" alt="">
      </div>
    </div>
    <div class="right-section">
      <h3>Customer Profile</h3>
      <div class="description-container">
        <div class="info">
          <div class="company-name">
            <div class="header">Company Name</div>
            <div class="text">Nanyang Technological University</div>
          </div>
          <div class="more-info">
            <div class="user-name">
              <div class="header">User Name</div>
              <div class="text">ntusingapore</div>
            </div>
            <div class="headquarters">
              <div class="header">Headquarters</div>
              <div class="text">Singapore (Singapore)</div>
            </div>
          </div>
          <div class="description">
            <div class="header">Description</div>
            <div class="text">
              Nanyang Technological  is one of the top <br>
              universities in Singapore offering undergraduate and <br>
              postgraduate education and a leading global player <br>
              in research and development
            </div>
          </div>
        </div>
        <div class="image-container">
          <img src="https://www.opengovasia.com/wp-content/uploads/2018/09/5a8d10421129d8000136e397_The-Arc_NTU-smart-campus.jpg" alt="">
        </div>
      </div>
      <div class="readings-container">
        <div class="real-time">
          <span class="text">Real-time Production</span>
          <span class="value">0.78 <span>kW</span></span>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#sun"></use>
          </svg>
        </div>
        <div class="solar-production">
          <span class="text">Total Solar Production</span>
          <span class="value">167 <span>kWh</span></span>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#solar-panel"></use>
          </svg>
        </div>
      </div>
      <div class="chart-container">
        <div id="enery-generation-consumption"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import Exporting from 'highcharts/modules/exporting'

export default {
  mounted () {
    Highcharts.chart('enery-generation-consumption', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Enery Generation & Consumption Activity'
      },
      xAxis: {
        categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
      },
      yAxis: {
        title: {
          text: ''
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
        name: 'Energy Generated',
        data: [57.0, 60.9, 79.5, 60.5, 79.4, 41.5, 65.2]
      }, {
        name: 'Energy Consumpted',
        data: [39, 72, 57, 28.5, 41.9, 55.2, 10.0]
      }]
    })
  }
}
</script>

<style lang="scss" scoped>
  .energy-container {
    display: flex;
    .left-section {
      width: 400px;
      .img-container {
        img {
          width: 90%;
        }
      }
    }
    .right-section {
      width: 800px;
      .description-container {
        display: flex;
        border: 1px solid #e2e2e2;
        border-radius: 8px;
        .info {
          width: 400px;
          padding: 10px;
          .header {
            color: #000000;
            font-size: 16px;
          }
          .text {
            font-size: 14px;
            color: #4d5156;
          }
          .company-name {
          }
          .more-info {
            display: flex;
            margin-top: 15px;
            .user-name {
              margin-right: 60px;
            }
          }
          .description {
            margin-top: 25px;
          }
        }
        .image-container {
          width: 400px;
          img {
            width: 100%;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        }
      }
      .readings-container {
        display: flex;
        margin-top: 40px;
        justify-content: space-between;
        .real-time, .solar-production {
          width: 380px;
          height: 180px;
          border-radius: 4px;
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
          .icon {
            position: absolute;
            width: 90px;
            right: 15px;
            bottom: 0;
          }
        }
        .real-time {
          background-color: #CEE7FF;
        }
        .solar-production {
          background-color: #ffe5ce;
        }
      }
      .chart-container {
        margin-top: 40px;
        border: 1px solid #e2e2e2;
        padding: 10px;
        height: 420px;
        border-radius: 8px;
      }
    }
  }
</style>
