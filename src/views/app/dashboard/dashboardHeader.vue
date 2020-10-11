<template>
  <div class="dashboard-header">
    <span class="dashboard-name">{{selectedDashboard && selectedDashboard.name}}</span>
    <div class="right-section">
      <span v-if="!viewMode" style="display: inline-flex">
        <multiselect class="select-dashboard" v-if="selectedMode.key === 'view'" :options="options" @select="onselectTheme" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Dashboard Explorer" label="name" track-by="key" :allow-empty="false"></multiselect>
        <multiselect class="select-mode" v-model="selectedMode" @select="onSelectMode" :options="modes" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="key" :allow-empty="false"></multiselect>
        <b-button class="round-btn export-btn" v-if="selectedMode.key === 'view'" @click="exportDashboard()">
          Export
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#export"></use>
          </svg>
        </b-button>
        <b-button class="round-btn download-btn" v-if="selectedMode.key === 'view'">
          Download
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#download-circle"></use>
          </svg>
         </b-button>
        <b-button class="round-btn new-btn" v-if="selectedMode.key === 'edit'" @click="addWidget()">
          <span>New Widget</span>
          <svg class="icon plus">
            <use xlink:href="/assets/img/mads-common-icons.svg#plus"></use>
          </svg>
        </b-button>
        <b-button class="round-btn save-btn" v-if="selectedMode.key === 'edit'" @click="saveDashboard()">
          <span>Save</span>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#save"></use>
          </svg>
        </b-button>
      </span>
      <span>
        <svg class="icon" v-if="selectedMode.key === 'view'" @click="openRealtimeHistoricalSettings()">
          <use xlink:href="/assets/img/mads-common-icons.svg#clock"></use>
        </svg>
        <svg class="icon" v-if="selectedMode.key === 'view' && !viewMode" @click="openSettings()">
          <use xlink:href="/assets/img/mads-common-icons.svg#settings-solid"></use>
        </svg>
        <svg class="icon" v-if="selectedMode.key === 'view'" @click="captureDashboard()">
          <use xlink:href="/assets/img/mads-common-icons.svg#screenshot"></use>
        </svg>
      </span>
    </div>

    <add-widget ref="addWidget" v-if="!viewMode"></add-widget>
    <dashboard-settings ref="dashboardSettings" v-if="!viewMode"></dashboard-settings>
    <export-dashboard ref="exportDashboard" v-if="!viewMode"></export-dashboard>
    <realtime-historical-settings ref="realTimeHistoricalSettings"></realtime-historical-settings>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import addWidget from './addEditWidget'
import dashboardSettings from './dashboardSettings/editSettings'
import exportDashboard from './exportDashboardModal'
import realtimeHistoricalSettings from './dashboardSettings/realTimeHistoricalSettings'

export default {
  components: {
    addWidget,
    dashboardSettings,
    exportDashboard,
    realtimeHistoricalSettings
  },
  props: {
    viewMode: {
      default: false
    }
  },
  data () {
    return {
      modes: [
        { key: 'view', name: 'View Mode' },
        { key: 'edit', name: 'Edit Mode' }
      ],
      selectedMode: {},
      dashboardName: '',
      options: [
        {
          name: 'Shea',
          key: 'shea',
          imageUrl: '/assets/img/shea.png'
        },
        {
          name: 'Hevea',
          key: 'hevea',
          imageUrl: '/assets/img/hevea.png'
        },
        {
          name: 'Smart Agriculture',
          key: 'smart_agriculture',
          imageUrl: '/assets/img/smart_agriculture.png'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['selectTheme']),
    addWidget () {
      this.$refs.addWidget.add()
    },
    onselectTheme (dashboard) {
      this.selectTheme(dashboard)
    },
    onSelectMode (mode) {
      this.dashboardName = this.selectedDashboard ? this.selectedDashboard.name : ''
      this.$emit('on-change-mode', mode.key)
    },
    saveDashboard () {
      this.$emit('save-dashboard-panel', this.dashboardName)
      this.selectedMode = this.modes[0]
    },
    openSettings () {
      this.$refs.dashboardSettings.edit()
    },
    exportDashboard () {
      this.$refs.exportDashboard.open()
    },
    openRealtimeHistoricalSettings () {
      this.$refs.realTimeHistoricalSettings.open()
    },
    captureDashboard () {
      this.$emit('capture-dashboard')
    }
  },
  mounted () {
    this.selectedMode = this.modes[0]
  },
  computed: {
    ...mapGetters(['selectedTheme', 'selectedDashboard'])
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-header {
    height: 60px;
    background-color: #F3F6F7;
    border-bottom: 1px solid #c8cbce;
    display: flex;
    align-items: center;
    // position: absolute;
    width: 100%;
    .dashboard-name {
      padding-left: 10px;
      text-transform: capitalize;
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      color: #3576AB;
    }
    .dashboard-name-input {
      width: 300px;
      margin-left: 30px;
    }
    .right-section {
      margin: 0 10px 0 auto;
      display: flex;
      align-items: center;
      .select-dashboard {
        width: 190px;
      }
      .select-mode {
        width: 190px;
      }
      .export-btn{
        border: 1.5px solid #3576AB !important;
        color: #3576AB !important;
        padding: 9px 11px !important;
        width: 104px !important;
        background-color: transparent !important;
        margin: 0px 7px;
        .icon{
            width: 24px;
            height: 24px;
            margin-left: 16px;
        }   
      }
      .download-btn{
        background: #3576AB !important;
        border: 1.5px solid #3576AB !important;
        width: 124px !important;
        color: #FFFFFF !important;
      }
      .round-btn {
        border-radius: 3px !important;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
        padding: 9px 11px;
        height: 40px;
        text-align: left;
        display: flex;
        align-items: center;
        margin-left: 7px;
        &.new-btn {
          display: flex;
          align-items: center;
          .icon {
            width: 21px;
            height: 21px;
          }
        }
        &.save-btn {
          display: flex;
          align-items: center;
          background-color: #4c92c3 !important;
          color: white !important;
          border-color: #ffffff !important;
          .icon {
            fill: white;
          }
        }
      }
      .icon {
        width: 27px;
        height: 27px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
</style>

<style lang="scss">
  .dashboard-header {
    .select-dashboard, .select-mode {
      margin-left: 7px;
      cursor: pointer;
      .multiselect__tags {
          background: #FFFFFF;
          border-radius: 3px !important;
          border: 0px;
          font-size: 14px;
          line-height: 17px;
          color: #C4C4C4 !important;
      }
      .multiselect__single {
        font-size: 15px;
      }
      // .multiselect__placeholder {
      //   color: #333333;
      // }
    }
  }
</style>
