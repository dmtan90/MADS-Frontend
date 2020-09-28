<template>
  <div class="builders-wrap">
    <div v-if="!showDetail">
      <div class="card">
        <h4>Create new View from scratch</h4>
        <b-button class="create-view-btn custom-btn">Create View</b-button>
      </div>
      <div class="card">
        <h4>Or select one of saved Views to continue data analysis</h4>
        <b-input placeholder="Filter" class="filter-view"></b-input>
        <div class="lists-table tasks-table">
          <vuetable
              ref="vuetable"
              :api-mode="false"
              :fields="fields"
              :data="savedViews"
            >
            <template v-slot:type>
              <span>type</span>
            </template>
            <template v-slot:actions>
              <span>-</span>
            </template>
          </vuetable>
        </div>
      </div>
      <div class="card select-entity-card">
        <h4>Or select Entity to start exploration</h4>
        <div class="entity-options">
          <dropdown :align="'top'">
            <template slot="btn">TbServiceQueue</template>
            <template slot="body">
              <ul>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Bar</template>
                    <template slot="body">
                      <ul>
                        <li @click="showDetail = true">failedMsgs</li>
                        <li @click="showDetail = true">successfulMsgs</li>
                        <li @click="showDetail = true">timeoutMsgs</li>
                        <li @click="showDetail = true">tmpFailed</li>
                        <li @click="showDetail = true">tmpTimeout</li>
                        <li @click="showDetail = true">totalMsgs</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Line</template>
                    <template slot="body">
                      <ul>
                        <li>failedMsgs</li>
                        <li>successfulMsgs</li>
                        <li>timeoutMsgs</li>
                        <li>tmpFailed</li>
                        <li>tmpTimeout</li>
                        <li>totalMsgs</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Pie</template>
                    <template slot="body">
                      <ul>
                        <li>failedMsgs</li>
                        <li>successfulMsgs</li>
                        <li>timeoutMsgs</li>
                        <li>tmpFailed</li>
                        <li>tmpTimeout</li>
                        <li>totalMsgs</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Scatter</template>
                    <template slot="body">
                      <ul>
                        <li>failedMsgs</li>
                        <li>successfulMsgs</li>
                        <li>timeoutMsgs</li>
                        <li>tmpFailed</li>
                        <li>tmpTimeout</li>
                        <li>totalMsgs</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :y="-200" :x="15">
                    <template slot="btn">Heat map</template>
                    <template slot="body">
                      <ul>
                        <li>failedMsgs</li>
                        <li>successfulMsgs</li>
                        <li>timeoutMsgs</li>
                        <li>tmpFailed</li>
                        <li>tmpTimeout</li>
                        <li>totalMsgs</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
              </ul>
            </template>
          </dropdown>
          <dropdown :align="'top'">
            <template slot="btn">heatMeter</template>
            <template slot="body">
              <ul>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Bar</template>
                    <template slot="body">
                      <ul>
                        <li>heatConsumption</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Line</template>
                    <template slot="body">
                      <ul>
                        <li>heatConsumption</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :y="-50" :x="15">
                    <template slot="btn">Pie</template>
                    <template slot="body">
                      <ul>
                        <li>Owner</li>
                        <li>heatMeter</li>
                        <li>active</li>
                        <li>inactivityAlarmTime</li>
                        <li>installDate</li>
                        <li>lastActivityTime</li>
                        <li>serial</li>
                        <li>heatConsumption</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Scatter</template>
                    <template slot="body">
                      <ul>
                        <li>heatConsumption</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Heat map</template>
                    <template slot="body">
                      <ul>
                        <li>heatConsumption</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
              </ul>
            </template>
          </dropdown>
          <dropdown :align="'top'">
            <template slot="btn">default</template>
            <template slot="body">
              <ul>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Bar</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Line</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Pie</template>
                    <template slot="body">
                      <ul>
                        <li>Owner</li>
                        <li>default</li>
                        <li>active</li>
                        <li>inactivityAlarmTime</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Scatter</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Heat map</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
              </ul>
            </template>
          </dropdown>
          <dropdown :align="'top'">
            <template slot="btn">energyMeter</template>
            <template slot="body">
              <ul>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Bar</template>
                    <template slot="body">
                      <ul>
                        <li>energyConsAbsolute</li>
                        <li>energyConsumption</li>
                        <li>value</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Line</template>
                    <template slot="body">
                      <ul>
                        <li>energyConsAbsolute</li>
                        <li>energyConsumption</li>
                        <li>value</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :y="-150" :x="15">
                    <template slot="btn">Pie</template>
                    <template slot="body">
                      <ul>
                        <li>Owner</li>
                        <li>energyMeter</li>
                        <li>active</li>
                        <li>inactivityAlarmTime</li>
                        <li>installDate</li>
                        <li>lastActivityTime</li>
                        <li>serial</li>
                        <li>energyConsAbsolute</li>
                        <li>energyConsumption</li>
                        <li>value</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Scatter</template>
                    <template slot="body">
                      <ul>
                        <li>energyConsAbsolute</li>
                        <li>energyConsumption</li>
                        <li>value</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Heat map</template>
                    <template slot="body">
                      <ul>
                        <li>energyConsAbsolute</li>
                        <li>energyConsumption</li>
                        <li>value</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
              </ul>
            </template>
          </dropdown>
          <dropdown :align="'top'">
            <template slot="btn">Building</template>
            <template slot="body">
              <ul>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Bar</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Line</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Pie</template>
                    <template slot="body">
                      <ul>
                        <li>Building</li>
                        <li>Building Label</li>
                        <li>Owner</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Scatter</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Heat map</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
              </ul>
            </template>
          </dropdown>
          <dropdown :align="'top'">
            <template slot="btn">AlarmPropgationAsset</template>
            <template slot="body">
              <ul>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Bar</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Line</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Pie</template>
                    <template slot="body">
                      <ul>
                        <li>AlarmPropgationAsset</li>
                        <li>Owner</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Scatter</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Heat map</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
              </ul>
            </template>
          </dropdown>
          <dropdown :align="'top'">
            <template slot="btn">thermostat</template>
            <template slot="body">
              <ul>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Bar</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Line</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :y="-150" :x="15">
                    <template slot="btn">Pie</template>
                    <template slot="body">
                      <ul>
                        <li>Owner</li>
                        <li>thermostat</li>
                        <li>active</li>
                        <li>alarmHumidity</li>
                        <li>alarmTemperature</li>
                        <li>inactivityAlarmTime</li>
                        <li>latitude</li>
                        <li>longitude</li>
                        <li>thresholdHumidity</li>
                        <li>thresholdTemperature</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Scatter</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Heat map</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
              </ul>
            </template>
          </dropdown>
          <dropdown :align="'top'">
            <template slot="btn">building</template>
            <template slot="body">
              <ul>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Bar</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Line</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Pie</template>
                    <template slot="body">
                      <ul>
                        <li>Owner</li>
                        <li>building</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Scatter</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'" :x="15">
                    <template slot="btn">Heat map</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
              </ul>
            </template>
          </dropdown>
          <dropdown :align="'top'">
            <template slot="btn">apartment</template>
            <template slot="body">
              <ul>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'left'" :x="-15">
                    <template slot="btn">Bar</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'left'" :x="-15">
                    <template slot="btn">Line</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'left'" :y="-150" :x="-15">
                    <template slot="btn">Pie</template>
                    <template slot="body">
                      <ul>
                        <li>Owner</li>
                        <li>apartment</li>
                        <li>apartment Label</li>
                        <li>area</li>
                        <li>Floor</li>
                        <li>name</li>
                        <li>roomNumber</li>
                        <li>state</li>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'left'" :x="-15">
                    <template slot="btn">Scatter</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
                <li>
                  <dropdown :trigger="'hover'" :role="'sublist'" :align="'left'" :x="-15">
                    <template slot="btn">Heat map</template>
                    <template slot="body">
                      <ul>
                      </ul>
                    </template>
                  </dropdown>
                </li>
              </ul>
            </template>
          </dropdown>
        </div>
      </div>
    </div>
    <view-detail v-if="showDetail"></view-detail>
  </div>
