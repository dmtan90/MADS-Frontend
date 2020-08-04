<template>
  <div class="">
    <h3>{{editMode ? 'Edit' : 'Add'}} Gateway </h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Gateway Name" label-for="gateway-name">
          <b-form-input v-model="gateway.name" type="text" id="gateway-name"></b-form-input>
        </b-form-group>
        <b-form-group label="Gateway Channel" label-for="gateway-type">
          <multiselect v-model="selectedGatewayType" :options="gatewayTypes" @select="onSelectGatewayType" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
        </b-form-group> 
        <b-form-group label="Gateway Description" label-for="gateway-description" class="description">
          <b-form-textarea v-model="gateway.description" id="gateway-type-description" rows="6" max-rows="6"></b-form-textarea>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="position">
      <b-form>
        <b-form-group label="Position" class="hierarchy"></b-form-group>
      </b-form>
      <div class="select-asset">
        <div class="vue-tree-container">
          <mads-tree ref="tree" :treeView="'file'" :treeOptions="treeOptions" @on-node-select="onSelectEntity" :selectedNodes="getSelectedEntity()" :isAnyNodeSelected="isAnyNodeSelected"></mads-tree>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sensorTypeService from '@/services/sensorType.service'
import madsTree from './../../shared/madsTree/index'
import userService from '@/services/user.service'

export default {
  components: {
    madsTree
  },
  props: {
    selectedSectionIndex: {
      type: Number,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    },
    gatewayData: {
      type: Object
    },
    source: {
      type: String,
      required: true
    },
    entityMapParentNode: {
      default: null
    }
  },
  data () {
    return {
      selectedGatewayType: null,
      gatewayTypes: ["http","mqtt"],
      caretakers: [],
      gateway: {},
      orgData: null,
      treeData: null,
      treeOptions: {
        selectable: true,
        singleSelect: true
      },
      isAnyNodeSelected: false,
      selectedParentEntityId: null
    }
  },
  methods: {
    loadUsers () {
      let config = { orgId: this.currentUser.org.id }
      userService.read(config, { page_size: 10 })
        .then((response) => {
          this.caretakers = response.users
        })
    },
    onSelectGatewayType (channel) {
      console.log("gatewayType",channel)
      this.gateway.channel = channel;
    },
    onSelectCaretaker (caretaker) {
    },
    onSelectEntity (event, entity) {
      if (event) {
        this.gateway.parent_id = entity.id
        this.gateway.parent_type = entity.type
      } else {
        this.gateway.parent_id = null
        this.gateway.parent_type = ''
      }
    },
    getGatewayData () {
      return this.gateway
    },
    getCaretakerName (caretaker) {
      return caretaker.first_name + ' ' + (caretaker.last_name || '')
    },
    getSelectedEntity () {
      return [{ id: this.selectedParentEntityId, type: this.gateway.parent_type }]
    },
    genrateString(){
      return (Math.random().toString(36)+'uygsshssygugdugsssgvb').slice(2, 100+2);
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  },
  mounted () {
    this.loadUsers()
    if(this.gatewayData){
      this.gateway = {
        name: this.gatewayData.name || '',
        description: this.gatewayData.description || '',
        channel: this.gatewayData.channel || '',
        parent_type: this.gatewayData.parent_type,
        parent_id: this.gatewayData.parent_id
      }
      this.selectedGatewayType = this.gatewayData.channel || ''

      if (this.gatewayData.parent_type === 'Asset') {
        this.isAnyNodeSelected = true
      }

      if (this.gateway.parent_type === 'Asset') {
        this.selectedParentEntityId = this.gatewayData.parent_id
      }
    }else{
      this.gateway = {
        name: '',
        description:  '',
        channel: '',
        parent_type: '',
        parent_id: null,
        access_token: this.genrateString()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  h3 {
    margin-bottom: 20px;
  }
  .details {
    .description {
      height: 225px;
    }
  }
  .position {
    .hierarchy {
      .custom-radio {
        width: 48%;
        display: inline-block;
      }
    }
    .select-asset {
      height: 320px;
      .vue-tree-container {
        border: 1px solid #e2e2e2;
        height: 250px;
        border-radius: 4px;
        padding-bottom: 20px;
        overflow: auto;
      }
    }
  }
  .metadata-group {
    margin-bottom: 45px;
    .horizontal-form {
      .name {
        width: 30%;
        margin-right: 5px;
      }
      .data-type {
        width: 20%;
        margin-right: 5px;
      }
      .unit {
        width: 15%;
        margin-right: 5px;
      }
      .value {
        width: 25%;
      }
    }
  }
</style>

<style lang="scss">
  .modal-body {
    padding: 0;
    .right-panel {
      .horizontal-form {
        fieldset {
          display: inline-block;
        }
      }
    }
  }
</style>
