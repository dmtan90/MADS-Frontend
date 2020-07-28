<template>
  <div class="widget-detail">
    <b-row class="widget-row">
      <b-colxx xxs="2" class="widget-types">
        <div class="back-btn" @click="goToWidgetStore()">Back</div>
        <div v-for="(option, index) in widgetOptions" :key="index" class="options">
          {{option}}
        </div>
      </b-colxx>
      <b-colxx xxs="7" class="widget-content">
        <widget :visualSettings="visualSettings" :series="series" :type="widgetType"></widget>
        <div class="button-group" v-if="userWidget">
          <button class="btn download-btn" v-if="checkIfWidgetAlreadyDownloaded" @click="openWidget()">Open</button>
        </div>
        <div class="button-group" v-else>
          <button class="btn download-btn" :disabled="checkIfWidgetAlreadyDownloaded()" @click="downloadwidiget()">
            {{ checkIfWidgetAlreadyDownloaded() ? 'Downloaded' : 'Download'}}
          </button>
        </div>
      </b-colxx>
      <b-colxx xxs="3" class="widget-properties">
        <div class="header">
          Basic Line | Properties
        </div>
        <div class="properties">
          <div class="property">
            <div class="header">
              Categories
            </div>
          </div>
          <div class="property">
            <div class="header">
              Type
            </div>
          </div>
          <div class="property">
            <div class="header">
              License
            </div>
          </div>
          <div class="property">
            <div class="header">
              Tags
            </div>
          </div>
          <div class="property">
            <div class="header">
              UID
            </div>
          </div>
          <div class="property">
            <div class="header">
              Creator
            </div>
          </div>
          <div class="property">
            <div class="header">
              First Published
            </div>
          </div>
        </div>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable */
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import widgetService from '@/services/widget.service'
import userWidgetService from '@/services/userWidget.service'
import widget from './../../shared/widgets/highChart'

export default {
  props: ['userWidget'],
  components: {
    widget
  },
  data() {
    return {
      widget: {},
      userWidgets: [],
      series: [],
      visualSettings: {},
      widgetType: '',
      widgetOptions: ['Line', 'Area', 'Column & Bar', 'Pie', 'Gauge', 'Stock', 'CandleStick', 'Intraday', 'Depth', 'Column', 'Categorized', 'Distribution', 'Map Bubble', 'Subtasks', 'Interactive Gantt']
    }
  },
  methods: {
    ...mapActions(['selectWidget', 'setCurrentPage', 'setCurrentSection']),
    goToWidgetStore() {
      this.setCurrentPage('index')
      this.selectWidget(null)
    },
    loadWidget() {
      let that = this
      widgetService
        .readId(this.selectedWidget)
        .then(response => {
          this.widget = response
          this.widgetType = this.widget.category[1]
          this.visualSettings = this.widget.default_values.visual_setting_values
          this.series = this.widget.default_values.data_settings_values.series
        })
    },
    downloadwidiget() {
      let config = {userId: this.currentUser.id, orgId: this.currentUser.org.id}
      let params = { widget_id: this.widget.id }
      userWidgetService
        .create(config, params)
        .then(response => {
          if(response.success) {
            this.loadCurrentUserWidgets()
          }
        })
    },
    openWidget() {
      this.setCurrentSection({ appKey: 'Widget_Manager', section: 'editor' })
      this.setCurrentPage('index')
    },
    loadCurrentUserWidgets () {
      let config = {userId: this.currentUser.id, orgId: this.currentUser.org.id}
      userWidgetService
        .read(config, { page_number: 1, page_size: 10 })
        .then(response => {
          this.userWidgets = _.map(response.user_widgets, (user_widget) => user_widget.widget.id)
        })
    },
    checkIfWidgetAlreadyDownloaded() {
      return _.includes(this.userWidgets, this.widget.id)
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedWidget', 'currentPage'])
  },
  mounted() {
    this.loadWidget();
    this.loadCurrentUserWidgets();
  }
}
</script>

<style lang="scss" scoped>
  .widget-detail {
    height: 100%;
    background-color: rgba(242, 242, 242, 1);
    .widget-row {
      height: 100%;
      margin: 0;
      .widget-types {
        background-color: rgba(76, 146, 195, 0.2);
        height: 100%;
        padding: 0;
        overflow: auto;
        .back-btn {
          height: 40px;
          border-bottom: 1px solid rgba(215, 215, 215, 1);
          padding: 6px 20px;
          cursor: pointer;
          font-size: 15px;
        }
        .options {
          height: 40px;
          display: flex;
          align-items: center;
          cursor: pointer;
          padding-left: 40px;
          color: #555555;
        }
      }
      .widget-content {
        padding: 40px 40px;
        .button-group {
          display: flex;
          justify-content: center;
          margin-top: 40px;
          .btn {
            width: 100px;
            height: 40px;
            border-radius: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 6px;
            margin-right: 6px;
            font-size: 16px;
            line-height: 1;
            border-radius: 5px;
            &.download-btn {
              background: rgba(76, 146, 195, 1);
              color: white;
              width: 120px;
              &.disabled {
                pointer-events: none;
              }
            }
            &.share-btn {
              background-color: rgba(76, 146, 195, 0.2);
              color: #555555;
              width: 100px;
            }
          }
        }
      }
      .widget-properties {
        height: 100%;
        padding: 0;
        overflow: auto;
        .header {
          height: 40px;
          font-size: 15px;
          font-weight: 700px;
          display: flex;
          align-items: center;
          padding-left: 10px;
        }
        .properties {
          background-color: white;
          height: 100%;
          .property {
            height: 95px;
            border-bottom: 1px solid rgba(242, 242, 242, 1);
            color: #555555;
            font-size: 16px;
            font-weight: 400;
            padding-left: 10px;
          }
        }
      }
    }
  }
</style>
