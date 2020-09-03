<template>
  <b-modal id="newTab" ref="newTab" size="md" hide-footer>
    <div class="new-tab-wrap">
      <h2>Add Tab</h2>
      <div class="body">
        <b-input placeholder="Name" v-model="name"></b-input>
      </div>
      <div class="footer">
        <b-button @click="onCancel()">Cancel</b-button>
        <b-button @click="onSave()" class="save-btn">Save</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import dasbhoardEventBus from './../dashboardBus'
import dashboardService from '@/services/dashboard.service'

export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    show () {
      this.$refs.newTab.show()
    },
    onCancel () {
      this.$refs.newTab.hide()
    },
    onSave () {
      this.$refs.newTab.hide()

      let config = { orgId: this.currentUser.org.id, dashboardId: this.selectedDashboard.id }
      let payload = { name: this.name }

      dashboardService
        .createDashboardPanel(config, payload)
        .then((panel) => {
          dasbhoardEventBus.$emit('reload-dashboard')
          this.$emit('panel-created', panel)
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedDashboard'])
  }
}
</script>

<style lang="scss" scoped>
  .new-tab-wrap {
    padding: 20px;
    .body {
      margin-top: 30px;
    }
    .footer {
      margin-top: 45px;
      text-align: right;
      .save-btn {
        background-color: #4c92c3 !important;
        color: #ffffff !important;
        min-width: 90px;
      }
    }
  }
</style>
