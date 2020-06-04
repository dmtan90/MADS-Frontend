<template>
  <tree
    :data="treeData"
    :options="treeOptions"
    :treeView="treeView"
    :isAnyNodeSelected="isAnyNodeSelected"
    @on-expand-collapse-click="onNodeExpandCollapse"
    @on-add-sibling-node="onAddSiblingNode"
    @on-add-child-node="onAddChildNode"
    @on-node-click="onNodeClick"
    @on-node-select="onNodeSelect"
  >
  </tree>
</template>

<script>
import tree from './renderTree.js'

export default {
  components: {
    tree
  },
  props: {
    treeData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    treeOptions: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },
    treeView: {
      type: String,
      default: 'map'
    },
    isAnyNodeSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedNodes: [],
      childrenKey: 'children'
    }
  },
  methods: {
    onNodeClick (event, data) {
      this.$emit('on-node-click', event, data)
    },
    onNodeExpandCollapse (event, data) {
      this.$set(data.options, 'expanded', !data.options.expanded)
      this.treeData = this.$_.assign({}, this.treeData)
    },
    onAddSiblingNode (event, data) {
      this.$emit('on-add-sibling-node', event, data)
    },
    onAddChildNode (event, data) {
      this.$emit('on-add-child-node', event, data)
    },
    onNodeSelect (event, data) {
      this.$set(data.options, 'selected', event)
      if (this.treeOptions.singleSelect) {
        this.isAnyNodeSelected = event
        this.treeData = this.$_.assign({}, this.treeData)
      }

      this.$emit('on-node-select', event, data)
    },
    getNodes (data) {
      if (data.options.selected) {
        let formattedData = data
        delete formattedData['options']

        this.selectedNodes = this.$_.concat(this.selectedNodes, formattedData)
      }

      this.$_.map(data[this.childrenKey] || [], (node) => {
        this.getNodes(node)
      })
    },
    getCheckedNodes () {
      this.selectedNodes = []
      this.childrenKey = this.treeOptions.childrenKey
      this.getNodes(this.treeData)
      return this.selectedNodes
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-tree.map {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  .tree-node-container {
    text-align: center;
    position: relative;
    .tree-node {
      margin: 0 20px 20px;
      position: relative;
      display: flex;
      justify-content: center;
      .tree-node-label {
        position: relative;
        cursor: pointer;
        .label {
          padding: 10px 20px;
          display: inline-block;
          // border: 1px solid #FF5733;
          border-radius: 4px;
          min-width: 100px;
          text-align: center;
          display: flex;
          align-items: center;
          .icon {
            width: 18px;
            height: 18px;
            margin-right: 5px;
          }
        }
        .add-sibling-node-container {
          display: none;
          position: absolute;
          right: -127px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 999;
          padding-left: 7px;
          .add-sibling-node {
            border: 1px solid #FF5733;
            border-radius: 4px;
            box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
            padding: 5px 10px;
            background-color: #FF5733;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon {
              width: 18px;
              height: 18px;
              fill: #ffffff;
            }
            span {
              padding-left: 5px;
              color: #ffffff;
            }
            .arrow-left {
              position: absolute;
              left: 0px;
              top: 50%;
              transform: translateY(-50%);
              width: 0;
              height: 0;
              border-top: 7px solid transparent;
              border-bottom: 7px solid transparent;
              border-right: 7px solid #FF5733;
            }
          }
        }
        .add-child-node-container {
          display: none;
          position: absolute;
          left: 50%;
          bottom: -37px;
          transform: translateX(-50%);
          z-index: 999;
          padding-top: 7px;
          width: 120px;
          justify-content: center;
          .add-child-node {
            border: 1px solid #FF5733;
            border-radius: 4px;
            box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
            padding: 5px 10px;
            background-color: #FF5733;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon {
              width: 18px;
              height: 18px;
              fill: #ffffff;
            }
            span {
              padding-left: 5px;
              color: #ffffff;
            }
            .arrow-up {
              position: absolute;
              top: 0px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 7px solid transparent;
              border-right: 7px solid transparent;
              border-bottom: 7px solid #FF5733;
            }
          }
        }
        &:hover {
          .add-sibling-node-container, .add-child-node-container {
            display: flex;
          }
        }
      }
      .icon-container {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 50%;
        bottom: -30px;
        transform: translateX(-50%);
        background: white;
        z-index: 1;
        cursor: pointer;
        .icon {
          width: 20px;
          height: 20px;
          fill: #FF5733;
          &.expanded {
            transform:  rotate(-90deg);
          }
          &.collapsed {
            transform: rotate(90deg);
          }
        }
      }
      &.leaf {
        .icon-container {
          display: none;
        }
      }
      &:not(.leaf) {
        &::after {
          content: '';
          position: absolute;
          border-left: 1px solid #FF5733;
          left: 50%;
          bottom: -20px;
          height: 20px;
        }
      }
    }
    .tree-node-children {
      display: flex;
      padding-top: 20px;
      justify-content: center;
      .tree-node-container:not(.single) {
        &::before {
          content: '';
          border-top: 1px solid #FF5733;
          top: -20px;
          position: absolute;
          width: 100%;
          left: 0;
        }
        &:first-child {
          &::before {
            width: 50%;
            left: 50%;
          }
        }
        &:last-child {
          &::before {
            width: 50%;
          }
        }
      }
      .tree-node-container {
        &::after {
          content: '';
          position: absolute;
          border-left: 1px solid #FF5733;
          left: 50%;
          top: -20px;
          height: 20px;
        }
      }
    }
  }
}

