<template>
  <div class="">
    <h3>{{editMode ? 'Edit' : 'Add'}} Alert Rule </h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Rule Name" label-for="rule-name">
          <b-form-input v-model="alertRule.rule_name" type="text" id="rule-name" placeholder="Rule Name"></b-form-input>
        </b-form-group>
        <b-form-group label="Rule Severity" label-for="rule-severity">
          <multiselect v-model="selectedSeverity" :options="severity" @select="onSelectSeverity" :select-label="''" :selected-label="''" :deselect-label="''" label="label" track-by="label" placeholder="Rule Severity"></multiselect>
        </b-form-group>
        <b-form-group label="Project" label-for="project">
          <multiselect v-model="selectedProject" :options="projects" @select="onSelectProject" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="name" placeholder="Project"></multiselect>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="position">
      <b-tabs pills card>
        <b-tab title="Data" >
          <div class="select-asset">
            <div class="vue-tree-container">
              <mads-tree ref="tree"
                :treeView="'file'"
                :treeOptions="treeOptions"
                :selectedNodes="getSelectedEntity()"
                :hiddenEntities="[]"
                :selectableEntities="['SensorParameter']"
                :isAnyNodeSelected="isAnyNodeSelected"
                :type="'organization'"
                @on-node-select="onSelectEntity">
              </mads-tree>
            </div>
          </div>
        </b-tab>
        <b-tab title="Policy">
         <b-form-group label="Policy" label-for="policy">
          <multiselect v-model="selectedPolicy" :options="policies" @select="onSelectPolicy" :select-label="''" :selected-label="''" :deselect-label="''" label="policy_name" track-by="policy_name" placeholder="Policy"></multiselect>
        </b-form-group>
        <template v-if="ruleParameters.length > 0">
          <b-form-group v-for="(ruleParameter, index) in ruleParameters" :key="index" :label="ruleParameter.key === 'lower_limit'? 'Lower Limit' : 'Upper Limit'" :label-for="ruleParameter.key">
            <b-form-input v-model="policyParameter[ruleParameter.key]" type="text" :id="ruleParameter.key"></b-form-input>
          </b-form-group>
        </template>
        </b-tab>
      </b-tabs>
    </section>
    <section v-if="selectedSectionIndex === 3" class="position">
      <b-form-group label="Rate Limit Name" label-for="rate-limit-name">
        <multiselect v-model="rateLimit" :options="rateLimitArr" placeholder="Select Rate Limit"></multiselect>
      </b-form-group>
    </section>
    <section v-if="selectedSectionIndex === 4" class="position">
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
          <template v-for="(media, index) in selectedMedia">
            <template v-if="media === 'e-mail'">
              <b-form-group label="Email Recipients" label-for="rule-name" :key="index">
                <multiselect v-model="emailRecipents" :options="users" :multiple="true" :custom-label="getUserName" :close-on-select="false"  placeholder="Select Recipients" label="email" track-by="id"></multiselect>
              </b-form-group>
            </template>
            <template v-if="media === 'sms'">
              <b-form-group label="Phone Number" label-for="mobile-number" :key="index">
                <b-form-input v-model="alertRule.phone_number" type="text" id="mobile-number" placeholder="Enter Mobile Number"></b-form-input>
              </b-form-group>
            </template>
            <template v-if="media === 'in-app'">
              <b-form-group label="Whatsapp Number" label-for="whatsapp-number" :key="index">
                <b-form-input v-model="alertRule.whatsapp_number" type="text" id="whatsapp-number" placeholder="Enter Whatsapp Number"></b-form-input>
              </b-form-group>
            </template>
          </template>
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
import policyService from '@/services/policy.service'

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
      severity: [
        { id: 1, name: 'Low', label: '1 (Low)' },
        { id: 2, name: 'Medium', label: '2 (Medium)' },
        { id: 3, name: 'High', label: '3 (High)' }
      ],
      projects: [],
      policies: [],
      selectedPolicy: null,
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
      policyParameter: {},
      rateLimit: null,
      rateLimitArr: ['5 minutes', '10 minutes', '60 minutes', '3 hours', '12 hours', '24 hours', '48 hours']
    }
  },
  methods: {
    loadUsers () {
      let config = { orgId: this.currentUser.org.id }
      userService.read(config, { page_size: 10 })
        .then((response) => {
          this.users = response.users

          if (this.editMode) {
            let recepientIds = this.$_.map(this.alertRule.recepient_ids, (recepient) => recepient.id)
            this.emailRecipents = this.$_.filter(this.users, (user) => this.$_.includes(recepientIds, user.id))
          }
        })
    },
    loadProjects () {
      let config = { orgId: this.currentUser.org.id }
      projectService.read(config, { page_number: 1, page_size: 10 })
        .then((response) => {
          this.projects = response.projects
          let projects = response ? response.projects : []
          this.selectedProject = this.$_.filter(projects, (project) => project.id === this.alertRule.project_id)[0]
        })
    },
    loadPolicies () {
      let config = { orgId: this.currentUser.org.id }
      policyService.read(config)
        .then((response) => {
          this.policies = response.policies

          if (this.editMode) {
            this.selectedPolicy = this.$_.find(this.policies, (policy) => policy.policy_module === this.alertRule.policy_name)
            this.onSelectPolicy(this.selectedPolicy)
          }
        })
    },
    onSelectSeverity (severity) {
      this.alertRule.severity = severity.name
    },
    onSelectProject (project) {
      this.alertRule.project_id = project.id
    },
    onSelectPolicy (policy) {
      this.ruleParameters = policy ? policy.rule_parameters : []
      this.alertRule.policy_name = policy.policy_module
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
      return [{ id: this.alertRule.entity_parameters.uuid, type: 'SensorParameter' }]
    },
    getUserName (user) {
      return user.first_name + ' ' + (user.last_name || '')
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadProjects()
    this.loadUsers()
    this.loadPolicies()

    if (this.alertRulesData) {
      this.alertRule = this.alertRulesData
      this.selectedSeverity = this.$_.filter(this.severity, (severity) => severity.id === this.alertRulesData.severity)[0]
      this.policyParameter = this.alertRule.rule_parameters

      this.isAnyNodeSelected = true

      this.selectedMedia = this.alertRulesData.communication_medium || []
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
