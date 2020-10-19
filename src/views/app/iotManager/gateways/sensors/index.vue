<template>
    <div class="sensor-tab">
        <template v-if="isEdit">
            <div class="edit-tree">
              <mads-tree ref="tree"
                :treeView="'file'"
                :treeOptions="treeOptions"
                :selectedNodes="getSelectedEntity()"
                :selectableEntities="['Sensors']"
                :isAnyNodeSelected="isAnyNodeSelected"
                :type="'organization'"
                @on-node-select="onSelectEntity">
              </mads-tree>
            </div>
            <div class="button-box">
                <button class="btn save-btn" @click="save()">Save</button>
                <button class="btn cancel-btn" @click="cancel()">Cancel</button>
            </div>
        </template>
        <template v-else>
            <div class="show-tree">
              <mads-tree ref="tree"
                :treeView="'file'"
                :treeOptions="treeOptions"
                :selectedNodes="getSelectedEntity()"
                :selectableEntities="['Sensor']"
                :isAnyNodeSelected="isAnyNodeSelected"
                :type="'organization'"
                @on-node-select="onSelectEntity">
              </mads-tree>
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
import gatewayService from '@/services/gateway.service'

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
        singleSelect: false
      },
      isAnyNodeSelected: false,
      selectedParentEntityId: null,
      isEdit: false,
      sensorIds: []
    }
  },
  methods: {
    onSelectEntity (event, entity) {
      if (event) {
        this.sensorIds.push(entity.id)
      }
    },
    getSelectedEntity () {
      return [{ id: null, type: 'Sensor' }]
    },
    editSensor () {
      this.isEdit = true
    },
    save () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id, id: this.selectedGateway.id }
      let payload = {
        sensor_ids: this.sensorIds
      }
      gatewayService.associateSensors(config, payload)
        .then((res) => {
          console.log('res', res)
          this.isEdit = false
        })
    },
    cancel () {
      this.isEdit = false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject', 'selectedGateway'])
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
