<template>
  <div>
    <h3>{{ editMode ? 'Update Widget' : 'Add New Widget' }}</h3>
    <section v-if="selectedSectionIndex === 1" class="select-widget">
      <div class="widgets-section">
        <div class="widgets">
          <b-row v-if="editMode && this.selectedWidget">
            <b-colxx lg="10" md="10" sm="12" xs="12" xxs="12" class="widget">
              <div class="widget-container edit">
                <div class="widget-image">
                  <img :src="this.selectedWidget.image_url" alt="">
                </div>
                <div class="widget-info">
                  <h3>{{this.selectedWidget.label}}</h3>
                </div>
              </div>
            </b-colxx>
          </b-row>
          <div v-else>
            <ul class="widgets-classification">
              <li :class="{'active': selectedClassification === 'timeseries'}" @click="selectClassfication('timeseries')">Timeseries</li>
              <li :class="{'active': selectedClassification === 'latest'}" @click="selectClassfication('latest')">Latest</li>
              <li :class="{'active': selectedClassification === 'standard'}" @click="selectClassfication('standard')">Standard</li>
              <li :class="{'active': selectedClassification === 'command'}" @click="selectClassfication('command')">Control</li>
            </ul>
            <b-row v-if="widgetsLoaded && (selectedClassification !== 'command')">
              <b-colxx lg="4" md="4" sm="6" xs="12" xxs="12" class="widget" v-for="(widget, index) in widgetClassifcation[selectedClassification]" :key="index">
                <div class="widget-container" @click="setSelectedWidget(widget)" :class="{'active': selectedWidget && selectedWidget.id === widget.id}">
                  <div class="widget-image">
                    <img :src="widget.image_url" alt="">
                  </div>
                  <div class="widget-info">
                    <h3>{{widget.label}}</h3>
                  </div>
                </div>
              </b-colxx>
            </b-row>
            <b-row v-else>
              <b-colxx lg="4" md="4" sm="6" xs="12" xxs="12" class="widget" v-for="(widget, index) in commandWidgets" :key="index">
                <div class="widget-container" @click="setCommandWidget(widget)" :class="{'active': selectedWidget && selectedWidget.id === widget.id}">
                  <div class="widget-image">
                    <img :src="widget.image_url" alt="">
                  </div>
                  <div class="widget-info">
                    <h3>{{widget.name}}</h3>
                  </div>
                </div>
              </b-colxx>
            </b-row>
          </div>
        </div>
      </div>
    </section>
    <section v-show="selectedSectionIndex === 2" class="select-data">
      <div class="data-type-section">
        <div class="vue-tree-container" v-if="selectedClassification !== 'command'">
          <mads-tree
            ref="tree"
            :treeView="'file'"
            :treeOptions="treeOptions"
            :hiddenEntities="[]"
            :selectedNodes="selectedNodes"
            :selectableEntities="['SensorParameter']"
            :type="'organization'"
          ></mads-tree>
        </div>
        <div v-else class="gateways-wrap">
          <span>Select Gateway</span>
          <b-form-radio-group v-model="gatewayId">
            <b-form-radio :value="gateway.id" v-for="(gateway, index) in gateways" :key="index">{{ gateway.name }}</b-form-radio>
          </b-form-radio-group>
        </div>
      </div>
    </section>
    <section v-if="selectedSectionIndex === 3" class="settings">
      <div v-if="selectedClassification !== 'command'">
        <div class="widget-category settings-category">
          <span class="category" :class="{'active': selectedSettingsType === 'visualSettings'}" @click="setSettingsType('visualSettings')">Visual Settings</span>
          <span class="category" :class="{'active': selectedSettingsType === 'dataSettings'}" @click="setSettingsType('dataSettings')">Data Settings</span>
        </div>
        <div v-if="selectedSettingsType === 'visualSettings'">
          <div class="visual-settings">
              <settings :settings="visualSettings" :visualProp="visualProp" @on-setting-upate="onVisualSettingsUpdate"></settings>
            </div>
        </div>
        <div v-if="selectedSettingsType === 'dataSettings'">
          <div class="visual-settings">
              <div v-for="(serie, seriesIndex) in selectedDataSeries" :key="seriesIndex" class="settings-wrap">
                <div class="header setting-header">{{serie.name}}</div>
                <div class="setting" v-for="(setting, index) in dataSettings[1].properties" :key="index">
                  <div v-if="setting.key !== 'multiple'">
                    <span class="setting-key">{{setting.key}}</span>
                    <b-form-input v-if="seriesProp[seriesIndex]" :type="dataTypeMap[setting.data_type]" class="setting-input" :class="setting.data_type" v-model="seriesProp[seriesIndex][setting.key]"></b-form-input>
                    <b-form-input v-else :type="dataTypeMap[setting.data_type]" class="setting-input" :class="setting.data_type" v-model="dataSeries[seriesIndex][setting.key]"></b-form-input>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div v-else>
        Predefined Settings
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import madsTree from './../shared/madsTree/index'
import widgetService from '@/services/widget.service'
import orgService from '@/services/organization.service'
import settings from './settings'
import dashboardService from '@/services/dashboard.service'
import dasbhoardEventBus from './dashboardBus'

