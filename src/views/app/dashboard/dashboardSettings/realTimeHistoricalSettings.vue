<template>
  <b-modal ref="realTimeHistoricalModal" modalID="reatime-historical-modal" hide-footer>
    <div class="realtime-historical-wrap">
      <ul class="tabs">
        <li @click="selectTab('realtime')" :class="{'active': (selectedTab === 'realtime')}">Realtime</li>
        <li @click="selectTab('historical')" :class="{'active': (selectedTab === 'historical')}">History</li>
      </ul>
      <div class="dashboard-settings-wrap">
        <section v-if="selectedTab === 'realtime'">
          <b-form>
            <b-form-group label="Last">
              <multiselect v-model="selectedRealtimeGrouping" @select="onSelectRealtimeGrouping" :options="realtimeGroupingData" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="key"></multiselect>
            </b-form-group>
            <b-form-group label="Data aggregation function">
              <multiselect v-model="selectedAggFunction" :options="aggregationFunctions" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
            </b-form-group>
            <b-form-group label="Grouping interval">
              <multiselect v-model="selectedRealtimeInterval" :options="selectedRealtimeGrouping.groupingIntervals" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="key"></multiselect>
            </b-form-group>
          </b-form>
        </section>
        <section v-if="selectedTab === 'historical'">
          <b-form>
            <b-form-group label="Last">
              <multiselect v-model="selectedHistoricalGrouping" @select="onSelectHistoricalGrouping" :options="historicalGroupingData" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="key"></multiselect>
            </b-form-group>
            <b-form-group label="Data aggregation function">
              <multiselect v-model="selectedAggFunction" :options="aggregationFunctions" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
            </b-form-group>
            <b-form-group label="Grouping interval">
              <multiselect v-model="selectedHistoricalInterval" :options="selectedHistoricalGrouping.groupingIntervals" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="key"></multiselect>
            </b-form-group>
          </b-form>
        </section>
      </div>
      <div class="footer">
        <b-button @click="onCancel()">Cancel</b-button>
        <b-button class="save-btn">Save</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import groupingData from './groupingData'
import dashboardService from '@/services/dashboard.service'

export default {
  data () {
    return {
      selectedTab: 'realtime',
      realtimeGroupingData: [],
      historicalGroupingData: [],
      selectedRealtimeGrouping: {},
      selectedHistoricalGrouping: {},
      selectedRealtimeInterval: {},
      selectedHistoricalInterval: {},
      aggregationFunctions: ['min', 'max', 'average', 'sum', 'count'],
      selectedAggFunction: ''
    }
  },
  methods: {
    open () {
      this.$refs.realTimeHistoricalModal.show()
    },
    onCancel () {
      this.$refs.realTimeHistoricalModal.hide()
    },
    onSave () {
      this.$refs.realTimeHistoricalModal.hide()
      let loader = this.$loading.show()

      let todayDate = this.$moment()
      let endDate = todayDate.format('YYYY-MM-DD')
      let startDate = todayDate.subtract(1, this.selectedGrouping.type).format('YYYY-MM-DD')

      let params = {
        filter_metadata: {
          aggregate_func: this.selectedAggFunction,
          from_date: startDate,
          to_date: endDate,
          group_interval: (this.selectedInterval.type).slice(0, -1),
          type: this.selectedTab
        }
      }
      let config = { orgId: this.currentUser.org.id, dashboardId: this.selectedDashboard.id, id: this.selectedPanel.id }

      dashboardService.updateDashboardPanel(config, params)
        .then((response) => {
          loader.hide()
        })
    },
    selectTab (tab) {
      this.selectedTab = tab
    },
    onSelectRealtimeGrouping (grouping) {
      this.selectedRealtimeInterval = grouping.groupingIntervals[0]
    },
    onSelectHistoricalGrouping (grouping) {
      this.selectedHistoricalInterval = grouping.groupingIntervals[0]
    },
    initData () {
      this.realtimeGroupingData = this.$_.take(groupingData, 13)
      this.selectedRealtimeGrouping = this.realtimeGroupingData[0]
      this.selectedRealtimeInterval = this.selectedRealtimeGrouping.groupingIntervals[0]

      this.historicalGroupingData = groupingData
      this.selectedHistoricalGrouping = this.historicalGroupingData[0]
      this.selectedHistoricalInterval = this.selectedHistoricalGrouping.groupingIntervals[0]

      this.selectedAggFunction = this.aggregationFunctions[2]
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedDashboard', 'selectedPanel'])
  },
  mounted () {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
  .realtime-historical-wrap {
    padding: 30px 0;
    .tabs {
      list-style: none;
      display: flex;
      font-size: 18px;
      padding: 0;
      li {
        width: 50%;
        cursor: pointer;
        text-align: center;
        border-bottom: 1px solid #e2e2e2;
        &.active {
          border-bottom: 2px solid #305680;
        }
      }
    }
    .dashboard-settings-wrap {
      padding: 20px 30px;
    }
    .footer {
      text-align: right;
      padding: 0px 30px;
      .save-btn {
        background-color: #4c92c3 !important;
        color: #ffffff !important;
        min-width: 90px;
      }
    }
  }
</style>
