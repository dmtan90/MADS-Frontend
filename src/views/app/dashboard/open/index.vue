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
      <blank-template @show-all="setTheme(null)"></blank-template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dashboardGrid from './dashboardGrid'
import dashboardService from '@/services/dashboard.service'
import blankTemplate from './../blankTemplate'

export default {
  components: {
    dashboardGrid,
    blankTemplate
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
      viewType: this.source ? 'grid' : 'list'
    }
  },
  methods: {
    ...mapActions(['hideAppSidebar', 'showAppSidebar', 'setDashboard']),
    loadDashboards () {
      let config = { orgId: this.currentUser.org.id, projectId: 1 }

      dashboardService.read(config)
        .then((response) => {
          this.dashboards = response.dashboards
        })
    },
    loadDashboard (id) {
      let config = { orgId: this.currentUser.org.id, projectId: 1, id: id }

      dashboardService.readId(config)
        .then((response) => {
          this.setDashboard(response)
        })
    },
    onSelectDashboard (dashboard) {
      this.showAllDashboards = false
      this.loadDashboard(dashboard.id)
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadDashboards()
  },
  beforeDestroy () {
    this.showAppSidebar('Dashboards')
  }
}
</script>

<style lang="scss" scoped>
  .dashboards {
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
    width: 90%;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
  }
</style>
