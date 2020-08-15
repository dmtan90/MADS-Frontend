<template>
  <div class="settings">
    <h2>Settings</h2>
    <div>
    <div class="settings-tab">
      <b-tabs pills card>
        <b-tab title="Topology" >
          
        </b-tab>
        <b-tab title="Gateways">
         
        </b-tab>
        <b-tab title=" Alert Rules" active>
          <alert-rules></alert-rules>
        </b-tab>
        <b-tab title="Notifications">
          
        </b-tab>
      </b-tabs>
    </div>
</div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import alertRules from './alertRules'

export default {
  components: {
    alertRules,
  },
  data () {
    return {

    }
  },
  methods: {

  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .settings {
    padding: 20px 0px 0px 20px;
    .settings-tab {
      margin-top: 20px;
      .params-wrap {
        display: flex;
        justify-content: space-between;
        .static-params, .streaming-params {
          width: 45%;
        }
      }
    }
    .static-head-box{
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      .heading{
        font-size: 20px;
        font-weight: 500;
        color: #000;
      }
      button{
        padding: 5px 10px;
        margin-bottom: 10px;
      }
    }
    .edit-gateway, .delete-gateway {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
</style>
