<template>
  <div class="tree">
    <v-tree ref='tree' :data='treeData' />
  </div>
</template>

<script>
/* eslint-disable */
import $ from "jquery"

export default {
  props: ['treeData'],
  data () {
    return {}
  },
  methods: {},
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
