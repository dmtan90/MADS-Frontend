<template>
  <div class="theme-container" id="screenshot-wrap">
    <sidebar ref="sidebar" @select-panel="onSelectDashboardPanel" @go-back="onGoBack" :viewMode="viewMode"></sidebar>
    <div class="content-wrap">
      <dashboard-header @on-change-mode="onChangeMode" @save-dashboard-panel="onSaveDashboardPanel" @capture-dashboard="captureDashboard" :viewMode="viewMode"></dashboard-header>
      <div class="widgets-wrap" :style="{'background-color': getDashboardBackgroundColor()}">
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
                :margin="[10, 18]"
                :use-css-transforms="true"
            >
                <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
                  <div class="header">
                    <div class="actions" :class="{'single': item.type === 'command_widget'}" v-if="isEditMode">
                      <svg class="icon pencil" v-if="(item.type !== 'command_widget')" @click="editWidget(item)">
                        <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
                      </svg>
                      <svg class="icon dustbin" @click="(item.type === 'command_widget') ? deleteCommandWidget(item) : deleteWidget(item)">
                        <use xlink:href="/assets/img/mads-common-icons.svg#dustbin"></use>
                      </svg>
                    </div>
                    <div class="actions single" v-if="item.type === 'highcharts' && !isEditMode">
                      <svg class="icon clock" @click="openRealtimeHistoricalSettings(item.i)">
                        <use xlink:href="/assets/img/mads-common-icons.svg#clock"></use>
                      </svg>
                    </div>
                  </div>
                  <command-widget v-if="item.type === 'command_widget'" :commandWidgetObject="commandWidgetObject" :item="item"></command-widget>
                  <div v-if="item.type === 'highcharts'">
                    <widget
                      :ref="'higchartWidget' + widgetObject[item.i].id"
                      :visualProperties="getVisualProperties(item)"
                      :series="getSeries(item)"
                      :widgetId="getWidgetId(item)"
                      :category="widgetObject[item.i].widget_category[0]"
                      :page="'dashboard'"
                      :colWidth="colWidth"
                      :colHeight="colHeight"
                      :cols="item.w"
                      :rows="item.h"
                      :widgetKey="widgetObject[item.i].key">
                    </widget>
                  </div>
                  <static-card-widget v-if="item.type === 'static_card'" :widget="widgetObject[item.i]"></static-card-widget>
                  <image-card-widget v-if="item.type === 'image_card'" :widget="widgetObject[item.i]"></image-card-widget>
                  <dynamic-card-widget v-if="item.type === 'dynamic_card'" :widget="widgetObject[item.i]"></dynamic-card-widget>
                </grid-item>
            </grid-layout>
        </div>
      </div>
    </div>
    <edit-widget ref="editWidget"></edit-widget>
    <realtime-historical-settings ref="widgetRealTimeHistoricalSettings" :entityType="'widget'" @set-realtime-historical-settings="setRealtimeHistoricalSettings"></realtime-historical-settings>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dashboardHeader from './../dashboardHeader'
import widget from './../../shared/widgets/highChart'
import VueGridLayout from 'vue-grid-layout'
import dasbhoardEventBus from './../dashboardBus'
import dashboardService from '@/services/dashboard.service'
import editWidget from './../addEditWidget'
import sidebar from './sidebar'
import realtimeHistoricalSettings from './../dashboardSettings/realTimeHistoricalSettings'
import commandWidget from './commandWidget'
import staticCardWidget from './staticCardWidget'
import imageCardWidget from './imageCardWidget'
import dynamicCardWidget from './dynamicCardWidget'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'

