<template>
  <div class="dashboard-header">
    <span class="dashboard-name">{{selectedDashboard.name}}</span>
    <div class="right-section">
      <multiselect class="select-dashboard" :options="options" @select="onSelectDashboard" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Dashboard Explorer" label="name" track-by="key"></multiselect>
      <multiselect class="select-mode" v-model="selectedMode" :options="['View Mode', 'Edit Mode']" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
        <b-button class="round-btn" v-if="selectedMode === 'View Mode'">Share</b-button>
        <b-button class="round-btn" v-if="selectedMode === 'View Mode'">Export</b-button>
        <b-button class="round-btn" v-if="selectedMode === 'View Mode'">Download</b-button>
        <b-button class="round-btn new-btn" v-if="selectedMode === 'Edit Mode'" @click="addWidget()">
          <span>New Widget</span>
          <svg class="icon plus">
            <use xlink:href="/assets/img/mads-common-icons.svg#plus"></use>
          </svg>
        </b-button>
        <b-button class="round-btn" v-if="selectedMode === 'Edit Mode'">Import</b-button>
      <svg class="icon">
        <use xlink:href="/assets/img/mads-common-icons.svg#settings"></use>
      </svg>
      <svg class="icon">
        <use xlink:href="/assets/img/mads-common-icons.svg#open-menu"></use>
      </svg>
    </div>

    <add-widget ref="addWidget"></add-widget>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import addWidget from './addWidget'
import SharedBus from './../shared/sharedBus'

export default {
  components: {
    addWidget
  },
  data () {
    return {
      selectedMode: 'View Mode',
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
    ...mapActions(['selectDashboard']),
    addWidget () {
      SharedBus.$emit('open-mads-modal', 'addWidgetModal')
    },
    onSelectDashboard (dashboard) {
      this.selectDashboard(dashboard)
    }
  },
  computed: {
    ...mapGetters(['selectedDashboard'])
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-header {
    height: 48px;
    background-color: #dadada;
    margin-top: 2px;
    display: flex;
    align-items: center;
    .dashboard-name {
      font-size: 18px;
      padding-left: 10px;
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
