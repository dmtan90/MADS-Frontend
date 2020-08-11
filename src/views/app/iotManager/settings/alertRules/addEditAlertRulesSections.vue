<template>
  <div class="">
    <h3>{{editMode ? 'Edit' : 'Add'}} Alerts Rule </h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Rule Name" label-for="rule-name">
          <b-form-input v-model="alertRule.rule_name" type="text" id="rule-name"></b-form-input>
        </b-form-group>
        <b-form-group label="Rule Severity" label-for="rule-severity">
          <multiselect v-model="selectedSeverity" :options="severity" @select="onSelectSeverity" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
        </b-form-group>
        <b-form-group label="Project" label-for="project">
          <multiselect v-model="selectedProject" :options="projects" @select="onSelectProject" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="name"></multiselect>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="position">
      <b-tabs pills card>
        <b-tab title="Data" >
          <div class="select-asset">
            <div class="vue-tree-container">
              <mads-tree ref="tree" :treeView="'file'" :treeOptions="treeOptions" @on-node-select="onSelectEntity" :selectedNodes="getSelectedEntity()" :hiddenEntities="[]" :selectableEntities="['SensorParameter']" :isAnyNodeSelected="isAnyNodeSelected"></mads-tree>
            </div>
          </div>
        </b-tab>
        <b-tab title="Policy">
        <b-form-group label="Policy Type" label-for="policy-type">
          <multiselect v-model="selectedPolicyType" :options="policyType" @select="onSelectPolicyType" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
        </b-form-group>
         <b-form-group label="Conditions" label-for="policy">
          <multiselect v-model="selectedPolicy" :options="policies" @select="onSelectPolicy" :select-label="''" :selected-label="''" :deselect-label="''" label="policy_name" track-by="policy_name"></multiselect>
        </b-form-group>
        <template v-if="ruleParameters.length > 0">
          <b-form-group v-for="(ruleParameter, index) in ruleParameters" :key="index" :label="ruleParameter.key" :label-for="ruleParameter.key">
            <b-form-input v-model="policyParameter[ruleParameter.key]" type="text" :id="ruleParameter.key"></b-form-input>
          </b-form-group>
        </template>
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
            <multiselect v-model="emailRecipents" :options="users" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Select Recipients" :preselect-first="true" label="email" track-by="id">
              <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
            </multiselect>
            <!-- <br /> -->
            <!-- <code>{{emailRecipents}}</code> -->
          </b-form-group>
        </b-tab>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import madsTree from './../../../shared/madsTree/index'
import userService from '@/services/user.service'
import projectService from '@/services/project.service'
import policiesService from '@/services/policies.service'

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
      selectedSeverity: null,
      selectedProject: null,
      severity: ['warning', 'low', 'high', 'severe'],
      projects: [],
      policies: [],
      policyType: ['user', 'project'],
      selectedPolicy: null,
      selectedPolicyType: null,
      alertRule: {},
      orgData: null,
      treeData: null,
      treeOptions: {
        selectable: true,
        singleSelect: true
      },
      isAnyNodeSelected: false,
      selectedParentEntityId: null,
      selectedMedia: [],
      emailRecipents: null,
      users: [],
      ruleParameters: [],
      policyParameter: {}
    }
  },
  methods: {
    loadUsers () {
      let config = { orgId: this.currentUser.org.id }
      userService.read(config, { page_size: 10 })
        .then((response) => {
          this.users = response.users
        })
    },
    loadProjects () {
      let config = { orgId: this.currentUser.org.id }
      projectService.read(config, { page_number: 1, page_size: 10 })
        .then((response) => {
          this.projects = response.projects
        })
    },
    loadPolicy (projectId) {
      let config = { orgId: this.currentUser.org.id, projectId: projectId }
      policiesService.read(config)
        .then((response) => {
          this.policies = response.policies
        })
    },
    onSelectSeverity (severity) {
      this.alertRule.severity = severity
    },
    onSelectProject (project) {
      this.loadPolicy(project.id)
      this.alertRule.project_id = project.id
    },
    onSelectPolicy (policy) {
      this.ruleParameters = policy ? policy.rule_parameters : []
      this.alertRule.policy_name = policy.policy_module
    },
    onSelectPolicyType (policyType) {
      let typeArr = []
      typeArr.push(policyType)
      this.alertRule.policy_type = typeArr
    },
    onSelectCaretaker (caretaker) {
    },
    onSelectEntity (event, entity) {
      if (event) {
        this.alertRule.entity_parameters = {
          data_type: entity.type,
          name: entity.name,
          unit: entity.unit,
          uuid: entity.uuid
        }
        this.alertRule.entity_id = entity.parentId
      } else {
        this.alertRule.entity_parameters = {}
        this.alertRule.entity_id = null
      }
    },
    getAlertRulesData () {
      let assigneeIds = this.$_.map(this.emailRecipents, (recipent) => recipent.id)
      this.alertRule.recepient_ids = assigneeIds
      this.alertRule.assignee_ids = assigneeIds
      this.alertRule.rule_parameters = this.policyParameter
      this.alertRule.communication_medium = this.selectedMedia
      return this.alertRule
    },
    getSelectedEntity () {
      return [{ id: this.selectedParentEntityId, type: 'Asset' }]
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadProjects()
    this.loadUsers()
    if (this.alertRulesData) {
      this.alertRule = {
        app: this.alertRulesData.app,
        communication_medium: this.alertRulesData.communication_medium,
        creator_id: this.alertRulesData.creator_id,
        entity: this.alertRulesData.entity,
        policy_name: this.alertRulesData.policy_name,
        entity_parameters: this.alertRulesData.entity_parameters,
        rule_parameters: this.alertRulesData.rule_parameters,
        recepient_ids: this.alertRulesData.recepient_ids,
        assignee_ids: this.alertRulesData.assignee_ids,
        policy_type: this.alertRulesData.policy_type,
        severity: this.alertRulesData.severity,
        status: this.alertRulesData.status,
        rule_name: this.alertRulesData.rule_name,
        project_id: this.alertRulesData.project_id
      }
      // this.selectedProject = this.$_.filter(this.projects, (project) => project.id === this.alertRulesData.project_id)[0]
      // this.selectedSeverity =
      // let project = this.$_.filter(this.projects, (project) => project.id === this.alertRulesData.project_id)[0]
      // console.log("project",project)
    } else {
      this.alertRule = {
        app: 'iot_manager',
        communication_medium: [],
        creator_id: this.currentUser.id,
        entity: 'sensor',
        entity_id: null,
        policy_name: '',
        entity_parameters: {},
        rule_parameters: {},
        recepient_ids: [],
        assignee_ids: [],
        policy_type: [],
        severity: '',
        status: 'enable',
        rule_name: '',
        project_id: ''
      }
    }
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
