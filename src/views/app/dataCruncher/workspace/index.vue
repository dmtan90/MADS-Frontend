<template>
  <div class="workspace-container">
    <splitpanes vertical>
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
  </div>

</template>

<script>
/* eslint-disable */

import 'splitpanes/dist/splitpanes.css'
import { Splitpanes, Pane } from 'splitpanes'
import leftPanel from './leftPanel/index'
import middlePanel from './middlePanel/index'
import rightPanel from './rightPanel/index'

export default {
  components: {
    Splitpanes,
    Pane,
    leftPanel,
    middlePanel,
    rightPanel
  },
  data() {
    return {
      draggedEntity: {}
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .workspace-container {
    width: 100%;
    height: 100%;
    overflow: auto;
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
