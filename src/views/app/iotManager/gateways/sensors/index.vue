<template>
    <div class="sensor-tab">
        <template v-if="isEdit">
            <div class="edit-tree">
                <mads-tree ref="tree" :treeView="'file'" :treeOptions="treeOptions" @on-node-select="onSelectEntity" :selectedNodes="getSelectedEntity()" :isAnyNodeSelected="isAnyNodeSelected"></mads-tree>
            </div>
            <div class="button-box">
                <button class="btn save-btn" @click="save()">Save</button>
                <button class="btn cancel-btn" @click="cancel()">Cancel</button>
            </div>
        </template>
        <template v-else>
            <div class="show-tree">
                <mads-tree ref="tree" :treeView="'file'" :treeOptions="treeOptions" @on-node-select="onSelectEntity" :selectedNodes="getSelectedEntity()" :isAnyNodeSelected="isAnyNodeSelected"></mads-tree>
            </div>
            <svg class="icon" @click="editSensor()">
                <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
            </svg>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import madsTree from '../../../shared/madsTree/index'

export default {
  components: {
    madsTree
  },
  props: {

  },
  data () {
    return {
      treeOptions: {
        selectable: true,
        singleSelect: true
      },
      isAnyNodeSelected: false,
      selectedParentEntityId: null,
      isEdit: false
    }
  },
  methods: {
    onSelectEntity (event, entity) {
      // if (event) {
      //     this.gateway.parent_id = entity.id
      //     this.gateway.parent_type = entity.type
      // } else {
      //     this.gateway.parent_id = null
      //     this.gateway.parent_type = ''
      // }
    },
    getSelectedEntity () {
      return [{ id: this.selectedParentEntityId }]
    },
    editSensor () {
      this.isEdit = true
    },
    save () {

    },
    cancel () {
      this.isEdit = false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject', 'selectedGateway'])
  },
  mounted () {
    // this.initTreeData()
  }
}
</script>

<style lang="scss" scoped>
.sensor-tab{
    border: 1px solid #3883fa;
    position: relative;
    .button-box{
        padding: 50px;
    }
    .icon {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      width: 40px;
      height: 40px;
      background-color: #9BCCE5;
      border-radius: 20px;
      padding: 8px;
    }
}
</style>
