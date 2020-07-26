<template>
  <app-window :appName="'Data_Cruncher'">
    <template v-slot:content>
      <data-cruncher v-if="appVuexState.currentSection === 'dataCruncher'"></data-cruncher>
      <workspace v-if="appVuexState.currentSection === 'workspace'"></workspace>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import dataCruncher from './dataCruncher'
import workspace from './workspace/index'
import { Socket } from 'phoenix-socket'

export default {
  components: {
    appWindow,
    dataCruncher,
    workspace
  },
  computed: {
    appVuexState () {
      return this.$store.state.appWindow['Data_Cruncher']
    }
  },
  mounted () {
    let socket = new Socket('ws://localhost:4000/socket', { params: { token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhY3FkYXRfYXBpIiwiZXhwIjoxNTk2MzU1NzkxLCJpYXQiOjE1OTU3NTA5OTEsImlzcyI6ImFjcWRhdF9hcGkiLCJqdGkiOiI1MjczOGI0YS0wMmQ1LTQ5OTUtOWM2ZC1lYjkxNTIzYWM2NzYiLCJuYmYiOjE1OTU3NTA5OTAsInN1YiI6IjEiLCJ0eXAiOiJyZWZyZXNoIn0.F0ceE-xRnc2DqJeyUkx2Dp2xB_Qr7R7_nufDovhl6r4T6lmIkcxMcDykbnFjmcB5o9ExiPZ2tX92EmY6msiflw' } })
    socket.connect()

    this.channel = socket.channel('tasks:123', {})

    this.channel.join()
      .receive('ok', resp => { console.log('Feed Joined successfully', resp) })
      .receive('error', resp => { console.log('Feed Unable to join', resp) })

    this.channel.on('response:updated', payload => {
      console.log('from Phoenix', payload)
    })
  }
}
</script>