const dataTypeMap = {
  'string': 'text',
  'boolean': 'checkbox',
  'color': 'color'
}

export default {
  components: {
    madsTree,
    settings
  },
  props: {
    selectedSectionIndex: {
      type: Number,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    },
    widgetData: {
      type: Object
    }
  },
  data () {
    return {
      selectedClassification: 'timeseries',
      selectedWidget: null,
      widgetDetail: null,
      widgetClassifcation: {},
      widgetList: [],
      commandWidgets: [],
      gateways: [],
      gatewayId: null,
      dataSeries: [],
      selectedSettingsType: 'visualSettings',
      selectedDataSeries: [],
      visualSettings: [],
      dataSettings: [],
      dataProp: {},
      visualProp: {},
      seriesProp: [],
      treeOptions: {
        selectable: true,
        singleSelect: false
      },
      dataTypeMap: dataTypeMap,
      selectedNodes: [],
      widgetsLoaded: false
    }
  },
  methods: {
    getUniqueKey () {
      let result = ''
      let characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
      let charactersLength = characters.length
      for (var i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
    selectClassfication (classification) {
      this.selectedClassification = classification
    },
    setSettingsType (type) {
      this.selectedSettingsType = type
    },
    setSelectedWidget (widget) {
      this.selectedWidget = widget
      this.loadSelectedWidget(widget.id)
    },
    setCommandWidget (widget) {
      this.selectedWidget = widget
    },
    setDataSeries () {
      if (this.selectedClassification === 'command') {
        return
      }

      this.selectedDataSeries = this.$refs.tree.getSelectedNodes()

      this.$_.forEach(this.selectedDataSeries, (selectedData) => {
        let axes = []
        this.$_.forEach(this.dataProp.axes, (_, axis) => {
          if (axis !== 'multiple') {
            axes = this.$_.concat(axes, {
              'name': axis,
              'source_type': 'pds',
              'source_metadata': {
                'entity_type': 'sensor',
                'entity_id': selectedData.parentId,
                'parameter': (axis === 'x') ? 'inserted_timestamp' : selectedData.uuid
              }
            })
          }
        })

        let dataSerie = {
          axes: axes
        }

        this.$_.forEach(this.dataProp.series, (_, property) => {
          if (property !== 'multiple') {
            dataSerie[property] = ''
          }
        })

        this.dataSeries = this.$_.concat(this.dataSeries, dataSerie)
      })
    },
    loadSelectedWidget (id) {
      widgetService
        .readId(id)
        .then(response => {
          this.widgetDetail = response

          this.dataSettings = this.widgetDetail.data_settings
          this.dataProp = this.widgetDetail.data_prop
          this.visualSettings = this.widgetDetail.visual_settings

          if (!this.editMode) {
            this.visualProp = this.widgetDetail.visual_prop
          }

          this.selectedWidget = response
        })
    },
    loadWidgets () {
      widgetService
        .readFiltered({ page_number: 1, page_size: 100 })
        .then(response => {
          this.$_.forEach(response.data, (classification) => {
            this.widgetClassifcation[classification.classification] = classification.widgets
          })
          this.widgetsLoaded = true
        })
    },
    loadCommandWidgets () {
      orgService
        .readCommandWidgets({ orgId: this.currentUser.org.id })
        .then(response => {
          this.commandWidgets = response.command_widget_types
        })
    },
    loadGateways () {
      orgService
        .readGateways({ orgId: this.currentUser.org.id })
        .then(response => {
          this.gateways = response.gateways
        })
    },
    findDashboardYOffset () {
      let yOffset = 0
      let widgetLayots = this.selectedDashboard.widget_layouts

      if (this.$_.size(widgetLayots)) {
        this.$_.forEach(widgetLayots, (layoutSetting, _) => {
          if (layoutSetting.y > yOffset) {
            yOffset = layoutSetting.y
          }
        })

        return yOffset + 4
      } else {
        return yOffset
      }
    },
    updateDashbaord (widgetInstance, isCommandWidget = false) {
      let yOffset = this.findDashboardYOffset()
      let widgetLayots = this.selectedDashboard.widget_layouts

      widgetLayots[widgetInstance.id] = {
        w: isCommandWidget ? 4 : 4,
        h: isCommandWidget ? 9 : 4,
        x: 0,
        y: yOffset,
        type: isCommandWidget ? 'command_widget' : 'highcharts'
      }

      let params = { widget_layouts: widgetLayots }
      let config = { orgId: this.currentUser.org.id, id: this.selectedDashboard.id }

      dashboardService.update(config, params)
        .then((response) => {
          dasbhoardEventBus.$emit('widget-added')
        })
    },
    saveWidgetInstance () {
      if (this.selectedClassification === 'command') {
        this.createCommandWidget()
      } else {
        let uniqueKey = this.getUniqueKey()

        let params = {
          label: 'Label' + uniqueKey,
          visual_properties: this.visualProp,
          widget_settings: {},
          series_data: this.dataSeries
        }

        let config = { orgId: this.currentUser.org.id, dashboardId: this.selectedDashboard.id, widgetId: this.selectedWidget.id }
        dashboardService.createWidgetInstance(config, params)
          .then((response) => {
            this.updateDashbaord(response)
          })
      }
    },
    updateWidgetInstance () {
      let params = {
        label: this.widgetData.label,
        visual_properties: this.visualProp,
        series_data: this.dataSeries
      }

      let config = { orgId: this.currentUser.org.id, dashboardId: this.selectedDashboard.id, widgetId: this.selectedWidget.id, id: this.widgetData.id }
      dashboardService.updateWidgetInstance(config, params)
        .then((response) => {
          dasbhoardEventBus.$emit('widget-added')
        })
    },
    createCommandWidget () {
      let widgetParameters = this.selectedWidget.widget_parameters
      let config = { orgId: this.currentUser.org.id, dashboardId: this.selectedDashboard.id }

      let params = {
        dashboard_id: this.selectedDashboard.id,
        gateway_id: this.gatewayId,
        label: 'LED Control Panel',
        data_settings: widgetParameters.data_settings,
        visual_settings: widgetParameters.visual_settings,
        module: this.selectedWidget.module
      }
      dashboardService.createCommandWidget(config, params)
        .then((response) => {
          this.updateDashbaord(response, true)
        })
    },
    onVisualSettingsUpdate (value, key) {
      this.$_.set(this.visualProp, key, value)
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject', 'selectedDashboard'])
  },
  mounted () {
    this.loadWidgets()
    this.loadCommandWidgets()
    this.loadGateways()

    if (this.widgetData) {
      this.loadSelectedWidget(this.widgetData.widget_id)

      let yAxisIndex = 0

      this.$_.forEach(this.widgetData.series_data[0].axes, (axis, index) => {
        if (axis.name === 'y') {
          yAxisIndex = index
        }
      })

      this.$_.forEach(this.widgetData.series_data, (series) => {
        let sourceDetails = series.axes[yAxisIndex].source_details
        this.selectedNodes = this.$_.concat(this.selectedNodes, {
          id: sourceDetails.parameter,
          type: 'SensorParameter'
        })
      })

      this.visualProp = this.widgetData.visual_properties
      this.seriesProp = this.widgetData.series
    }
  }
}
</script>

<style lang="scss" scoped>
  .widget-category {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    .category {
      width: 80px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #797979;
      cursor: pointer;
      &.active {
        border-bottom: 2px solid rgba(59, 124, 168, 1);
      }
    }
    &.settings-category {
      justify-content: flex-start;
      width: 300px;
      .category {
        width: 150px;
      }
    }
  }
  .widgets-section {
    .widgets {
      padding: 40px 0;
      max-width: 1200px;
      margin: 0 auto;
      .widget-container {
        background: #f9f9f9;
        box-shadow: 0 3px 4px #ddd;
        .widget-image {
          height: 110px;
          max-height: 110px;
          background-color: #fff;
          img {
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
        }
        .widget-info {
          border-top: 1px solid #EDEDED;
          padding: 10px;
          text-align: center;
          h3 {
            text-transform: capitalize;
            margin: 0;
            color: #6B6FCE;
            font-size: 12px;
          }
        }
        &.active {
          border: 2px solid #4c92c3;
        }
        &.edit {
          border: 1px solid #e2e2e2;
          .widget-image {
            height: 300px;
            max-height: 300px;
          }
          .widget-info {
            h3 {
              font-size: 21px;
            }
          }
        }
      }
      .widgets-classification {
        list-style: none;
        padding-left: 0;
        display: flex;
        li {
          font-size: 16px;
          padding: 0 15px;
          cursor: pointer;
          border-bottom: 1px solid #e2e2e2;
          min-width: 120px;
          text-align: center;
          &.active {
            border-bottom: 3px solid #4c92c3;
          }
        }
      }
      .widget {
        margin: 20px 0;
      }
    }
  }
  .select-data {
    ul {
      list-style: none;
      padding-left: 0;
      display: flex;
    }
    .data-type-section {
      .vue-tree-container {
        margin-top: 20px;
        border: 1px solid #e2e2e2;
        height: 430px;
        border-radius: 4px;
        padding-bottom: 20px;
        overflow: auto;
      }
    }
  }
  .settings {
    .visual-settings {
      text-transform: capitalize;
      height: 400px;
      overflow: scroll;
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      margin-top: 10px;
      .settings-wrap {
        margin-bottom: 10px;
      }
      .header {
        font-size: 18px;
        padding: 5px;
      }
      .setting-header {
        background-color: #e2e2e2;
      }
      .setting {
        font-size: 15px;
        padding: 5px 0;
        .setting-key {
          display: inline-block;
          width: 175px;
          color: #6d6d6d;
          padding-left: 15px;
        }
        .setting-input {
          display: inline-block;
          width: calc(100% - 185px);
          height: 35px !important;
          &.color {
            width: 35px;
            padding: 2px 3px !important;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .settings {
    .settings-toggle-btn {
      display: flex;
      margin-top: 20px;
      background-color: #4c92c3 !important;
      color: white !important;
      font-size: 15px;
      border-radius: 4px;
      align-items: center;
      .icon {
        width: 18px;
        height: 18px;
        fill: white;
        transform: rotate(-180deg);
      }
      span {
        padding-left: 10px;
      }
      &.collapsed {
        .icon {
          transform: rotate(0deg);
        }
      }
    }
  }
  .gateways-wrap {
    > span {
      font-size: 15px;
      margin-bottom: 10px;
      display: inline-block;
    }
    .custom-control-inline {
      display: flex;
    }
  }
</style>
