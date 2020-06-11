<template>
  <div class="data-history-container">
    <div class="row" style="width: 100%; max-width: 1200px">
      <div class="col-sm-12">
        <div class="list-container process-data-history-container">
          <div class="col-12">
            <div class="row">
              <div class="col-lg-8 col-md-12 col-sm-12" style="padding-left: 0">
                <ul class="nav nav-tabs navtab-bg nav-justified">
                  <li class="nav-item" :class="{'active': selectedTab === 'water_inlet'}" @click="selectedTab = 'water_inlet'; selectedSubTab = 'field_view'">
                    IPAL Water Inlet
                  </li>
                  <li class="nav-item" :class="{'active': selectedTab === 'pre_breaker'}" @click="selectedTab = 'pre_breaker'; selectedSubTab = 'field_view'">
                    Wet Pre-breaker 1 (Line 2)
                  </li>
                  <li class="nav-item" :class="{'active': selectedTab === 'dryer_inlet'}" @click="selectedTab = 'dryer_inlet'; selectedSubTab = 'field_view'">
                    Dryer (Line 2)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top: 30px; width: 40%; max-width: 600px;">
      <div class="col-sm-12">
        <div class="list-container process-data-history-container">
          <div class="col-12">
            <div class="row">
              <div class="col-lg-8 col-md-12 col-sm-12" style="padding-left: 0">
                <ul class="nav nav-tabs navtab-bg nav-justified">
                  <li class="nav-item" :class="{'active': selectedSubTab === 'field_view'}" @click="selectedSubTab = 'field_view'">
                    Field View
                  </li>
                  <li class="nav-item" :class="{'active': selectedSubTab === 'data_history'}" @click="selectedSubTab = 'data_history'">
                    Data History
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedTab === 'water_inlet'">
      <div v-if="selectedSubTab === 'field_view'" class="field-view">
        <h3>IPAL WATER Inlet</h3>
        <p>
          This is the IPAL Water Inlet, ie. the inlet of the wastewater treatment plant. All the waste water from the factory goes through the IPAL water inlet for treatment. A water quality measurement here will reveal the condition of water after it has been used by the factory. Our objective is to obtain real-time pH, turbidity, conductivity and oxidation reduction potential (ORP) data of the water to gauge it's conditions. For this we have used MJ pH-S485-01, TS-S485-01, and ORP-S485-01 probe sensors respectively. All sensors are IP68 grade, immersible in water and suitable for industrial treatment plants with CEP certification. However a bi-annual cleaning and calibration should be followed for best performance. The data is collected over MODBUS RS485 in the IoT gateway, and transmitted over the factory WiFi network to the cloud server, at an interval of 5 minutes, running 24 x 7.
        </p>
        <div>
          <carousel :scrollPerPage="true" :per-page="1" :autoplay="true" :loop="true">
            <slide><img src="https://heveaconnect.herokuapp.com/images/ipal_water_inlet_carousel2.png"></slide>
            <slide><img src="https://heveaconnect.herokuapp.com/images/ipal_water_inlet_carousel3.png"></slide>
            <slide><img src="https://heveaconnect.herokuapp.com/images/ipal_water_inlet_carousel4.png"></slide>
            <slide><img src="https://heveaconnect.herokuapp.com/images/ipal_water_inlet_carousel1.png"></slide>
          </carousel>
        </div>
      </div>
    </div>
    <div v-if="selectedTab === 'pre_breaker'">
      <div v-if="selectedSubTab === 'field_view'" class="field-view">
        <h3>Wet Pre-breaker (Line 2)</h3>
        <p>
          This is the Wet Pre-breaker 1 of Line 2, and our objective is to obtain real-time electricity, vibration and temperature data for gauging it's performance. For this we have used the Socomec Diris A20 electricity meter, and the Banner QM42VT2 temperature and vibration sensor. The electricity meter measures current, voltage, power, energy, etc. And the temperature and vibration sensor tells the machine harmonics and heat dissipation. The data is collected over MODBUS RS485 in the IoT gateway, and transmitted over the factory WiFi network to the cloud server, at an interval of 5 minutes, running 24 x 7.
        </p>
        <div>
          <carousel :scrollPerPage="true" :per-page="1" :autoplay="true" :loop="true">
            <slide><img src="https://heveaconnect.herokuapp.com/images/wet_pre_breaker_carousel2.png"></slide>
            <slide><img src="https://heveaconnect.herokuapp.com/images/wet_pre_breaker_carousel3.png"></slide>
            <slide><img src="https://heveaconnect.herokuapp.com/images/wet_pre_breaker_carousel4.png"></slide>
            <slide><img src="https://heveaconnect.herokuapp.com/images/wet_pre_breaker_carousel1.png"></slide>
          </carousel>
        </div>
      </div>
    </div>
    <div v-if="selectedTab === 'dryer_inlet'">
      <div v-if="selectedSubTab === 'field_view'" class="field-view">
        <h3>Dryer (Line 2)</h3>
        <p>
          This is the Dryer of Line 2, and our objective is to obtain real-time temperature data of the dryer. For this we have used the Omega PT100 Resistance Temperature Detectors (RTD). This is based on the principle of resistance change vs. temperature, and can safely measure from -200°C to 600°C. The collected analog data is converted via ADC in the IoT gateway, and transmitted over the factory WiFi network to the cloud server, at an interval of 5 minutes, running 24 x 7.
        </p>
        <div>
          <carousel :scrollPerPage="true" :per-page="1" :autoplay="true" :loop="true">
            <slide><img src="https://heveaconnect.herokuapp.com/images/dryer_carousel2.png"></slide>
            <slide><img src="https://heveaconnect.herokuapp.com/images/dryer_carousel3.png"></slide>
            <slide><img src="https://heveaconnect.herokuapp.com/images/dryer_carousel4.png"></slide>
            <slide><img src="https://heveaconnect.herokuapp.com/images/dryer_carousel1.png"></slide>
          </carousel>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel,
    Slide
  },
  data () {
    return {
      selectedTab: 'water_inlet',
      selectedSubTab: 'field_view'
    }
  }
}
</script>

<style lang="scss" scoped>
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

  .field-view {
    margin-top: 30px;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    max-width: 1200px;
    width: 100%;
    background-color: white;
    h3 {
      padding: 20px 10px 10px 20px;
      color: #777777;
    }
    p {
      padding: 5px 10px 10px 20px;
    }
  }
</style>

<style lang="scss">
  .VueCarousel {
    img {
      width: 100% !important;
      height: 500px;
    }
  }

</style>
