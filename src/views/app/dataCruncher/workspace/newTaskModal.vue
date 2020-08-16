<template>
  <b-modal id="new-task-modal" ref="taskModal" size="lg" hide-footer>
    <div class="new-task-wrap">
      <div class="task-name-wrap">
        <svg class="icon task-icon">
          <use xlink:href="/assets/img/mads-common-icons.svg#task"></use>
        </svg>
        <span>Task Name:</span>
        <b-input class="name-input" v-model="task.name"></b-input>
        <!-- <span>.task</span> -->
      </div>
      <h2>Select Task Type</h2>
      <ul class="task-types">
        <li class="type">
          <div class="type-wrap" @click="selectTaskType('one-time')">
            <span>One-time Task</span>
            <svg class="icon task-icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#one-time-task"></use>
            </svg>
          </div>
          <b-form-radio v-model="task.type" value="one-time"></b-form-radio>
        </li>
        <li class="type">
          <div class="type-wrap" @click="selectTaskType('periodic')">
            <span>Periodic Task</span>
            <svg class="icon task-icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#periodic-task"></use>
            </svg>
          </div>
          <b-form-radio v-model="task.type" value="periodic"></b-form-radio>
        </li>
        <li class="type">
          <div class="type-wrap" @click="selectTaskType('always-on')">
            <span>Always-on Task</span>
            <svg class="icon task-icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#always-on-task"></use>
            </svg>
          </div>
          <b-form-radio v-model="task.type" value="always-on"></b-form-radio>
        </li>
      </ul>
      <div class="button-group">
        <b-button @click="closeModal()">Cancel</b-button>
        <b-button @click="createTask()" class="create-btn">Create</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      task: {
        type: 'one-time',
        name: ''
      }
    }
  },
  methods: {
    selectTaskType (type) {
      this.task.type = type
    },
    createTask () {
      this.closeModal()
      this.$emit('create-task', this.task)
    },
    closeModal () {
      this.$refs['taskModal'].hide()
    }
  }
}
</script>

<style lang="scss" scoped>
  .new-task-wrap {
    padding: 20px 45px;
    text-align: center;
    .task-name-wrap {
      display: flex;
      margin-top: 30px;
      margin-bottom: 30px;
      align-items: center;
      justify-content: center;
      .task-icon {
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
    .task-types {
      list-style: none;
      padding-left: 0;
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      .type {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .type-wrap {
          box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
          height: 180px;
          width: 100%;
          border: 1px solid;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #CFE1F3;
          cursor: pointer;
          .icon {
            width: 49px;
            height: 49px;
          }
          span {
            font-size: 21px;
            padding-bottom: 10px;
          }
        }
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

<style lang="scss">
  .task-types {
    .custom-radio .custom-control-label::before, .custom-radio .custom-control-label::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