export default {
  components: {
    dashboardHeader,
    widget,
    editWidget,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    sidebar,
    realtimeHistoricalSettings,
    commandWidget,
    staticCardWidget,
    imageCardWidget,
    dynamicCardWidget
  },
  props: {
    viewMode: {
      default: false
    }
  },
  data () {
    return {
      widgetObject: {},
      commandWidgetObject: {},
      series: [],
      isEditMode: false,
      layout: [],
      dummyLayout: [
        { 'x': 0, 'y': 0, 'w': 1, 'h': 1, 'i': '0' }
      ],
      commandWidgetLayout: [{ 'x': 0, 'y': 0, 'w': 6, 'h': 6, 'i': '0' }],
      colWidth: 75,
      colHeight: 50,
      showLayout: false,
      realTimeHistoricalSettings: {},
      realTimeHistoricalSelectedWidget: null,
      realtimeIntervals: {}
    }
  },
  methods: {
    ...mapActions(['setDashboard', 'setPanel']),
    getUniqueKey () {
      let result = ''
      let characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
      let charactersLength = characters.length
      for (var i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    onGoBack () {
      this.$emit('show-all')
    },
    onChangeMode (mode) {
      if (mode === 'edit') {
        this.isEditMode = true
      } else {
        this.isEditMode = false
      }
    },
    getVisualProperties (item) {
      return this.widgetObject[item.i].visual_properties
    },
    getSeries (item) {
      return this.widgetObject[item.i].series
    },
    getWidgetId (item) {
      return this.widgetObject[item.i].uuid
    },
    getDashboardBackgroundColor () {
      return (this.selectedDashboard && this.selectedDashboard.settings) ? this.selectedDashboard.settings['background_color'] : '#ffffff'
    },
    onSelectDashboardPanel (panel) {
      if (this.viewMode) {
        this.loadExportedDashboardPanel(panel)
      } else {
        this.loadDashboardPanel(panel)
      }
    },
    loadDashboardPanel (panel) {
      let loader = this.$loading.show()
      let config = { orgId: this.currentUser.org.id, dashboardId: this.selectedDashboard.id, id: panel.id }

      this.$_.forEach(this.realtimeIntervals, (interval) => {
        clearInterval(interval)
      })

      dashboardService
        .loadDashboardPanel(config)
        .then((panel) => {
          this.setPanel(panel)
          let widgets = panel.widgets

          let isRealtimePanel = panel.filter_metadata.type === 'realtime'

          this.$_.forEach(widgets, (widget) => {
            this.widgetObject[widget.id] = this.$_.merge({}, widget, { key: this.getUniqueKey() })
          })

          if (isRealtimePanel) {
            this.$_.forEach(widgets, (widget) => {
              if (this.$_.includes(['chart', 'stock_chart'], widget.widget_category[0])) {
                this.setRealtimeHistoricalSettings(panel.filter_metadata, widget.id)
              }
            })
          }

          let commandWidgets = panel.command_widgets

          this.$_.forEach(commandWidgets, (widget) => {
            this.$_.forEach(widget.data_settings, (setting) => {
              if (setting.html_type === 'color') {
                if (setting.value) {
                  setting.value = this.rgbToHex(setting.value[0], setting.value[1], setting.value[2])
                } else {
                  setting.value = '#000000'
                }
              }
              if (setting.html_tag === 'select') {
                setting.value = setting.value || setting.default
              }
            })
            this.commandWidgetObject[widget.id] = widget
          })

          let widgetLayots = panel.widget_layouts || {}

          this.layout = this.$_.map(widgetLayots, (setting, id) => {
            return this.$_.merge(setting, { i: id })
          })

          loader.hide()
        })
    },
    loadExportedDashboardPanel (panel) {
      let loader = this.$loading.show()

      let dashboardToken = localStorage.getItem('dashboard_token')
      let dashboardUUID = localStorage.getItem('dashboard_uuid')

      let config = this.$_.merge({}, { uuid: dashboardUUID, id: panel.id })
      let params = { token: dashboardToken }

      dashboardService.fetchExportedDashboardPanels(config, params)
        .then((panel) => {
          this.setPanel(panel)
          let widgets = panel.widgets

          this.$_.forEach(widgets, (widget) => {
            this.widgetObject[widget.id] = widget
          })

          let commandWidgets = panel.command_widgets

          this.$_.forEach(commandWidgets, (widget) => {
            this.$_.forEach(widget.data_settings, (setting) => {
              if (setting.html_type === 'color') {
                if (setting.value) {
                  setting.value = this.rgbToHex(setting.value[0], setting.value[1], setting.value[2])
                } else {
                  setting.value = '#000000'
                }
              }
              if (setting.html_tag === 'select') {
                setting.value = setting.value || setting.default
              }
            })
            this.commandWidgetObject[widget.id] = widget
          })

          let widgetLayots = panel.widget_layouts || {}

          this.layout = this.$_.map(widgetLayots, (setting, id) => {
            return this.$_.merge(setting, { i: id })
          })

          loader.hide()
        })
    },
    onSaveDashboardPanel (name) {
      let loader = this.$loading.show()

      this.isEditMode = false
      let widgetLayots = {}

      this.$_.forEach(this.layout, (item) => {
        widgetLayots[item.i] = item
      })

      let params = {
        widget_layouts: widgetLayots
      }
      let config = { orgId: this.currentUser.org.id, dashboardId: this.selectedDashboard.id, id: this.selectedPanel.id }

      dashboardService.updateDashboardPanel(config, params)
        .then((response) => {
          loader.hide()
        })
    },
    updateDashboardPanel (item) {
      let widgetLayots = this.selectedPanel.widget_layouts
      delete widgetLayots[item.i]

      let params = { widget_layouts: widgetLayots }
      let config = { orgId: this.currentUser.org.id, dashboardId: this.selectedDashboard.id, id: this.selectedPanel.id }

      dashboardService.updateDashboardPanel(config, params)
        .then((response) => {
          this.loadDashboardPanel(this.selectedPanel)
        })
    },
    reloadSelectedDasbhoard () {
      let config = { orgId: this.currentUser.org.id, id: this.selectedDashboard.id }

      dashboardService.readId(config)
        .then((response) => {
          this.setDashboard(response)
        })
    },
    deleteWidget (item) {
      let loader = this.$loading.show()

      let widgetInstanceId = this.widgetObject[item.i].id
      let widgetId = this.widgetObject[item.i].widget_id

      if (this.realtimeIntervals[widgetId]) {
        clearInterval(this.realtimeIntervals[widgetId])
      }

      let config = { orgId: this.currentUser.org.id, panelId: this.selectedPanel.id, widgetId, id: widgetInstanceId }

      dashboardService.deleteWidgetInstance(config)
        .then((response) => {
          loader.hide()
          this.updateDashboardPanel(item)
        })
    },
    editWidget (item) {
      let widget = this.widgetObject[item.i]
      this.$refs.editWidget.edit(widget)
    },
    hexToRgb (hex) {
      return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16))
    },
    rgbToHex (r, g, b) {
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    },
    deleteCommandWidget (item) {
      let widgetId = this.commandWidgetObject[item.i].id

      let loader = this.$loading.show()

      let config = { orgId: this.currentUser.org.id, panelId: this.selectedPanel.id, id: widgetId }

      dashboardService.updateCommandWidget(config)
        .then((response) => {
          loader.hide()
          this.updateDashboardPanel(item)
        })
    },
    openRealtimeHistoricalSettings (widgetId) {
      this.realTimeHistoricalSelectedWidget = widgetId
      this.$refs.widgetRealTimeHistoricalSettings.open(this.realTimeHistoricalSettings[this.realTimeHistoricalSelectedWidget])
    },
    setRealtimeHistoricalSettings (params, selectedWidget = null) {
      let widgetId = selectedWidget || this.realTimeHistoricalSelectedWidget
      let widgetObject = this.widgetObject[widgetId]
      this.realTimeHistoricalSettings[widgetId] = params
      this.realTimeHistoricalSelectedWidget = null

      if (this.realtimeIntervals[widgetId]) {
        clearInterval(this.realtimeIntervals[widgetId])
      }

      let isRealtimePanel = params.type === 'realtime'

      let realtimeDuration = 0

      if (isRealtimePanel) {
        if (params.group_interval_type === 'second') {
          realtimeDuration = params.group_interval * 1000
        } else if (params.group_interval_type === 'minute') {
          realtimeDuration = params.group_interval * 60 * 1000
        }
      }

      if (!selectedWidget) {
        this.loadWidgetInstanceData(widgetObject, params)
      }

      if (isRealtimePanel) {
        this.realtimeIntervals[widgetId] = setInterval(() => {
          let fromDate = this.$moment(parseInt(params.to_date)).add(1, 'milliseconds')
          let toDate = this.$moment(parseInt(params.to_date)).add(realtimeDuration, 'milliseconds')
          params = this.$_.merge({}, params, { from_date: fromDate.format('x'), to_date: toDate.format('x') })
          this.loadWidgetInstanceData(widgetObject, params, true)
        }, realtimeDuration)
      }
    },
    findGridItemWidth () {
      this.colWidth = this.$refs.dummyGridItem[0].$el.offsetWidth
      document.getElementById('dummy-layout').remove()
      this.showLayout = true
    },
    loadWidgetInstanceData (widgetObject, params, realtime = false) {
      let config = { orgId: this.currentUser.org.id, panelId: this.selectedPanel.id, widgetId: widgetObject.widget_id, id: widgetObject.id }

      dashboardService.readWidgetInstance(config, params)
        .then((widgetInstance) => {
          if (realtime) {
            let dataPoint = widgetInstance.series[0].data[0]
            let widgetInstanceRef = 'higchartWidget' + widgetInstance.id
            if (dataPoint) {
              this.$refs[widgetInstanceRef][0].addDataPoint(dataPoint)
            }
          } else {
            this.widgetObject[widgetInstance.id] = this.$_.merge({}, widgetInstance, { key: this.getUniqueKey() })
            let layout = this.layout
            this.layout = []
            this.layout = layout
          }
        })
    },
    captureDashboard () {
      let element = document.getElementById('screenshot-wrap')

      html2canvas(element).then(function (canvas) {
        // Export canvas as a blob
        canvas.toBlob(function (blob) {
        // Generate file download
          saveAs(blob, 'blank_template.png')
        })
      })
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedDashboard', 'selectedPanel'])
  },
  mounted () {
    if (!this.viewMode) {
      setTimeout(() => {
        this.findGridItemWidth()
      }, 100)
    }

    dasbhoardEventBus.$on('reload-dashboard', () => {
      this.reloadSelectedDasbhoard()
    })

    dasbhoardEventBus.$on('reload-dashboard-panel', () => {
      this.loadDashboardPanel(this.selectedPanel)
    })
  },
  beforeDestroy () {
    dasbhoardEventBus.$off()
    this.$_.forEach(this.realtimeIntervals, (interval) => {
      clearInterval(interval)
    })
  }
}
</script>

<style lang="scss" scoped>
  .theme-container {
    display: flex;
    height: 100%;
    .content-wrap {
      width: calc(100% - 150px);
      overflow: auto;
      background-color: #ffffff;
      position: relative;
      .widgets-wrap {
        width: 100%;
        height: calc(100% - 60px);
        padding: 0 5px 20px;
        overflow: auto;
        .vue-grid-layout {
          .vue-grid-item {
            background-color: white;
            box-shadow: 0 1px 4px 0 rgba(21,27,38,.08);
            .header {
              height: 28px;
              background-color: white;
              position: relative;
              .actions {
                position: absolute;
                width: 65px;
                height: 28px;
                right: 6px;
                top: 6px;
                z-index: 99;
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                .icon {
                  fill: white;
                  width: 28px;
                  height: 28px;
                  padding: 5px;
                  border-radius: 20px;
                  cursor: pointer;
                  &:last-child {
                    border-right: none;
                  }
                  &.pencil {
                    background-color: #9BCCE5;
                  }
                  &.dustbin {
                    background-color: #27AAE1;
                  }
                  &.clock {
                    background-color: #4A505C;
                  }
                }
                &.single {
                  width: 40px;
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

<style lang="scss">
  .select-wrap {
    label {
      text-transform: capitalize;
      font-size: 14px;
      color: #6D6E71;
    }
  }
</style>