</template>

<script>
import fields from './viewFieldsDef'
import Vuetable from 'vuetable-2'
import Dropdown from 'bp-vuejs-dropdown'
import viewDetail from './viewDetail'

export default {
  data () {
    return {
      fields: fields,
      savedViews: [],
      showDetail: false
    }
  },
  components: {
    Vuetable,
    Dropdown,
    viewDetail
  },
  methods: {
    loadSavedViews () {
      this.savedViews = [
        {
          type: 'card',
          name: 'new card',
          created: '2020-Sep-16 06:32',
          updated: '2020-Sep-16 06:33'
        },
        {
          type: 'table',
          name: 'new table',
          created: '2020-Sep-16 01:36',
          updated: '2020-Sep-16 07:33'
        },
        {
          type: 'pie',
          name: 'temp vs humidity Pie',
          created: '2020-Sep-16 02:10',
          updated: '2020-Sep-16 04:21'
        }
      ]
    }
  },
  mounted () {
    this.loadSavedViews()
  }
}
</script>

<style lang="scss" scoped>
  .builders-wrap {
    margin: 0 auto;
    padding: 20px;
    margin-bottom: 60px;
    .card {
      margin-bottom: 20px;
      padding: 10px;
      &.select-entity-card {
        padding-bottom: 30px;
        ul {
          list-style: none;
          padding-left: 0px;
          li {
            padding: 10px 5px;
            cursor: pointer;
          }
        }
        .entity-options {
          display: flex;
          padding-top: 10px;
          justify-content: space-between;
        }
      }
    }
    .create-view-btn {
      width: 120px;
    }
    .filter-view {
      width: 350px;
      margin-bottom: 20px;
      margin-top: 10px;
    }
  }
</style>

<style lang="scss">
  .bp-dropdown {
    .bp-dropdown__btn {
      min-width: 120px;
      height: 40px;
      font-size: 14px;
      border-radius: 4px;
    }
  }
</style>
