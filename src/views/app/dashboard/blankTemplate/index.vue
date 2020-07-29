<template>
  <div class="theme-container">
    <div class="sidebar">
      <div class="sidebar-background"></div>
      <div class="sidebar-menu">
        <ul>
          <!-- <li :class="{'active': selectedTab === 'dashboard'}" @click="selectedTab = 'dashboard'">
            Dashboard
          </li>
          <li :class="{'active': selectedTab === 'data_history'}" @click="selectedTab = 'data_history'">
            Process Data History
          </li> -->
        </ul>
        <div class="action-btn-group">
          <b-button class="back-btn sidebar-btn" @click="goBack()">
            <svg class="icon back">
              <use xlink:href="/assets/img/mads-common-icons.svg#back"></use>
            </svg>
            <span>Back</span>
          </b-button>
          <b-button class="new-tab-btn sidebar-btn">
            <span>New Tab</span>
            <svg class="icon plus">
              <use xlink:href="/assets/img/mads-common-icons.svg#plus"></use>
            </svg>
          </b-button>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <dashboard-header @on-change-mode="onChangeMode" @save-dashboard="onSaveDashboard"></dashboard-header>
      <div class="widgets-wrap">
        <div class="layout-container" v-if="!showLayout" id="dummy-layout" style="visibility: hidden">
          <grid-layout
                :layout="dummyLayout"
                :col-num="12"
                :row-height="50"
                :is-draggable="true"
                :is-resizable="true"
                :is-mirrored="false"
                :vertical-compact="true"
                :margin="[20, 20]"
                :use-css-transforms="true"
            >
                <grid-item ref="dummyGridItem" v-for="item in dummyLayout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
                  Dummy Layout
                </grid-item>
            </grid-layout>
        </div>
        <div class="layout-container" v-if="showLayout">
            <grid-layout
                :layout.sync="layout"
                :col-num="12"
                :row-height="50"
                :is-draggable="isEditMode"
                :is-resizable="isEditMode"
                :is-mirrored="false"
                :vertical-compact="true"
                :margin="[20, 20]"
                :use-css-transforms="true"
            >
                <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
                    <div class="edit-actions" v-if="isEditMode">
                      <!-- <svg class="icon" @click="editWidget(item)">
                        <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
                      </svg> -->
                      <svg class="icon" @click="deleteWidget(item)">
                        <use xlink:href="/assets/img/mads-common-icons.svg#dustbin"></use>
                      </svg>
                    </div>
                    <widget
                      :visualSettings="getVisualSettings(item)"
                      :series="getSeries(item)"
                      :widgetId="getWidgetId(item)"
                      :page="'dashboard'"
                      :colWidth="colWidth"
                      :colHeight="colHeight"
                      :cols="item.w"
                      :rows="item.h"></widget>
                </grid-item>
            </grid-layout>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dashboardHeader from './../dashboardHeader'
import widget from './../../shared/widgets/highChart'
import VueGridLayout from 'vue-grid-layout'
import dasbhoardEventBus from './../dashboardBus'
import dashboardService from '@/services/dashboard.service'

