<template>
  <div>
    <h3>Add New Widget</h3>
    <section v-if="selectedSectionIndex === 1" class="select-widget">
      <!-- <div class="widget-category">
        <span class="category" :class="{'active': selectedCategory === 'charts'}" @click="setCategory('charts')">Charts</span>
        <span class="category" :class="{'active': selectedCategory === 'stocks'}" @click="setCategory('stocks')">Stocks</span>
        <span class="category" :class="{'active': selectedCategory === 'maps'}" @click="setCategory('maps')">Maps</span>
        <span class="category" :class="{'active': selectedCategory === 'gantt'}" @click="setCategory('gantt')">Gantt</span>
      </div> -->
      <div class="widgets-section">
        <div class="widgets">
          <b-row>
            <b-colxx lg="4" md="4" sm="6" xs="12" xxs="12" class="widget" v-for="(widget, index) in widgetList" :key="index">
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
        </div>
      </div>
    </section>
    <section v-if="selectedSectionIndex === 2" class="select-data">
      <!-- <div class="widget-category data-type-category">
        <span class="category" :class="{'active': selectedDataType === 'entityData'}" @click="setDataType('entityData')">Entity Data</span>
        <span class="category" :class="{'active': selectedDataType === 'functionData'}" @click="setDataType('functionData')">Function</span>
      </div> -->
      <div class="data-type-section">
        <div class="vue-tree-container">
          <mads-tree
            ref="tree"
            :treeView="'file'"
            :treeOptions="treeOptions"
            :hiddenEntities="[]"
            :selectableEntities="['SensorParameter']"
          ></mads-tree>
        </div>
      </div>
    </section>
    <section v-if="selectedSectionIndex === 3" class="settings">
      <div class="widget-category settings-category">
        <span class="category" :class="{'active': selectedSettingsType === 'visualSettings'}" @click="setSettingsType('visualSettings')">Visual Settings</span>
        <span class="category" :class="{'active': selectedSettingsType === 'dataSettings'}" @click="setSettingsType('dataSettings')">Data Settings</span>
      </div>
      <div v-if="selectedSettingsType === 'visualSettings'">
        <div class="visual-settings">
            <settings :settings="visualSettings" @on-setting-upate="onVisualSettingsUpdate"></settings>
          </div>
      </div>
      <div v-if="selectedSettingsType === 'dataSettings'">
        <div class="visual-settings">
            <div v-for="(serie, seriesIndex) in selectedDataSeries" :key="seriesIndex" class="settings-wrap">
              <div class="header setting-header">{{serie.name}}</div>
              <div class="setting" v-for="(setting, index) in dataSettings[1].properties" :key="index">
                <div v-if="setting.key !== 'multiple'">
                  <span class="setting-key">{{setting.key}}</span>
                  <b-form-input :type="dataTypeMap[setting.data_type]" class="setting-input" :class="setting.data_type" v-model="dataSeries[seriesIndex][setting.key]"></b-form-input>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import madsTree from './../shared/madsTree/index'
import widgetService from '@/services/widget.service'
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
    }
  },
  data () {
    return {
      selectedCategory: 'charts',
      selectedWidget: null,
      widgetDetail: null,
      widgetList: [],
      dataSeries: [],
      selectedSettingsType: 'visualSettings',
      selectedDataSeries: [],
      visualSettings: [],
      dataSettings: [],
      dataProp: {},
      treeOptions: {
        selectable: true,
        singleSelect: true
      },
      dataTypeMap: dataTypeMap
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
    setCategory (category) {
    },
    setSettingsType (type) {
      this.selectedSettingsType = type
    },
    setSelectedWidget (widget) {
      this.selectedWidget = widget
      this.loadSelectedWidget(widget)
    },
    setDataSeries () {
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
                'parameter': (axis === 'x') ? 'inserted_timestamp' : selectedData.name
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
    loadSelectedWidget (selectedWidget) {
      widgetService
        .readId(selectedWidget.id)
        .then(response => {
          this.widgetDetail = response
          this.isMultipleSeries = this.widgetDetail.data_prop.series.multiple
          this.treeOptions = this.$_.merge(this.treeOptions, { singleSelect: !this.isMultipleSeries })
          this.visualSettings = this.widgetDetail.visual_settings
          this.visualProp = this.widgetDetail.visual_prop
          this.dataSettings = this.widgetDetail.data_settings
          this.dataProp = this.widgetDetail.data_prop
        })
    },
    loadWidgets () {
      widgetService
        .read({ page_number: 1, page_size: 10 })
        .then(response => {
          this.widgetList = response.widgets
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
    updateDashbaord (widgetInstance) {
      let yOffset = this.findDashboardYOffset()
      let widgetLayots = this.selectedDashboard.widget_layouts

      widgetLayots[widgetInstance.id] = {
        w: 4,
        h: 4,
        x: 0,
        y: yOffset
      }

      let params = { widget_layouts: widgetLayots }
      let config = { orgId: this.currentUser.org.id, projectId: 1, id: this.selectedDashboard.id }

      dashboardService.update(config, params)
        .then((response) => {
          dasbhoardEventBus.$emit('widget-added')
        })
    },
    saveWidgetInstance () {
      let uniqueKey = this.getUniqueKey()

      let params = {
        label: 'Label' + uniqueKey,
        visual_prop: this.visualProp,
        settings: {},
        series: this.dataSeries
      }

      let config = { orgId: this.currentUser.org.id, projectId: 1, dashboardId: this.selectedDashboard.id, widgetId: this.selectedWidget.id }
      dashboardService.createWidgetInstance(config, params)
        .then((response) => {
          this.updateDashbaord(response)
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
</style>
