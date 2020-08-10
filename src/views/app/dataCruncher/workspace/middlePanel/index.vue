<template>
  <splitpanes horizontal>
    <pane size="60">
      <canvas-panel :draggedEntity="draggedEntity" @task-created="createTaskChannel"></canvas-panel>
    </pane>
    <pane size="40">
      <table-panel :taskData="taskData"></table-panel>
    </pane>
  </splitpanes>
</template>

<script>
/* eslint-disable no-undef */
import { mapGetters } from 'vuex'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import canvasPanel from './canvasPanel'
import tablePanel from './tablePanel'
import orgService from '@/services/organization.service'
import { Socket } from 'phoenix-socket'

export default {
  props: {
    draggedEntity: {
      default: {}
    }
  },
  data () {
    return {
      socket: null,
      taskData: []
    }
  },
  components: {
    Splitpanes,
    Pane,
    canvasPanel,
    tablePanel
  },
  methods: {
    createSocket (token) {
      this.socket = new Socket('ws://localhost:4000/socket', { params: { token: token } })
      this.socket.connect()
    },
    createTaskChannel (taskID) {
      let channel = this.socket.channel('tasks:' + taskID, {})
      channel.join()
        .receive('ok', resp => { console.log('Feed Joined successfully', resp) })
        .receive('error', resp => { console.log('Feed Unable to join', resp) })

      channel.on('out_put_res', payload => {
        this.formatTaskData(payload)
      })
    },
    formatTaskData ({ task }) {
      this.taskData = []
      this.$_.forEach(task.workflows, (workflow, index) => {
        let workflowOutput = workflow.temp_output[0]

        this.taskData = this.$_.concat(this.taskData, {
          name: 'Workflow ' + (index + 1),
          data: [workflowOutput.data.value]
        })
      })
    },
    getSocketToken () {
      let config = { orgId: this.currentUser.org.id }
      orgService
        .dataCruncherToken(config)
        .then(response => {
          this.createSocket(response.token)
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.getSocketToken()
  }
}
</script>
