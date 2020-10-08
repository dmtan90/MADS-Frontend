<template>
  <div class="h-100">
    <div class="dashboards" v-if="showAllDashboards">
      <h2 class="page-heading">Hello Sumanta, you have {{dashboards.length}} Dashboards</h2>
      <div class="view-header">
        <ul class="nav nav-tabs">
          <li class="active">Active ({{dashboards.length}})</li>
          <li class="" v-if="!source">Archived (0)</li>
        </ul>
      </div>
      <dashboard-grid :dashboards="dashboards" :source="source" @select-dashboard="onSelectDashboard"></dashboard-grid>
    </div>
    <div class="detail-section h-100" v-else>
      <blank-template v-if="!selectedDashboard.dummy" @show-all="onShowAllDashboards"></blank-template>
      <div v-else class="h-100">
        <shea-template v-if="selectedDashboard.key === 'shea'" @show-all="onShowAllDashboards()"></shea-template>
        <hevea-template v-if="selectedDashboard.key === 'hevea'"  @show-all="onShowAllDashboards()"></hevea-template>
        <smart-agriculture-template v-if="selectedDashboard.key === 'smart_agriculture'"  @show-all="onShowAllDashboards()"></smart-agriculture-template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dashboardGrid from './dashboardGrid'
import dashboardService from '@/services/dashboard.service'
import blankTemplate from './../blankTemplate'
import sheaTemplate from './../sheaTemplate'
import heveaTemplate from './../heveaTemplate'
import smartAgricultureTemplate from './../smartAgricultureTemplate'
import DashboardEventBus from './../dashboardBus'

export default {
  components: {
    dashboardGrid,
    blankTemplate,
    sheaTemplate,
    smartAgricultureTemplate,
    heveaTemplate
  },
  props: {
    source: {
      default: null
    }
  },
  data () {
    return {
      templates: [],
      dashboards: [],
      showAllDashboards: true,
      viewType: this.source ? 'grid' : 'list',
      selectedDashboard: {}
    }
  },
  methods: {
    ...mapActions(['hideAppSidebar', 'showAppSidebar', 'setDashboard', 'setPanel']),
    loadDashboards () {
      let config = { orgId: this.currentUser.org.id }

      dashboardService.read(config)
        .then((response) => {
          this.dashboards = response.dashboards

          this.dashboards = this.$_.concat(this.dashboards, [
            {
              name: 'Shea',
              key: 'shea',
              imageUrl: '/assets/img/shea.png',
              dummy: true
            },
            {
              name: 'Hevea',
              key: 'hevea',
              imageUrl: '/assets/img/hevea.png',
              dummy: true
            },
            {
              name: 'Smart Agriculture',
              key: 'smart_agriculture',
              imageUrl: '/assets/img/smart_agriculture.png',
              dummy: true
            }
          ])
        })
    },
    loadDashboard (id) {
      let loader = this.$loading.show()
      let config = { orgId: this.currentUser.org.id, id: id }

      dashboardService.readId(config)
        .then((dashboard) => {
          this.setDashboard(dashboard)
          this.setPanel(dashboard.panels[0])
          DashboardEventBus.$emit('reload-dashboard-panel')
          loader.hide()
        })
    },
    onSelectDashboard (dashboard) {
      this.selectedDashboard = dashboard
      this.showAllDashboards = false

      if (!dashboard.dummy) {
        this.loadDashboard(dashboard.id)
      }
    },
    onShowAllDashboards () {
      this.showAllDashboards = true
      this.showAppSidebar('Dashboards')
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadDashboards()

    DashboardEventBus.$on('reload-dashboards', () => {
      this.loadDashboards()
    })
  },
  beforeDestroy () {
    this.showAppSidebar('Dashboards')
    DashboardEventBus.$off()
  }
}
</script>

<style lang="scss" scoped>
  .dashboards {
    background-color: transparent !important;
    .page-heading {
      color: #3e4956;
      margin-bottom: 20px;
    }
    .view-header {
      display: flex;
      align-items: flex-end;
      .nav {
        display: inline-flex;
        font-size: 13px;
        li {
          color: #79899d;
          min-width: 90px;
          height: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        li.active {
          color: #2aa7ff;
          box-shadow: inset 0 -2px 0 #2aa7ff;
        }
      }
      .template-view {
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        margin: 0 0 0 auto;
        height: 36px;
        display: flex;
        align-items: center;
        .icon {
          cursor: pointer;
          fill: #79899d;
          &.grid {
            width: 40px;
            height: 34px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            padding: 4px;
          }
          &.list {
            width: 40px;
            height: 34px;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            padding: 7px;
          }
          &.active {
            fill: #ffffff;
            background: #FFA07A;
          }
        }
      }
    }
    width: 95%;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
  }
</style>
