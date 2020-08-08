<template>
  <div class="left-panel">
    <div class="header">
      <div
        class="item"
        :class="{ active: leftPanelSection === 'data' }"
        @click="leftPanelSection = 'data'"
      >
        Data
      </div>
      <div
        class="item"
        :class="{ active: leftPanelSection === 'functions' }"
        @click="leftPanelSection = 'functions'"
      >
        Functions
      </div>
      <div
        class="item"
        :class="{ active: leftPanelSection === 'widgets' }"
        @click="leftPanelSection = 'widgets'"
      >
        Widgets
      </div>
    </div>
    <div id="canvas-options" class="tree-section" v-show="leftPanelSection === 'data'">
      <!-- <div class="section-toggle">
        <div class="section" :class="{ active: treeSection === 'sensor_parameters' }" @click="toggleTreeSection('sensor_parameters')">
          Sensor Parameters
        </div>
        <div class="section" draggable="true" :class="{ active: treeSection === 'asset_properties' }" @click="toggleTreeSection('asset_properties')">
          Asset Properties
        </div>
      </div> -->
      <div class="vue-tree-container">
        <mads-tree
          ref="tree"
          :treeView="'file'"
          :treeOptions="treeOptions"
          :hiddenEntities="[]"
          @on-node-click="onNodeClick"
          @on-node-drag-start="onNodeDragStart"
        ></mads-tree>
      </div>
    </div>
    <div v-if="leftPanelSection === 'functions'">
      <functions @set-dragged-function="onFunctionDragStart" @set-dragged-output="onOutputDragStart"></functions>
    </div>
    <div v-if="leftPanelSection === 'widgets'">
      <widgets @set-dragged-entity-text="onFunctionDragStart"></widgets>
    </div>
  </div>
</template>

<script>
import madsTree from './../../../shared/madsTree/index'
import functions from './functions'
import widgets from './widgets'

export default {
  data () {
    return {
      treeData: null,
      treeOptions: {
      },
      leftPanelSection: 'data',
      treeSection: 'sensor_parameters'
    }
  },
  components: {
    madsTree,
    functions,
    widgets
  },
  methods: {
    onNodeClick (event, data) {
      this.nodeClicked = true
    },
    onNodeDragStart (event, data) {
      this.$emit('drag-input-data', { entity: data.node, settings: { 'background-color': '#7ad9ff' } })
    },
    onFunctionDragStart (data) {
      this.$emit('drag-function', data)
    },
    onOutputDragStart (data) {
      this.$emit('drag-output', data)
    },
    toggleTreeSection (section) {
      this.treeSection = section
      if (this.treeSection === 'sensor_parameters') {
        this.treeData = this.sensorParameterData
      } else {
        this.treeData = this.assetPropertyData
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .left-panel {
    background-color: white;
    padding: 0;
    height: 100%;
    overflow: auto;
    .header {
      display: flex;
      background: #f1f1f1;
      height: 40px;
      .item {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        cursor: pointer;
        &.active {
          background: white;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
    .tree-section {
      .section-toggle {
        display: flex;
        background: #f1f1f1;
        height: 40px;
        margin-bottom: 20px;
        .section {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #cccccc;
          border-bottom: 1px solid #cccccc;
          cursor: pointer;
          &.active {
            background: white;
          }
          &:last-child {
            border-right: none;
          }
        }
      }
    }
  }
</style>
