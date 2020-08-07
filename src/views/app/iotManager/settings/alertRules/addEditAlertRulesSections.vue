<template>
  <div class="">
    <h3>{{editMode ? 'Edit' : 'Add'}} Gateway </h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Rule Name" label-for="rule-name">
          <b-form-input v-model="gateway.name" type="text" id="rule-name"></b-form-input>
        </b-form-group>
        <b-form-group label="Rule Severity" label-for="rule-severity">
          <multiselect v-model="selectedGatewayType" :options="gatewayTypes" @select="onSelectGatewayType" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
        </b-form-group> 
        <b-form-group label="Project" label-for="project">
          <multiselect v-model="selectedGatewayType" :options="gatewayTypes" @select="onSelectGatewayType" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="position">
      <b-tabs pills card>
        <b-tab title="Data" >
          <div class="select-asset">
            <div class="vue-tree-container">
              <mads-tree ref="tree" :treeView="'file'" :treeOptions="treeOptions" @on-node-select="onSelectEntity" :selectedNodes="getSelectedEntity()" :isAnyNodeSelected="isAnyNodeSelected"></mads-tree>
            </div>
          </div>
        </b-tab>
        <b-tab title="Policy">
         <b-form-group label="Policy" label-for="policy">
          <multiselect v-model="selectedGatewayType" :options="gatewayTypes" @select="onSelectGatewayType" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
        </b-form-group>
        </b-tab>
      </b-tabs>
    </section>
    <section v-if="selectedSectionIndex === 3" class="position">
      <b-tabs pills card>
        <b-tab title="Media" >
          <b-form-group label="Media">
            <b-form-checkbox-group id="media" v-model="selectedMedia" name="media">
              <b-form-checkbox value="e-mail">Email</b-form-checkbox>
              <b-form-checkbox value="sms">SMS</b-form-checkbox>
              <b-form-checkbox value="in-app">WhatsApp</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-tab>
        <b-tab title="Recipients">
          <b-form-group label="Email Recipients" label-for="rule-name">
            <b-form-input v-model="gateway.name" type="text" id="rule-name"></b-form-input>
          </b-form-group>
        </b-tab>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sensorTypeService from '@/services/sensorType.service'
import madsTree from './../../../shared/madsTree/index'
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
    alertRulesData: {
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
      alertRule: {},
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
    onSelectGatewayType (channel) {
      this.alertRule.channel = channel;
    },
    onSelectCaretaker (caretaker) {
    },
    onSelectEntity (event, entity) {
      // if (event) {
      //   this.gateway.parent_id = entity.id
      //   this.gateway.parent_type = entity.type
      // } else {
      //   this.gateway.parent_id = null
      //   this.gateway.parent_type = ''
      // }
    },
    getAlertRulesData () {
      return this.alertRule
    },
    getSelectedEntity () {
      return [{ id: this.selectedParentEntityId, type:""}]
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    // this.loadUsers()
    // if(this.gatewayData){
    //   this.gateway = {
    //     name: this.gatewayData.name || '',
    //     description: this.gatewayData.description || '',
    //     channel: this.gatewayData.channel || '',
    //     parent_type: this.gatewayData.parent_type,
    //     parent_id: this.gatewayData.parent_id
    //   }
    //   this.selectedGatewayType = this.gatewayData.channel || ''

    //   if (this.gatewayData.parent_type === 'Asset') {
    //     this.isAnyNodeSelected = true
    //   }

    //   if (this.gateway.parent_type === 'Asset') {
    //     this.selectedParentEntityId = this.gatewayData.parent_id
    //   }
    // }else{
    //   this.gateway = {
    //     name: '',
    //     description:  '',
    //     channel: '',
    //     parent_type: '',
    //     parent_id: null,
    //     access_token: this.genrateString()
    //   }
    // }
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
