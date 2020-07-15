<template>
  <div class="workspace-container">
    <splitpanes vertical v-if="openWorkspace">
      <pane size="20">
        <left-panel @drag-input-data="onInputDataDrag" @drag-function="onFunctionDrag" @drag-output="onOutputDrag"></left-panel>
      </pane>
      <pane size="65" class="middle-panel">
        <middle-panel :draggedEntity="draggedEntity"></middle-panel>
      </pane>
      <pane size="15">
        <right-panel></right-panel>
      </pane>
    </splitpanes>
    <div class="tasks" v-if="openTasks">
      <h2 class="page-heading">Hello {{currentUser.first_name}}, you have {{tasks.length}} tasks</h2>
      <task-list :tasks="tasks" @select-task="onTaskSelect" @new-task="onSelectAction('new')"></task-list>
    </div>
    <select-task-modal ref="selectTaskModal" @select-action="onSelectAction"></select-task-modal>
    <new-task-modal ref="newTaskModal" @create-task="onCreateTask"></new-task-modal>
  </div>
</template>

<script>
/* eslint-disable */

import { mapGetters } from 'vuex'
import 'splitpanes/dist/splitpanes.css'
import { Splitpanes, Pane } from 'splitpanes'
import leftPanel from './leftPanel/index'
import middlePanel from './middlePanel/index'
import rightPanel from './rightPanel/index'
import taskList from './taskList'
import selectTaskModal from './selectTaskModal'
import newTaskModal from './newTaskModal'

export default {
  components: {
    Splitpanes,
    Pane,
    leftPanel,
    middlePanel,
    rightPanel,
    taskList,
    selectTaskModal,
    newTaskModal
  },
  data() {
    return {
      draggedEntity: {},
      tasks: [],
      openWorkspace: false,
      openTasks: false,
      selectedTask: null
    }
  },
  methods: {
    loadTasks () {
      this.tasks = [
        {
          name: 'Task 1',
          type: 'One-Time',
          created_at: '',
          user: 'Arjun Singh',
          updated_at: ''
        },
        {
          name: 'Task 2',
          type: 'One-Time',
          created_at: '',
          user: 'Vikram Singh',
          updated_at: ''
        },
        {
          name: 'Task 3',
          type: 'Periodic',
          created_at: '',
          user: 'Arjun Singh',
          updated_at: ''
        },
        {
          name: 'Task 4',
          type: 'Periodic',
          created_at: '',
          user: 'Vikram Singh',
          updated_at: ''
        },
        {
          name: 'Task 5',
          type: 'Triggered',
          created_at: '',
          user: 'Ayoush Singh',
          updated_at: ''
        }
      ]
    },
    onInputDataDrag ({entity, settings}) {
      this.draggedEntity = {
        entity: entity,
        text: entity.name,
        backgroundColor: settings['background-color'],
        inPorts: [],
        outPorts: [''],
        entityType: 'input'
      }
    },
    onFunctionDrag ({ entity, settings }) {
      this.draggedEntity = {
        entity: entity,
        text: entity.display_name,
        backgroundColor: settings['background-color'],
        inPorts: entity.inports,
        outPorts: entity.outports,
        entityType: 'function'
      }
    },
    onOutputDrag ({ entity, settings }) {
      this.draggedEntity = {
        entity: entity,
        text: entity.name,
        backgroundColor: settings['background-color'],
        inPorts: entity.inports,
        outPorts: entity.outports,
        entityType: 'output'
      }
    },
    onTaskSelect (task) {
      this.selectedTask = task
      this.openWorkspace = true
      this.openTasks = false
    },
    onSelectAction (action) {
      this.taskType = action
      if (action === 'new') {
        this.$refs['newTaskModal'].$refs['taskModal'].show()
      } else {
        this.openTasks = true
      }
    },
    onCreateTask (task) {
      this.selectedTask = task
      this.openWorkspace = true
      this.openTasks = false
    }
  },
  mounted () {
    this.loadTasks()
    this.$refs['selectTaskModal'].$refs['taskModal'].show()
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
  .workspace-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    .tasks {
      width: 90%;
      margin: 0 auto;
      background-color: white;
      padding: 20px;
    }
  }
</style>

<style lang="scss">
  .splitpanes--vertical > .splitpanes__splitter {
    border: 2px solid #cccccc;
  }

  .splitpanes--horizontal > .splitpanes__splitter {
    border: 2px solid #cccccc;
  }
</style>
