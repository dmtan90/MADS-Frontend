<template>
  <splitpanes horizontal>
    <pane size="60">
      <canvas-panel :draggedEntity="draggedEntity"></canvas-panel>
    </pane>
    <pane size="40">
      <table-panel></table-panel>
    </pane>
  </splitpanes>
</template>

<script>
/* eslint-disable no-undef */

import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import canvasPanel from './canvasPanel'
import tablePanel from './tablePanel'

export default {
  props: {
    draggedEntity: {
      default: {}
    }
  },
  components: {
    Splitpanes,
    Pane,
    canvasPanel,
    tablePanel
  }
}
</script>
