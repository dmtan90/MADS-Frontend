<template>
  <div class="tree">
    <v-tree ref='tree' :data='treeData' :multiple='multiple' :halfcheck='halfcheck' />
  </div>
</template>

<script>
/* eslint-disable */
import $ from "jquery"

export default {
  props: {
    treeData: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    halfcheck: {
      type: Boolean,
      default: false
    }    
  },
  data () {
    return {}
  },
  methods: {
    getNodes(option) {
      return this.$refs.tree.getNodes({[option]: true})
    }
  },
  updated: function () {
    this.$nextTick(function () {
      $('li.leaf .draggable-element').on('dragstart', function(event) {
        let nodeTitle = this.getAttribute('data-name');
        event.originalEvent.dataTransfer.setData("text/plain", nodeTitle);
      })
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
