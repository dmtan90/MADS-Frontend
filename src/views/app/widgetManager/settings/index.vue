<template>
  <div class="settings-wrap">
    <h2>Settings</h2>
    <div class="settings-tab">
      <b-tabs pills card>
        <b-tab title="General" active>
        </b-tab>
        <b-tab title="Widget Store">
        </b-tab>
        <b-tab title="My Widget">
        </b-tab>
        <b-tab title="Editor">
        </b-tab>
        <b-tab title=" Alert Rules">
        </b-tab>
        <b-tab title="Notifications">
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .settings-wrap {
    padding: 40px;
    .settings-tab {
      margin-top: 30px;
    }
    .tabs {
      .nav-item {
        .nav-link {
          border-radius: 0;
          min-width: 130px;
          border: 1px solid #cccccc;
          border-right: 0;
          text-align: center;
          font-size: 15px;
          background-color: #f2f2f2;
          &.active {
            background-color: #ffffff;
            color: #000000;
          }
        }
        &:last-child {
          border-right: 1px solid #cccccc;
        }
      }
      .card-header {
        padding-left: 0;
        .card-header-pills {
          margin: 0;
        }
      }
    }
  }
</style>
