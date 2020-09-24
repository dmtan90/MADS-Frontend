<template>
  <div class="dashboard-header">
    <span class="dashboard-name">{{selectedDashboard && selectedDashboard.name}}</span>
    <div class="right-section">
      <span v-if="!viewMode" style="display: inline-flex">
        <multiselect class="select-dashboard" v-if="selectedMode.key === 'view'" :options="options" @select="onselectTheme" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Dashboard Explorer" label="name" track-by="key" :allow-empty="false"></multiselect>
        <multiselect class="select-mode" v-model="selectedMode" @select="onSelectMode" :options="modes" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="key" :allow-empty="false"></multiselect>
        <b-button class="round-btn" v-if="selectedMode.key === 'view'" @click="exportDashboard()">Export</b-button>
        <b-button class="round-btn" v-if="selectedMode.key === 'view'">Download</b-button>
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
          <use xlink:href="/assets/img/mads-common-icons.svg#settings"></use>
        </svg>
        <svg class="icon" v-if="selectedMode.key === 'view'" @click="openRealtimeHistoricalSettings()">
          <use xlink:href="/assets/img/mads-common-icons.svg#clock"></use>
        </svg>
        <svg class="icon" v-if="selectedMode.key === 'view'" @click="openSettings()">
          <use xlink:href="/assets/img/mads-common-icons.svg#settings"></use>
        </svg>
        <!-- <svg class="icon" v-if="selectedMode.key === 'view'">
          <use xlink:href="/assets/img/mads-common-icons.svg#open-menu"></use>
        </svg> -->
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
    background-color: white;
    border-bottom: 1px solid #c8cbce;
    display: flex;
    align-items: center;
    // position: absolute;
    width: 100%;
    .dashboard-name {
      font-size: 18px;
      padding-left: 10px;
      text-transform: capitalize;
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
        width: 180px;
      }
      .select-mode {
        width: 150px;
      }
      .round-btn {
        height: 40px;
        border-radius: 20px !important;
        min-width: 90px;
        border-color: #000000 !important;
        line-height: 1;
        font-size: 15px;
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
        border-radius: 20px !important;
        border-color: #000000 !important;
        color: #333333;
      }
      .multiselect__single {
        font-size: 15px;
      }
      .multiselect__placeholder {
        color: #333333;
      }
    }
  }
</style>
