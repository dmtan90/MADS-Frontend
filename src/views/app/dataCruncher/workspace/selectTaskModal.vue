<template>
  <b-modal id="select-task-modal" ref="taskModal" size="md" hide-footer>
    <div class="select-task-wrap">
      <div class="header">
        <svg class="icon workspace-icon">
          <use xlink:href="/assets/img/mads-data-cruncher-icons.svg#workspace"></use>
        </svg>
        <span>Workspace</span>
      </div>
      <div class="button-group">
        <b-button @click="onSelectAction('new')">Create New Task</b-button>
        <b-button @click="onSelectAction('existing')">Open Existing Task</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  methods: {
    onSelectAction (action) {
      this.$refs['taskModal'].hide()
      this.$emit('select-action', action)
    }
  }
}
</script>

<style lang="scss" scoped>
  .select-task-wrap {
    padding: 20px;
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
      margin-top: 20px;
      .workspace-icon {
        width: 40px;
        height: 40px;
      }
      span {
        font-size: 20px;
        padding-left: 10px;
      }
    }
    .button-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      .btn {
        display: block;
        width: 90%;
        margin-bottom: 10px;
        background-color: #4c92c3 !important;
        color: white !important;
        font-size: 16px;
      }
    }
  }
</style>

<style lang="scss">
  #select-task-modal {
    .modal-dialog {
      top: 10%;
    }
  }
</style>
