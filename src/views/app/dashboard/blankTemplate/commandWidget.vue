<template>
  <div class="command-widget-wrap">
    <h2>{{commandWidgetObject[item.i].label}}</h2>
    <div v-for="(setting, key) in getCommandDataSettings(item)" :key="key" class="command-widget">
      <div v-if="setting.html_type === 'range'" class="range-wrap setting-wrap">
        <div class="label-wrap">
          <h2>{{ $_.replace(key, '_', ' ') }}</h2>
          <div>
            <span class="text">Value:</span>
            <span class="value">{{ setting.value }}</span>
          </div>
        </div>
        <b-form-input v-model="setting.value" type="range" :min="setting.min" :max="setting.max" step="0.5"></b-form-input>
      </div>
      <div v-if="setting.html_type === 'color'" class="setting-wrap">
        <div class="label-wrap">
          <h2>{{ $_.replace(key, '_', ' ') }}</h2>
        </div>
        <div class="color-wrap">
          <span>{{ setting.value || '#000000'}}</span>
          <b-form-input v-model="setting.value" type="color"></b-form-input>
        </div>
      </div>
      <div v-if="setting.html_tag === 'select'" class="select-wrap">
        <div class="label-wrap">
          <h2>{{ $_.replace(key, '_', ' ') }}</h2>
        </div>
        <b-form-radio-group v-model="setting.value">
          <b-form-radio :value="value" v-for="(value, key) in setting.source" :key="key">{{ key }}</b-form-radio>
        </b-form-radio-group>
      </div>
    </div>
    <div class="btn-wrap">
      <b-button class="btn" @click="updateCommandWidget(commandWidgetObject[item.i])">Apply</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dashboardService from '@/services/dashboard.service'

export default {
  data () {
    return {}
  },
  props: {
    commandWidgetObject: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCommandDataSettings (item) {
      return this.commandWidgetObject[item.i].data_settings
    },
    updateCommandWidget (widget) {
      let loader = this.$loading.show()

      let config = { orgId: this.currentUser.org.id, panelId: this.selectedPanel.id, id: widget.id }

      let dataSettings = this.$_.merge({}, widget.data_settings)

      this.$_.forEach(dataSettings, (setting) => {
        if (setting.html_type === 'color') {
          setting.value = this.hexToRgb(setting.value)
        }
      })

      let params = {
        data_settings: dataSettings
      }
      dashboardService.updateCommandWidget(config, params)
        .then((response) => {
          loader.hide()
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedDashboard', 'selectedPanel'])
  }
}
</script>

<style lang="scss" scoped>
  .command-widget-wrap {
    padding: 20px;
    overflow: auto;
    height: 100%;
    > h2 {
      margin-bottom: 40px;
      font-size: 18px;
      font-weight: bold;
      color: #000000;
    }
    .command-widget {
      margin-bottom: 22px;
      .setting-wrap {
        display: flex;
        align-items: center;
        .label-wrap {
          width: 100px;
          h2 {
            font-size: 16px;
            color: #000000;
            margin-bottom: 0;
            text-transform: capitalize;
          }
          .text {
            color: #6D6E71;
            font-size: 13px;
            padding-top: 4px;
            display: inline-block;
          }
          .value {
            color: #4292D4;
            font-size: 13px;
            font-weight: bold;
          }
        }
        input {
          width: calc(100% - 100px);
        }
      }
      .color-wrap {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background-color: #F3F7FB;
        width: 120px;
        height: 45px;
        border-radius: 4px;
        span {
          display: inline-block;
          color: #303033;
          width: 60px;
          text-transform: uppercase;
        }
        input {
          border: none;
          width: 35px;
          height: 38px;
          cursor: pointer;
          padding: 0;
          background-color: #F3F7FB !important;
        }
      }
      .select-wrap {
        .label-wrap {
          margin-bottom: 10px;
        }
        h2 {
          font-size: 16px;
          color: #000000;
          margin-bottom: 0;
          text-transform: capitalize;
        }
      }
    }
    .btn-wrap {
      .btn {
        background-color: #27AAE1 !important;
        color: white !important;
        border: 1px solid #27AAE1 !important;
        font-size: 13px;
        height: 45px;
        padding: 0 10px;
        width: 180px;
        text-transform: uppercase;
        margin-top: 20px;
      }
    }
  }
</style>
