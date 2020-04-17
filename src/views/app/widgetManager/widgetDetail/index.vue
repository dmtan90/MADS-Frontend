<template>
  <div class="widget-detail">
    <b-row class="widget-row">
      <b-colxx xxs="2" class="widget-types">
        <div class="back-btn" @click="goToWidgetStore()">Back</div>
        <div v-for="i in [2,3,4,5,6,7,8,9,10]" :key="i" class="options">
          Option {{i}}
        </div>
      </b-colxx>
      <b-colxx xxs="7" class="widget-content">
        <chart-widget :defaultValues="widget.default_values"></chart-widget>
        <div class="button-group" v-if="!userWidget && widget.id">
          <button class="btn download-btn" :class="{'disabled': checkIfWidgetAlreadyDownloaded()}"  @click="downloadwidiget()">Download</button>
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
import chartWidget from './chart-widget'

export default {
  props: ['userWidget'],
  components: {
    chartWidget
  },
  data() {
    return {
      widget: {},
      userWidgets: []
    }
  },
  methods: {
    ...mapActions(['selectWidget', 'setCurrentPage']),
    goToWidgetStore() {
      this.setCurrentPage('index')
      this.selectWidget(null)
    },
    loadWidget() {
      widgetService
        .readId(this.selectedWidget)
        .then(response => {
          this.widget = response;
        })
    },
    downloadwidiget() {
      let config = {userId: this.currentUser.uid, widgetId: this.widget.id}
      userWidgetService
        .create(config)
        .then(response => {
          if(response.success) {
            this.loadCurrentUserWidgets()
          }
        })
    },
    loadCurrentUserWidgets () {
      let config = {userId: this.currentUser.uid}
      userWidgetService
        .read(config, { page_number: 1, page_size: 10 })
        .then(response => {
          this.userWidgets = _.map(response.user_widgets, (widget) => widget.id)
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
        .back-btn {
          height: 40px;
          border-bottom: 1px solid rgba(215, 215, 215, 1);
          padding: 6px 12px;
          cursor: pointer;
        }
        .options {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
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
        overflow-y: scroll;
        overflow-x: hidden;
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
