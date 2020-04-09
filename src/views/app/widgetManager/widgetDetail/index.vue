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
        <div class="button-group">
          <button class="btn download-btn">Download</button>
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
import { mapGetters, mapActions } from 'vuex'
import widgetService from '@/services/widget.service'
import chartWidget from './chart-widget'

export default {
  components: {
    chartWidget
  },
  data() {
    return {
      widget: {}
    }
  },
  methods: {
    ...mapActions(['toggleWidgetStoreState', 'toggleWidgetDetailState']),
    goToWidgetStore() {
      this.toggleWidgetDetailState(false);
      this.toggleWidgetStoreState(true);
    },
    loadWidget() {
      widgetService
        .readId(this.openedWidgetDetail)
        .then(response => {
          this.widget = response;
        })
    }
  },
  computed: {
    ...mapGetters(['openedWidgetDetail'])
  },
  mounted() {
    this.loadWidget();
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
