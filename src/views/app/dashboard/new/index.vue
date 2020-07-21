<template>
  <div class="new-section h-100">
    <div class="themes-section" v-if="showAllThemes">
      <b-row>
        <!-- <b-colxx lg="3" md="3" sm="4" xs="12" xxs="12" class="theme-card">
          <div class="theme-container" @click="selectTheme({})">
            <div class="theme-image"></div>
            <div class="theme-info">
              <h3>Blank</h3>
            </div>
          </div>
        </b-colxx> -->
        <b-colxx lg="3" md="3" sm="4" xs="12" xxs="12" class="theme-card" v-for="(theme, index) in dashboardThemes" :key="index">
          <div class="theme-container" @click="openNewDashboardModal(theme)">
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
      <blank-template v-if="selectedTheme.key === 'blank'" @show-all="setTheme(null)"></blank-template>
      <shea-template v-if="selectedTheme.key === 'shea'" @show-all="setTheme(null)"></shea-template>
      <hevea-template v-if="selectedTheme.key === 'hevea'"  @show-all="setTheme(null)"></hevea-template>
      <smart-agriculture-template v-if="selectedTheme.key === 'smart_agriculture'"  @show-all="setTheme(null)"></smart-agriculture-template>
    </div>
    <new-dashboard-modal ref="newDashboardModal" @create-dashboard="onCreateDashboard"></new-dashboard-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import blankTemplate from './../blankTemplate'
import sheaTemplate from './../sheaTemplate'
import heveaTemplate from './../heveaTemplate'
import smartAgricultureTemplate from './../smartAgricultureTemplate'
import newDashboardModal from './../newDashboardModal'
import dashboardService from '@/services/dashboard.service'

export default {
  components: {
    sheaTemplate,
    heveaTemplate,
    smartAgricultureTemplate,
    blankTemplate,
    newDashboardModal
  },
  data () {
    return {
      showAllThemes: true,
      dashboardThemes: [
        {
          name: 'Blank',
          key: 'blank',
          imageUrl: ''
        },
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
    ...mapActions(['hideAppSidebar', 'showAppSidebar', 'setDashboard', 'selectTheme']),
    getBackgroundUrl (url) {
      return 'url(' + url + ')'
    },
    openNewDashboardModal (theme) {
      this.selectTheme(theme)
      this.$refs['newDashboardModal'].$refs['dashboardModal'].show()
    },
    onCreateDashboard (name) {
      let params = { name: name, settings: {} }
      let config = { orgId: this.currentUser.org.id, projectId: 1 }

      dashboardService.create(config, params)
        .then((response) => {
          this.setDashboard(response)
          this.hideAppSidebar('Dashboards')
          this.showAllThemes = false
        })
    },
    setTheme (theme) {
      if (theme) {
        this.hideAppSidebar('Dashboards')
      } else {
        this.showAppSidebar('Dashboards')
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedTheme'])
  },
  beforeDestroy () {
    this.selectTheme(null)
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