export default {
  components: {
    dashboardHeader,
    widget,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data () {
    return {
      widgets: [],
      widgetObject: {},
      selectedTab: 'dashboard',
      series: [],
      visualSettings: {},
      isEditMode: false,
      layout: [],
      dummyLayout: [
        { 'x': 0, 'y': 0, 'w': 1, 'h': 1, 'i': '0' }
      ],
      colWidth: 75,
      colHeight: 50,
      showLayout: false
    }
  },
  methods: {
    ...mapActions(['setDashboard']),
    goBack () {
      this.$emit('show-all')
    },
    onChangeMode (mode) {
      if (mode === 'edit') {
        this.isEditMode = true
      } else {
        this.isEditMode = false
      }
    },
    getVisualSettings (item) {
      return this.widgetObject[item.i].visual_properties
    },
    getSeries (item) {
      return this.widgetObject[item.i].series
    },
    getWidgetId (item) {
      return this.widgetObject[item.i].uuid
    },
    onSaveDashboard (name) {
      console.log('layout', this.layout)
      let widgetLayots = {}

      this.$_.forEach(this.layout, (item) => {
        widgetLayots[item.i] = item
      })

      let params = {
        name: name,
        widget_layouts: widgetLayots
      }
      let config = { orgId: this.currentUser.org.id, projectId: 1, id: this.selectedDashboard.id }

      dashboardService.update(config, params)
        .then((response) => {
          this.reloadSelectedDasbhoard()
        })
    },
    updateDashbaord (item) {
      let widgetLayots = this.selectedDashboard.widget_layouts
      delete widgetLayots[item.i]

      let params = { widget_layouts: widgetLayots }
      let config = { orgId: this.currentUser.org.id, projectId: 1, id: this.selectedDashboard.id }

      dashboardService.update(config, params)
        .then((response) => {
          this.reloadSelectedDasbhoard()
        })
    },
    reloadSelectedDasbhoard () {
      let loader = this.$loading.show()
      let config = { orgId: this.currentUser.org.id, projectId: 1, id: this.selectedDashboard.id }

      dashboardService.readId(config)
        .then((response) => {
          this.setDashboard(response)
          loader.hide()
        })
    },
    deleteWidget (item) {
      let widgetInstanceId = this.widgetObject[item.i].id
      let widgetId = this.widgetObject[item.i].widget_id

      let config = { orgId: this.currentUser.org.id, projectId: 1, dashboardId: this.selectedDashboard.id, widgetId, id: widgetInstanceId }

      dashboardService.deleteWidgetInstance(config)
        .then((response) => {
          this.updateDashbaord(item)
        })
    },
    editWidget (item) {
    }
  },
  watch: {
    selectedDashboard (dashboard) {
      this.widgets = dashboard.widgets

      this.$_.forEach(this.widgets, (widget) => {
        this.widgetObject[widget.id] = widget
      })

      let widgetLayots = this.$_.clone(this.selectedDashboard.widget_layouts)

      this.layout = this.$_.map(widgetLayots, (setting, id) => {
        return this.$_.merge(setting, { i: id })
      })
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedDashboard'])
  },
  mounted () {
    setTimeout(() => {
      this.colWidth = this.$refs.dummyGridItem[0].$el.offsetWidth
      document.getElementById('dummy-layout').remove()
      this.showLayout = true
    }, 100)

    dasbhoardEventBus.$on('widget-added', () => {
      this.reloadSelectedDasbhoard()
    })
  }
}
</script>

<style lang="scss" scoped>
  .theme-container {
    display: flex;
    height: 100%;
    .sidebar {
      width: 260px;
      position: relative;
      height: 100%;
      .sidebar-background {
        // background-image: url("https://heveaconnect.herokuapp.com/images/sidebar-backgroundd.jpg");
        z-index: 1;
        top: 0;
        left: 0;
        background-size: cover;
        background-position: 50%;
        position: absolute;
        height: 100%;
        width: 100%;
        display: block;
      }
      .sidebar-menu {
        z-index: 4;
        background-color: rgba(0, 0, 0, 0.8);
        position: relative;
        height: 100%;
        padding: 30px 10px;
        ul {
        list-style: none;
        padding-left: 0;
          li {
            cursor: pointer;
            height: 45px;
            font-size: 15px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            padding-left: 10px;
            color: white;
            &.active {
              background-color: #4a81d4 !important;
            }
          }
        }
        .action-btn-group {
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 10px;
          left: 0;
          justify-content: space-around;
          width: 100%;
          .sidebar-btn {
            height: 40px;
            line-height: 1;
            border-radius: 20px !important;
            display: flex;
            align-items: center;
            font-size: 16px;
            margin: 0;
            padding: 0;
            justify-content: center;
            width: 46%;
            background-color: #4a81d4 !important;
            color: white !important;
            border-color: #4a81d4 !important;
            .icon {
              width: 23px;
              height: 23px;
              fill: white;
              &.back {
                margin-right: 5px;
              }
              &.plus {
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
    .content-wrap {
      width: calc(100% - 260px);
      overflow: auto;
      background-color: #ffffff;
      position: relative;
      .widgets-wrap {
        width: 100%;
        height: 100%;
        padding: 10px;
        .vue-grid-layout {
          .vue-grid-item {
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
            .edit-actions {
              position: absolute;
              width: 40px;
              height: 40px;
              background-color: #4c92c3;
              right: 0;
              top: 0;
              z-index: 99;
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              border-bottom-left-radius: 4px;
              .icon {
                fill: white;
                width: 40px;
                height: 40px;
                padding: 10px;
                border-right: 1px solid white;
                cursor: pointer;
                &:last-child {
                  border-right: none;
                }
              }
            }
          }
        }
      }
    }
  }
  .btn.back-btn {
    margin-bottom: 20px;
    width: 105px;
    height: 10px;
    display: flex;
    align-items: center;
  }
</style>
