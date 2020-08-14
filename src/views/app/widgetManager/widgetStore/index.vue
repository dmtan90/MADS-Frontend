<template>
  <div>
    <div class="widget-header">
      <div class="header">
        <div class="content">
          <div class="txt">
            Search widgets for your IoT projects
          </div>
          <b-form>
            <b-form-group>
              <b-form-input type="text" v-model="searchText" debounce="500" @change="searchWidget()" placeholder="Search widgets"/>
              <svg class="icon" @click="searchWidget()">
                <use xlink:href="/assets/img/mads-common-icons.svg#search"></use>
              </svg>
            </b-form-group>
          </b-form>
          <div class="btn-group">
            <button class="btn popular-btn">Popular</button>
            <button class="btn recent-btn">Recent</button>
          </div>
        </div>
      </div>
    </div>
    <div class="widget-category">
      <span class="category" :class="{'active': selectedCategory === 'popular'}" @click="setCategory('popular')">Popular</span>
      <span class="category" :class="{'active': selectedCategory === 'library'}" @click="setCategory('library')">Library</span>
      <!-- <span class="category" :class="{'active': selectedCategory === 'maps'}" @click="setCategory('maps')">Maps</span>
      <span class="category" :class="{'active': selectedCategory === 'gantt'}" @click="setCategory('gantt')">Gantt</span> -->
    </div>
    <div class="widgets-section">
      <div class="widgets" v-if="selectedCategory === 'popular'">
        <b-row>
          <b-colxx lg="4" md="4" sm="6" xs="12" xxs="12" class="widget" v-for="(widget, index) in displayedWidgets" :key="index">
            <div class="widget-container">
              <div class="widget-image">
                <img :src="widget.image_url" alt="" @click="openWidgetDetailPage(widget)">
              </div>
              <div class="widget-info">
                <h3>{{widget.label}}</h3>
              </div>
            </div>
          </b-colxx>
        </b-row>
      </div>
      <div class="widgets" v-if="selectedCategory === 'library'">
        <b-row>
          <b-colxx lg="4" md="4" sm="6" xs="12" xxs="12" class="widget" v-for="(widget, index) in widgetsLibrary" :key="index">
            <div class="widget-container">
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import widgetService from '@/services/widget.service'

export default {
  data () {
    return {
      selectedCategory: 'popular',
      widgets: [],
      widgetsLibrary: [],
      searchText: '',
      widgetSearchResults: [],
      displayedWidgets: []
    }
  },
  methods: {
    ...mapActions(['selectWidget', 'setCurrentPage']),
    setCategory (category) {
      this.selectedCategory = category
    },
    openWidgetDetailPage (widget) {
      this.selectWidget(widget.id)
      this.setCurrentPage('widgetDetail')
    },
    loadWidgets () {
      widgetService
        .read({ page_number: 1, page_size: 100 })
        .then(response => {
          this.widgets = response.widgets
          this.displayedWidgets = this.widgets
        })
    },
    loadWidgetsLibrary () {
      this.widgetsLibrary = [
        { label: 'Scatter Plot', image_url: '/assets/img/scatter.png' },
        { label: 'Bubble Chart', image_url: '/assets/img/bubble.png' },
        { label: '3D bubbles', image_url: '/assets/img/bubble-3d.png' },
        { label: 'VU meter', image_url: '/assets/img/gauge-vu-meter.png' },
        { label: 'Clock', image_url: '/assets/img/gauge-clock.png' },
        { label: 'Heat map', image_url: '/assets/img/heatmap.png' },
        { label: 'Large heat map', image_url: '/assets/img/heatmap-canvas.png' },
        { label: 'Box plot', image_url: '/assets/img/box-plot.png' },
        { label: 'Bell curve', image_url: '/assets/img/bellcurve.png' },
        { label: 'Histogram', image_url: '/assets/img/histogram.png' },
        { label: 'Stock chart with GUI', image_url: '/assets/img/stock-tools-gui.png' },
        { label: 'Area Line Series', image_url: '/assets/img/intraday-area.png' }
      ]
    },
    searchWidget () {
      if (this.searchText) {
        widgetService
          .search(this.searchText)
          .then(response => {
            this.widgetSearchResults = response.widgets
            this.displayedWidgets = this.widgetSearchResults
          })
      } else {
        this.displayedWidgets = this.widgets
      }
    }
  },
  mounted () {
    this.loadWidgets()
    this.loadWidgetsLibrary()
  }
}
</script>

<style lang="scss" scoped>
  .widget-header {
    background: url("/assets/img/widget-store-background.png") no-repeat center center;
    background-size: cover;
    width: 100%;
    height: 400px;
    .header {
      color: white;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: relative;
      .content {
        width: 60%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .txt {
        font-size: 36px;
        text-align: center;
      }
      form {
        input {
          width: 100%;
          border-radius: 20px;
          padding-left: 20px;
          padding-right: 20px;
          &::placeholder {
            text-align: left;
            font-size: 15px;
          }
        }
        margin-top: 30px;
        margin-bottom: 30px;
      }
      .btn-group {
        display: flex;
        justify-content: center;
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
          color: white;
          line-height: 1;
          &.popular-btn {
            background-color: #1273eb !important;
            color: white !important;
            border: 1px solid #1273eb !important;
          }
          &.recent-btn {
            background-color: transparent;
            border: 2px solid rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
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
  }
  .widgets-section {
    background: #f2f2f2;
    .widgets {
      padding: 40px 0;
      max-width: 1200px;
      margin: 0 auto;
      .widget-container {
        background: #f9f9f9;
        box-shadow: 0 3px 4px #ddd;
        .widget-image {
          height: 250px;
          max-height: 250px;
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
          }
        }
      }
      .widget {
        margin: 20px 0;
      }
    }
  }
</style>

<style lang="scss">
  .widget-header {
    .form-group {
      position: relative;
      input {
        height: 54px;
      }
      .icon {
        fill: white;
        position: absolute;
        width: 54px;
        height: 100px;
        right: 0px;
        top: 0;
        background: #1273eb;
        height: 54px;
        padding: 16px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
</style>
