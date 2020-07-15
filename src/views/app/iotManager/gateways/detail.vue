<template>
  <div class="details">
    <h2>Gateway Setup</h2>
    <div>
    <div class="details-tab">
      <b-tabs pills card>
        <b-tab title="Parameter" active>
          <div class="params-wrap">
            <div class="static-params">
              <h3>Static Parameters</h3>
              <vuetable
                  ref="vuetable"
                  :api-mode="false"
                  :fields="fields"
                  :data="staticParams"
                >
                <template v-slot:checkbox>
                  <b-form-checkbox></b-form-checkbox>
                </template>
                <template v-slot:actions="props">
                  <span class="edit-gateway">Edit</span>
                  <span class="delete-gateway">Delete</span>
                </template>
              </vuetable>
            </div>
            <div class="streaming-params">
              <h3>Streaming Parameters</h3>
              <vuetable
                  ref="vuetable"
                  :api-mode="false"
                  :fields="fields"
                  :data="staticParams"
                >
                <template v-slot:checkbox>
                  <b-form-checkbox></b-form-checkbox>
                </template>
                <template v-slot:actions="props">
                  <span class="edit-gateway">Edit</span>
                  <span class="delete-gateway">Delete</span>
                </template>
              </vuetable>
            </div>
          </div>
        </b-tab>
        <b-tab title="Details">
          <b-card-text>Details</b-card-text>
        </b-tab>
        <b-tab title="Latest Logs">
          <b-card-text>Latest Logs</b-card-text>
        </b-tab>
        <b-tab title="Parameter-Mapping">
          <b-card-text>Parameter Mapping</b-card-text>
        </b-tab>
        <b-tab title="Commands">
          <b-card-text>Commands</b-card-text>
        </b-tab>

      </b-tabs>
    </div>
</div>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import paramFieldDefs from './parametersFieldDef'

export default {
  components: {
    Vuetable
  },
  data () {
    return {
      fields: paramFieldDefs,
      staticParams: [
        {
          id: 1,
          key: 'Name',
          value: 'Value3',
          type: 'Type 1'
        },
        {
          id: 1,
          key: 'Name',
          value: 'Value3',
          type: 'Type 1'
        },
        {
          id: 1,
          key: 'Name',
          value: 'Value3',
          type: 'Type 1'
        },
        {
          id: 1,
          key: 'Name',
          value: 'Value3',
          type: 'Type 1'
        }
      ],
      streamingParams: [
        {
          id: 1,
          key: 'Name',
          value: 'Value3',
          type: 'Type 1'
        },
        {
          id: 1,
          key: 'Name',
          value: 'Value3',
          type: 'Type 1'
        },
        {
          id: 1,
          key: 'Name',
          value: 'Value3',
          type: 'Type 1'
        },
        {
          id: 1,
          key: 'Name',
          value: 'Value3',
          type: 'Type 1'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .details {
    .details-tab {
      margin-top: 20px;
      .params-wrap {
        display: flex;
        justify-content: space-between;
        .static-params, .streaming-params {
          width: 45%;
        }
      }
    }
  }
</style>
