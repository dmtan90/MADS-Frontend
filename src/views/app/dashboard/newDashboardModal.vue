<template>
  <b-modal id="new-dashboard-modal" ref="dashboardModal" size="lg" hide-footer>
    <div class="new-dashboard-wrap">
      <h2>New Dashboard</h2>
      <div class="dashboard-name-wrap">
        <svg class="icon dashboard-icon">
          <use xlink:href="/assets/img/mads-app-icons.svg#mads-dashboard"></use>
        </svg>
        <b-input class="name-input" v-model="name" placeholder="Enter dashboard name"></b-input>
      </div>
      <div class="button-group">
        <b-button @click="closeModal()">Cancel</b-button>
        <b-button @click="createDashboard()" class="create-btn">Create</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    createDashboard () {
      this.closeModal()
      this.$emit('create-dashboard', this.name)
    },
    closeModal () {
      this.$refs['dashboardModal'].hide()
    }
  }
}
</script>

<style lang="scss" scoped>
  .new-dashboard-wrap {
    padding: 45px 45px 30px;
    text-align: center;
    .dashboard-name-wrap {
      display: flex;
      margin-top: 30px;
      margin-bottom: 30px;
      align-items: center;
      justify-content: center;
      .dashboard-icon {
        width: 45px;
        height: 45px;
        margin-right: 20px;
      }
      span {
        font-size: 18px;
        padding-right: 10px;
      }
      .name-input {
        width: 400px;
        height: 35px;
        border: 1px solid #000 !important;
      }
    }
    .button-group {
      margin-top: 30px;
      margin-bottom: 20px;
      .btn {
        width: 120px;
        &.create-btn {
          background-color: #4c92c3 !important;
          color: white !important;
        }
      }
    }
  }
</style>
