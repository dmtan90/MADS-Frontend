<template>
  <b-modal id="export-dashboard" ref="exportDashboard" size="md" hide-footer @hidden="onCancel()">
    <div class="export-dashboard-modal">
      <h3>Export <b>{{selectedDashboard.name}}</b></h3>
      <div v-if="selectedDashboard.exported_url">
        <div style="margin-top: 30px">Dashboard is already exported</div>
        <div>Below is the exported dashboard url</div>
        <div class="dashboard-url">
          <a :href="selectedDashboard.exported_url.url" target="_blank" class="url">{{selectedDashboard.exported_url.url}}</a>
          <b-button class="copy-btn" @click="copyDashboardUrl(selectedDashboard.exported_url.url)">
            <svg class="icon copy-icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#copy"></use>
            </svg>
            <span>Copy</span>
          </b-button>
        </div>
        <div class="footer">
          <b-button @click="onCancel()">Cancel</b-button>
        </div>
      </div>
      <div v-else>
        <b-form v-if="!exported">
          <b-form-group label="Private Dashboard">
            <toggle-button v-model="exportParams.is_secure" :value="true" :labels="{checked: 'on', unchecked: 'off'}"/>
          </b-form-group>
          <b-form-group label="Password" v-if="exportParams.is_secure">
            <b-form-input v-model="exportParams.password" id="password" type="password" required></b-form-input>
          </b-form-group>
        </b-form>
        <div v-if="exported" class="dashboard-url">
          <a :href="dashboardUrl" target="_blank" class="url">{{dashboardUrl}}</a>
          <b-button class="copy-btn" @click="copyDashboardUrl(dashboardUrl)">
            <svg class="icon copy-icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#copy"></use>
            </svg>
            <span>Copy</span>
          </b-button>
        </div>
        <div class="footer">
          <b-button @click="onCancel()">Cancel</b-button>
          <b-button @click="onExport()" class="save-btn" v-if="!exported">Export</b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import dashboardService from '@/services/dashboard.service'

export default {
  data () {
    return {
      exportParams: {
        'is_secure': true,
        'password': ''
      },
      exported: false,
      dashboardUrl: ''
    }
  },
  methods: {
    open () {
      this.$refs.exportDashboard.show()
    },
    onCancel () {
      this.$refs.exportDashboard.hide()
    },
    onExport () {
      let params = this.exportParams
      let config = { orgId: this.currentUser.org.id, id: this.selectedDashboard.id }

      dashboardService.export(config, params)
        .then((response) => {
          this.dashboardUrl = response.url
          this.exported = true
        })
    },
    copyDashboardUrl (url) {
      this.$copyText(url)
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedDashboard'])
  }
}
</script>

<style lang="scss" scoped>
  .export-dashboard-modal {
    padding: 20px;
    form {
      margin-top: 30px;
    }
    .dashboard-url {
      display: flex;
      align-items: center;
      margin: 30px 0;
      .url {
        overflow: hidden;
        display: inline-block;
        width: calc(100% - 77px);
        background-color: #f2f2f2;
        padding: 10px;
        white-space: nowrap;
      }
      .copy-btn {
        width: 75px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        background-color: green;
        height: 40px;
        color: white;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0 0 auto;
        span {
          padding-left: 5px;
        }
      }
      .copy-icon {
        height: 18px;
        width: 18px;
      }
    }
    .footer {
      text-align: right;
      .save-btn {
        background-color: #4c92c3 !important;
        color: #ffffff !important;
        min-width: 90px;
      }
    }
  }
</style>
