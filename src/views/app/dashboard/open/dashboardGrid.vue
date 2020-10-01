<template>
  <div>
    <!-- <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search dashboard"></b-form-input>
      </div>
    </div> -->
    <div class="grid dashboards-grid row">
      <div class="col-md-4 grid-item" v-for="(dashboard, index) in dashboards" :key="index">
        <div class="img-wrap" @click="selectDashboard(dashboard)">
          <img :src="dashboard.imageUrl" alt="" v-if="dashboard.imageUrl">
          <img src="/assets/img/historian.png" alt="" v-if="dashboard.name === 'Smart IoT Pole Demo (Historian)'">
          <img src="/assets/img/overview.png" alt="" v-if="dashboard.name === 'Smart IoT Pole Demo (Overview)'">
          <div class="overlay">
             <div class="actions" v-if="!dashboard.dummy">
              <svg class="icon dustbin" @click="deleteDashboard(dashboard)">
                <use xlink:href="/assets/img/mads-common-icons.svg#dustbin"></use>
              </svg>
            </div>
          </div>
        </div>
        <div class="header">
          <span class="name">{{dashboard.name}}</span>
          <!-- <div class="actions" v-if="!dashboard.dummy">
            <svg class="icon dustbin" @click="deleteDashboard(dashboard)">
              <use xlink:href="/assets/img/mads-common-icons.svg#dustbin"></use>
            </svg>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dashboardService from '@/services/dashboard.service'
import DashboardEventBus from './../dashboardBus'

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
      let loader = this.$loading.show()

      let config = { orgId: this.currentUser.org.id, id: dashboard.id }
      dashboardService.delete(config)
        .then((response) => {
          DashboardEventBus.$emit('reload-dashboards')
          loader.hide()
        })
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
    ...mapGetters(['currentUser'])
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
      .img-wrap {
        height: 258px;
        background-color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.14902);
        border-radius: 10px;
        position: relative;
        &:hover{
          .overlay{
            opacity: 1;
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
          background-color: #3e42449c;
          border-radius: 10px;
          .actions {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .icon {
              width: 30px;
              height: 30px;
              cursor: pointer;
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