.vue-tree.outline {
  margin-top: 30px;
  margin-left: 60px;
  display: flex;
  justify-content: center;
  .tree-node-container {
    position: relative;
    .tree-node {
      margin: 0 20px 20px;
      position: relative;
      display: flex;
      .tree-node-label {
        position: relative;
        cursor: pointer;
        .label {
          padding: 10px 20px;
          display: inline-block;
          // border: 1px solid #FF5733;
          border-radius: 4px;
          height: 40px;
          min-width: 100px;
          text-align: center;
          display: flex;
          align-items: center;
          .icon {
            width: 18px;
            height: 18px;
            margin-right: 5px;
          }
        }
        .add-sibling-node-container {
          display: none;
          position: absolute;
          right: -127px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 999;
          padding-left: 7px;
          .add-sibling-node {
            border: 1px solid #FF5733;
            border-radius: 4px;
            box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
            padding: 5px 10px;
            background-color: #FF5733;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon {
              width: 18px;
              height: 18px;
              fill: #ffffff;
            }
            span {
              padding-left: 5px;
              color: #ffffff;
            }
            .arrow-left {
              position: absolute;
              left: 0px;
              top: 50%;
              transform: translateY(-50%);
              width: 0;
              height: 0;
              border-top: 7px solid transparent;
              border-bottom: 7px solid transparent;
              border-right: 7px solid #FF5733;
            }
          }
        }
        .add-child-node-container {
          display: none;
          position: absolute;
          left: 50%;
          bottom: -37px;
          transform: translateX(-50%);
          z-index: 999;
          padding-top: 7px;
          width: 120px;
          justify-content: center;
          .add-child-node {
            border: 1px solid #FF5733;
            border-radius: 4px;
            box-shadow: 0 1px 5px rgba(0, 0, 0, .15);
            padding: 5px 10px;
            background-color: #FF5733;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon {
              width: 18px;
              height: 18px;
              fill: #ffffff;
            }
            span {
              padding-left: 5px;
              color: #ffffff;
            }
            .arrow-up {
              position: absolute;
              top: 0px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 7px solid transparent;
              border-right: 7px solid transparent;
              border-bottom: 7px solid #FF5733;
            }
          }
        }
        &:hover {
          .add-sibling-node-container, .add-child-node-container {
            display: flex;
          }
        }
      }
      .icon-container {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        position: absolute;
        left: 7px;
        bottom: -7px;
        transform: translateX(-50%);
        background: white;
        z-index: 1;
        cursor: pointer;
        .icon {
          width: 20px;
          height: 20px;
          fill: #FF5733;
          &.expanded {
            transform: rotate(90deg);
          }
        }
      }
      &.leaf {
        .icon-container {
          display: none;
        }
      }
    }
    .tree-node-children {
      display: flex;
      flex-direction: column;
      padding-left: 40px;
      .tree-node-container {
        &:first-child {
          &::after {
            content: '';
            border-left: 1px solid #FF5733;
            position: absolute;
            height: 30px;
            left: -10px;
            top: -20px;
          }
        }
        &:not(:last-child) {
          &::before {
            content: '';
            border-left: 1px solid #FF5733;
            position: absolute;
            height: 100%;
            left: -10px;
            top: 10px;
          }
        }
        .tree-node {
          &::before {
            content: '';
            border-top: 1px solid #FF5733;
            position: absolute;
            width: 30px;
            left: -30px;
            top: 10px;
          }
        }
      }
    }
  }
}

.vue-tree.file {
  margin-top: 30px;
  margin-left: 60px;
  .tree-node-container {
    position: relative;
    .tree-node {
      margin: 0 20px 10px;
      position: relative;
      display: flex;
      align-items: center;
      height: 20px;
      padding-top: 3px;
      .label {
        display: flex;
        padding-left: 3px;
        align-items: center;
        .icon {
            width: 18px;
            height: 18px;
            margin-right: 5px;
          }
      }
      .icon-container {
        width: 16px;
        height: 16px;
        border-radius: 10px;
        position: absolute;
        left: -10px;
        bottom: 2px;
        transform: translateX(-50%);
        background: white;
        z-index: 1;
        cursor: pointer;
        .icon {
          width: 16px;
          height: 16px;
          fill: #FFA07A;
        }
      }
      &.leaf {
        .icon-container {
          display: none;
        }
      }
    }
    .tree-node-children {
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      .tree-node-container {
        &:first-child {
          &::after {
            content: '';
            border-left: 1px solid #FF5733;
            position: absolute;
            height: 30px;
            left: -10px;
            top: -20px;
          }
        }
        &:not(:last-child) {
          &::before {
            content: '';
            border-left: 1px solid #FF5733;
            position: absolute;
            height: 100%;
            left: -10px;
            top: 10px;
          }
        }
        .tree-node {
          &::before {
            content: '';
            border-top: 1px solid #FF5733;
            position: absolute;
            width: 28px;
            left: -30px;
            top: 10px;
          }
        }
      }
    }
  }
}

.vue-tree.map, .vue-tree.outline {
  .tree-node {
    &.organisation {
      span.label {
        background-color: #feae93;
      }
    }
    &.project {
      span.label {
        background-color: #ffe162;
      }
    }
    &.asset {
      span.label {
        background-color: #ffa07a;
      }
    }
    &.sensor {
      span.label {
        background-color: #7ad9ff;
      }
    }
  }
}

.vue-tree {
  .tree-node {
    &.sensor {
      span.label {
        .icon {
          transform: rotate(180deg);
        }
      }
    }
  }
}

</style>

<style lang="scss">
  .vue-tree {
      &.map, &.outline {
        .custom-control {
          display: none;
        }
      }
    }
  .vue-tree.file {
    .custom-control-label {
      &::before, &::after {
        left: 2px;
      }
    }
  }
</style>
