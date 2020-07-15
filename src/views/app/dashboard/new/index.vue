<template>
  <div class="new-section h-100">
    <div class="themes-section" v-if="!selectedDashboard">
      <b-row>
        <b-colxx lg="3" md="3" sm="4" xs="12" xxs="12" class="theme-card">
          <div class="theme-container">
            <div class="theme-image"></div>
            <div class="theme-info">
              <h3>Blank</h3>
            </div>
          </div>
        </b-colxx>
        <b-colxx lg="3" md="3" sm="4" xs="12" xxs="12" class="theme-card" v-for="(theme, index) in dashboardThemes" :key="index">
          <div class="theme-container" @click="selectTheme(theme)">
            <div class="theme-image" :style="{background: getBackgroundUrl(theme.imageUrl)}">
            </div>
            <div class="theme-info">
              <h3>
                {{theme.name}}
              </h3>
            </div>
          </div>
        </b-colxx>
      </b-row>
    </div>
    <div class="detail-section h-100" v-else>
      <shea-template v-if="selectedDashboard.key === 'shea'" @show-all="selectTheme(null)"></shea-template>
      <hevea-template v-if="selectedDashboard.key === 'hevea'"  @show-all="selectTheme(null)"></hevea-template>
      <smart-agriculture-template v-if="selectedDashboard.key === 'smart_agriculture'"  @show-all="selectTheme(null)"></smart-agriculture-template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import sheaTemplate from './../sheaTemplate'
import heveaTemplate from './../heveaTemplate'
import smartAgricultureTemplate from './../smartAgricultureTemplate'

export default {
  components: {
    sheaTemplate,
    heveaTemplate,
    smartAgricultureTemplate
  },
  data () {
    return {
      dashboardThemes: [
        {
          name: 'Shea',
          key: 'shea',
          imageUrl: '/assets/img/shea.png'
        },
        {
          name: 'Hevea',
          key: 'hevea',
          imageUrl: '/assets/img/hevea.png'
        },
        {
          name: 'Smart Agriculture',
          key: 'smart_agriculture',
          imageUrl: '/assets/img/smart_agriculture.png'
        },
        {
          name: 'Amsterdam',
          imageUrl: '/assets/img/amsterdam.jpg'
        },
        {
          name: 'Bangkok',
          imageUrl: '/assets/img/bangkok.jpg'
        },
        {
          name: 'Cairo',
          imageUrl: '/assets/img/cairo.jpg'
        },
        {
          name: 'Dublin',
          imageUrl: '/assets/img/dublin.jpg'
        },
        {
          name: 'Episkopi',
          imageUrl: '/assets/img/episkopi.jpg'
        },
        {
          name: 'Freetown',
          imageUrl: '/assets/img/freetown.jpg'
        },
        {
          name: 'Gustavia',
          imageUrl: '/assets/img/gustavia.jpg'
        },
        {
          name: 'Hamiltion',
          imageUrl: '/assets/img/hamilton.jpg'
        },
        {
          name: 'Idaho',
          imageUrl: '/assets/img/idaho.jpg'
        },
        {
          name: 'Jakarta',
          imageUrl: '/assets/img/jakarta.jpg'
        },
        {
          name: 'Kathmandu',
          imageUrl: '/assets/img/kathmandu.jpg'
        },
        {
          name: 'London',
          imageUrl: '/assets/img/london.jpg'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['hideAppSidebar', 'showAppSidebar', 'selectDashboard']),
    getBackgroundUrl (url) {
      return 'url(' + url + ')'
    },
    selectTheme (theme) {
      this.selectDashboard(theme)
      if (theme) {
        this.hideAppSidebar('Dashboards')
      } else {
        this.showAppSidebar('Dashboards')
      }
    }
  },
  computed: {
    ...mapGetters(['selectedDashboard'])
  },
  beforeDestroy () {
    this.selectDashboard(null)
    this.showAppSidebar('Dashboards')
  }
}
</script>

<style lang="scss" scoped>
  .themes-section {
    padding: 40px 0;
    max-width: 1200px;
    margin: 0 auto;
    .theme-container {
      background: #f9f9f9;
      box-shadow: 0 3px 4px #ddd;
      .theme-image {
        height: 180px;
        max-height: 180px;
        background-color: #fff;
        cursor: pointer;
        background-size: cover !important;
      }
      .theme-info {
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
    .theme-card {
      margin: 20px 0;
    }
  }
</style>
