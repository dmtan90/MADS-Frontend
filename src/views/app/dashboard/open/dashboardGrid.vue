<template>
  <div>
    <!-- <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search dashboard"></b-form-input>
      </div>
    </div> -->
    <div class="grid dashboards-grid row">
      <div class="col-md-4 grid-item" v-for="(dashboard, index) in dashboards" :key="index" @click="selectDashboard(dashboard)">
        <div class="header">
          <span class="name">{{dashboard.name}}</span>
        </div>
        <div class="img-wrap">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-app-icons.svg#mads-dashboard"></use>
          </svg>
        </div>
        <!-- <div class="info-wrap">
          <div class="info">
            <span class="title">Manager</span>
            <span class="value">{{renderUserName(dashboard.leads)}}</span>
          </div>
          <div class="info">
            <span class="title">Members</span>
            <span class="value">{{renderUserName(dashboard.users)}}</span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    dashboards: {
      type: Array,
      default: () => {
        return []
      }
    },
    source: {
      type: String,
      default: null
    }
  },
  components: {
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    ...mapActions(['hideAppSidebar', 'setDashboard']),
    renderUserName (users) {
      users = this.$_.map(users, (user) => {
        return user.first_name
      })
      return this.$_.join(users, ', ')
    },
    addDashboard (dashboard) {
      this.$refs.addEditDashboard.add()
    },
    editDashboard (dashboard) {
      this.$refs.addEditDashboard.edit(dashboard)
    },
    deleteDashboard (dashboard) {
      // let config = { orgId: this.currentUser.org.id, dashboardId: 1, id: dashboard.id }
      // dashboardService.delete(config)
      //   .then((response) => {
      //     DashboardEventBus.$emit('reload-dashboards')
      //   })
    },
    getBackgroundUrl (url) {
      return 'url(' + url + ')'
    },
    selectDashboard (dashboard) {
      this.setDashboard(dashboard)
      this.hideAppSidebar('Dashboards')
      this.$emit('select-dashboard', dashboard)
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
  .table-options {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .search-box {
      input {
        border-radius: 20px;
        width: 500px;
      }
    }
    .role-filter {
      margin-left: 20px;
      position: relative;
      width: 120px;
      label {
        position: absolute;
        left: 0;
        top: -20px;
      }
    }
    .add-dashboard {
      margin: 0 0 0 auto;
    }
  }
  .dashboards-table {
    margin-top: 30px;
    .edit-dashboard, .delete-dashboard {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
  .grid.dashboards-grid {
    margin-left: 0;
    margin-right: 0;
    margin-top: 40px;
    .grid-item {
      display: flex;
      flex-direction: column;
      height: 310px;
      padding: 0;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.14902);
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
        padding: 10px;
        background: #4c92c3;
        color: white;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        .name {
          font-size: 16px;
        }
        .actions {
          height: 24px;
          margin: 0 0 0 auto;
          display: flex;
          .icon {
            width: 24px;
            height: 24px;
            fill: #FFA07A;
            margin-left: 10px;
            cursor: pointer;
            background: white;
            border-radius: 4px;
            padding: 5px;
          }
        }
      }
      .img-wrap {
        height: 270px;
        background-color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
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
