<template>
  <div class="theme-container">
    <sidebar ref="sidebar" @select-panel="loadDashboardPanel" @go-back="onGoBack"></sidebar>
    <div class="content-wrap">
      <dashboard-header @on-change-mode="onChangeMode" @save-dashboard-panel="onSaveDashboardPanel"></dashboard-header>
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
                :margin="[20, 20]"
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
                  <div v-if="item.type === 'command_widget'" class="command-widget-wrap">
                    <h2>{{commandWidgetObject[item.i].label}}</h2>
                    <div v-for="(setting, key) in getCommandDataSettings(item)" :key="key" class="command-widget">
                      <div v-if="setting.html_type === 'range'" class="range-wrap setting-wrap">
                        <div class="label-wrap">
                          <h2>{{ $_.replace(key, '_', ' ') }}</h2>
                          <div>
                            <span class="text">Value:</span>
                            <span class="value">{{ setting.value }}</span>
                          </div>
                        </div>
                        <b-form-input v-model="setting.value" type="range" :min="setting.min" :max="setting.max" step="0.5"></b-form-input>
                      </div>
                      <div v-if="setting.html_type === 'color'" class="setting-wrap">
                        <div class="label-wrap">
                          <h2>{{ $_.replace(key, '_', ' ') }}</h2>
                        </div>
                        <div class="color-wrap">
                          <span>{{ setting.value || '#000000'}}</span>
                          <b-form-input v-model="setting.value" type="color"></b-form-input>
                        </div>
                      </div>
                      <div v-if="setting.html_tag === 'select'" class="select-wrap">
                        <div class="label-wrap">
                          <h2>{{ $_.replace(key, '_', ' ') }}</h2>
                        </div>
                        <b-form-radio-group v-model="setting.value">
                          <b-form-radio :value="value" v-for="(value, key) in setting.source" :key="key">{{ key }}</b-form-radio>
                        </b-form-radio-group>
                      </div>
                    </div>
                    <div class="btn-wrap">
                      <b-button class="btn" @click="updateCommandWidget(commandWidgetObject[item.i])">Apply</b-button>
                    </div>
                  </div>
                  <div v-else>
                    <widget
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

export default {
  components: {
    dashboardHeader,
    widget,
    editWidget,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    sidebar,
    realtimeHistoricalSettings
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
      realTimeHistoricalSelectedWidget: null
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
    getCommandDataSettings (item) {
      return this.commandWidgetObject[item.i].data_settings
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
      return this.selectedDashboard.settings ? this.selectedDashboard.settings['background_color'] : '#ffffff'
    },
    loadDashboardPanel (panel) {
      let loader = this.$loading.show()
      let config = { orgId: this.currentUser.org.id, dashboardId: this.selectedDashboard.id, id: panel.id }

      dashboardService
        .loadDashboardPanel(config)
        .then((panel) => {
          this.setPanel(panel)
          let widgets = panel.widgets

          this.$_.forEach(widgets, (widget) => {
            this.widgetObject[widget.id] = this.$_.merge({}, widget, { key: this.getUniqueKey() })
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
    updateCommandWidget (widget) {
      let loader = this.$loading.show()

      let config = { orgId: this.currentUser.org.id, panelId: this.selectedPanel.id, id: widget.id }

      let dataSettings = this.$_.merge({}, widget.data_settings)

      this.$_.forEach(dataSettings, (setting) => {
        if (setting.html_type === 'color') {
          setting.value = this.hexToRgb(setting.value)
        }
      })

      let params = {
        data_settings: dataSettings
      }
      dashboardService.updateCommandWidget(config, params)
        .then((response) => {
          loader.hide()
        })
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
    setRealtimeHistoricalSettings (params) {
      let widgetObject = this.widgetObject[this.realTimeHistoricalSelectedWidget]
      this.realTimeHistoricalSettings[this.realTimeHistoricalSelectedWidget] = params

      let config = { orgId: this.currentUser.org.id, panelId: this.selectedPanel.id, widgetId: widgetObject.widget_id, id: widgetObject.id }

      dashboardService.readWidgetInstance(config, params)
        .then((widgetInstance) => {
          this.widgetObject[widgetInstance.id] = this.$_.merge({}, widgetInstance, { key: this.getUniqueKey() })
          let layout = this.layout
          this.layout = []
          this.layout = layout
        })

      this.realTimeHistoricalSelectedWidget = null
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedDashboard', 'selectedPanel'])
  },
  mounted () {
    setTimeout(() => {
      this.colWidth = this.$refs.dummyGridItem[0].$el.offsetWidth
      document.getElementById('dummy-layout').remove()
      this.showLayout = true
    }, 100)

    dasbhoardEventBus.$on('reload-dashboard', () => {
      this.reloadSelectedDasbhoard()
    })

    dasbhoardEventBus.$on('reload-dashboard-panel', () => {
      this.loadDashboardPanel(this.selectedPanel)
    })
  },
  beforeDestroy () {
    dasbhoardEventBus.$off()
  }
}
</script>

<style lang="scss" scoped>
  .theme-container {
    display: flex;
    height: 100%;
    .content-wrap {
      width: calc(100% - 180px);
      overflow: auto;
      background-color: #ffffff;
      position: relative;
      .widgets-wrap {
        width: 100%;
        height: calc(100% - 60px);
        padding: 10px;
        overflow: auto;
        // background-color: #f2f2f2;
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
            .command-widget-wrap {
              padding: 20px;
              overflow: auto;
              height: 100%;
              > h2 {
                margin-bottom: 40px;
                font-size: 18px;
                font-weight: bold;
                color: #000000;
              }
              .command-widget {
                margin-bottom: 22px;
                .setting-wrap {
                  display: flex;
                  align-items: center;
                  .label-wrap {
                    width: 100px;
                    h2 {
                      font-size: 16px;
                      color: #000000;
                      margin-bottom: 0;
                      text-transform: capitalize;
                    }
                    .text {
                      color: #6D6E71;
                      font-size: 13px;
                      padding-top: 4px;
                      display: inline-block;
                    }
                    .value {
                      color: #4292D4;
                      font-size: 13px;
                      font-weight: bold;
                    }
                  }
                  input {
                    width: calc(100% - 100px);
                  }
                }
                .color-wrap {
                  display: flex;
                  align-items: center;
                  justify-content: space-evenly;
                  background-color: #F3F7FB;
                  width: 120px;
                  height: 45px;
                  border-radius: 4px;
                  span {
                    display: inline-block;
                    color: #303033;
                    width: 60px;
                    text-transform: uppercase;
                  }
                  input {
                    border: none;
                    width: 35px;
                    height: 38px;
                    cursor: pointer;
                    padding: 0;
                    background-color: #F3F7FB !important;
                  }
                }
                .select-wrap {
                  .label-wrap {
                    margin-bottom: 10px;
                  }
                  h2 {
                    font-size: 16px;
                    color: #000000;
                    margin-bottom: 0;
                    text-transform: capitalize;
                  }
                }
              }
              .btn-wrap {
                .btn {
                  background-color: #27AAE1 !important;
                  color: white !important;
                  border: 1px solid #27AAE1 !important;
                  font-size: 13px;
                  height: 45px;
                  padding: 0 10px;
                  width: 180px;
                  text-transform: uppercase;
                  margin-top: 20px;
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
