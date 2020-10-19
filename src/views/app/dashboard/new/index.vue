<template>
  <div class="new-section h-100">
    <div class="themes-section" v-if="showAllThemes">
      <!-- <b-row> -->
        <!-- <b-colxx lg="3" md="3" sm="4" xs="12" xxs="12" class="theme-card">
          <div class="theme-container" @click="selectTheme({})">
            <div class="theme-image"></div>
            <div class="theme-info">
              <h3>Blank</h3>
            </div>
          </div>
        </b-colxx> -->
        <div class="grid dashboards-grid row">
          <div class="col-md-4 grid-item" v-for="(theme, index) in dashboardThemes" :key="index">
            <div class="item-wrap" @click="openNewDashboardModal(theme)" :style="{background: getBackgroundUrl(theme.imageUrl)}">
              <div class="overlay">
              </div>
            </div>
            <div class="header">
              <span class="name">{{theme.name}}</span>
            </div>
          </div>
        </div>
        <!-- <b-colxx lg="3" md="3" sm="3" xs="12" xxs="12" class="theme-card" v-for="(theme, index) in dashboardThemes" :key="index">
          <div class="theme-container" @click="openNewDashboardModal(theme)">
            <div class="theme-image" :style="{background: getBackgroundUrl(theme.imageUrl)}">
            </div>
            <div class="theme-info">
              <h3>
                {{theme.name}}
              </h3>
            </div>
          </div>
        </b-colxx> -->
      <!-- </b-row> -->
    </div>
    <div class="detail-section h-100" v-else>
      <blank-template v-if="selectedTheme.key === 'blank'" @show-all="onShowAllThemes()"></blank-template>
      <shea-template v-if="selectedTheme.key === 'shea'" @show-all="onShowAllThemes()"></shea-template>
      <hevea-template v-if="selectedTheme.key === 'hevea'"  @show-all="onShowAllThemes()"></hevea-template>
      <smart-agriculture-template v-if="selectedTheme.key === 'smart_agriculture'"  @show-all="onShowAllThemes()"></smart-agriculture-template>
    </div>
    <new-dashboard-modal ref="newDashboardModal" @create-dashboard="onCreateDashboard"></new-dashboard-modal>
    <coming-soon-modal ref="comingSoonModal"></coming-soon-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import blankTemplate from './../blankTemplate'
import sheaTemplate from './../sheaTemplate'
import heveaTemplate from './../heveaTemplate'
import smartAgricultureTemplate from './../smartAgricultureTemplate'
import newDashboardModal from './../newDashboardModal'
import comingSoonModal from './../comingSoonModal'
import dashboardService from '@/services/dashboard.service'

export default {
  components: {
    sheaTemplate,
    heveaTemplate,
    smartAgricultureTemplate,
    blankTemplate,
    newDashboardModal,
    comingSoonModal
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
    ...mapActions(['hideAppSidebar', 'showAppSidebar', 'setDashboard', 'setPanel', 'selectTheme']),
    getBackgroundUrl (url) {
      return 'url(' + url + ')'
    },
    openNewDashboardModal (theme) {
      if (theme.key === 'blank') {
        this.selectTheme(theme)
        this.$refs['newDashboardModal'].$refs['dashboardModal'].show()
      } else {
        this.$refs['comingSoonModal'].$refs['comingSoonModal'].show()
      }
    },
    onCreateDashboard (name) {
      let params = { name: name, settings: {}, widget_layouts: {} }
      let config = { orgId: this.currentUser.org.id }

      dashboardService.create(config, params)
        .then((dashboard) => {
          this.setDashboard(dashboard)
          this.setPanel(dashboard.panels[0])
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
    },
    onShowAllThemes () {
      this.showAllThemes = true
      this.showAppSidebar('Dashboards')
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
  .grid.dashboards-grid {
    margin-left: 0;
    margin-right: 0;
    margin-top: 40px;
    .grid-item {
      display: flex;
      flex-direction: column;
      padding: 0;
      justify-content: space-between;
      flex: 0 0 30%;
      width: 30%;
      border-radius: 4px;
      margin-bottom: 30px;
      margin-right: 30px;
      .header {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 15px 0px;
        background: transparent;
        color: white;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        .name {
          font-weight: bold;
          font-size: 16px;
          line-height: 19px;
          color: #44545B;
        }
        .actions {
          height: 30px;
          margin: 0 0 0 auto;
          display: flex;
          .icon {
            width: 30px;
            height: 30px;
            margin-left: 10px;
            cursor: pointer;
            background: white;
            border-radius: 4px;
            padding: 5px;
            &.dustbin {
              background-color: #4c92c3;
            }
          }
        }
      }
      .item-wrap {
        height: 258px;
        background-color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.14902);
        border-radius: 4px;
        position: relative;
        background-size: cover !important;
        background-position: left !important;

        &:hover{
          .overlay{
            opacity: .8;
          }
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        .overlay{
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          width: 100%;
          opacity: 0;
          transition: .5s ease;
          background-color: rgba(0,0,0,0.7);
          border-radius: 10px;
          .actions {
            height: 100%;
            display: flex;
            justify-content: flex-end;
            .icon {
              width: 25px;
              height: 25px;
              cursor: pointer;
              margin: 15px;
              padding: 4px;
              border-radius: 4px;
              &:hover {
                background-color: #3576AB;
                path {
                  stroke: #000;
                }
              }
            }
          }
        }
      }
      .info-wrap {
        height: 90px;
        padding: 20px;
        .info {
          display: flex;
          font-size: 14px;
          .title {
            width: 60px;
            font-weight: 700;
              &::after {
              content: ':';
            }
          }
          .value {
            padding-left: 15px;
            &.location {
              text-decoration: underline;
              color: #2aa7ff;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
</style>
