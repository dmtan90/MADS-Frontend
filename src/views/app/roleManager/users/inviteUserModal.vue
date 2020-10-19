<template>
  <b-modal id="invite-user-modal" ref="inviteUserModal" size="lg" hide-header hide-footer>
    <div class="modal-heading">
      <h3>{{reinvite ? 'Re-Invite' : 'Invite'}} User</h3>
      <div class="steps-header">
        <div class="current-step">{{currentStep}}/3</div>
        <div class="steps">
          <div class="step" :class="{'completed': currentStep >= 1}"></div>
          <div class="step" :class="{'completed': currentStep >= 2}"></div>
          <div class="step" :class="{'completed': currentStep >= 3}"></div>
        </div>
      </div>
    </div>
    <section v-if="currentStep === 1" class="details">
      <b-form>
        <b-form-group label="Email" label-for="email">
          <b-form-input v-model="inviteEmail" id="email" type="email" required></b-form-input>
        </b-form-group>
        <b-form-group label="Select Role" label-for="role">
          <multiselect v-model="selectedRole" :options="roles" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Select role" label="name" track-by="id">
          </multiselect>
        </b-form-group>
        <b-form-group label="Activity Tracking">
          <toggle-button :value="true" :labels="{checked: 'on', unchecked: 'off'}"/>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="currentStep === 2" class="assets">
      <h5>Select Assets</h5>
      <div class="assets-container">
        <mads-tree ref="tree" :treeView="'file'" :treeOptions="treeOptions"></mads-tree>
      </div>
    </section>
    <section v-if="currentStep === 3" class="apps">
      <h5>Select Apps</h5>
      <apps-list></apps-list>
    </section>
    <div class="footer">
      <b-button  @click="currentStep = 1; $bvModal.hide('invite-user-modal')">Cancel</b-button>
      <b-button v-if="currentStep < 3" @click="next()">Next</b-button>
      <b-button v-if="currentStep === 3" @click="inviteUser()">Save</b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import invitationService from '@/services/invitation.service'
import madsTree from './../../shared/madsTree/index'
import appsList from '../../shared/modalAppsList'
import EventBus from './../eventBus'

export default {
  props: {
    roles: {
      type: Array,
      required: true
    },
    reinvite: {
      type: Boolean,
      default: false
    },
    invitation: {
      default: null
    }
  },
  components: {
    madsTree,
    appsList
  },
  data () {
    return {
      inviteEmail: '',
      currentStep: 1,
      selectedRole: null,
      selectedAssets: [],
      selectedApps: [],
      treeOptions: {
        selectable: true,
        singleSelect: true
      }
    }
  },
  methods: {
    inviteUser () {
      this.$refs.inviteUserModal.hide()
      let payload = {
        invitation: {
          email: this.inviteEmail,
          assets: this.selectedAssets,
          apps: this.selectedApps,
          role_id: this.selectedRole.id
        }
      }
      invitationService.create(payload)
        .then((response) => {
          this.selectedAssets = []
          this.selectedApps = []
          this.selectedRole = null
          this.email = ''

          EventBus.$emit('reload-invite-list')
        })
      this.currentStep = 1
    },
    next () {
      if (this.currentStep === 2) {
        let checkedNodes = this.$refs.treeView.getNodes('checked')
        let halfcheckedNodes = this.$refs.treeView.getNodes('halfcheck')
        this.selectedAssets = this.$_.map(this.$_.concat(checkedNodes, halfcheckedNodes), (node) => {
          return { id: node.id }
        })
      }
      this.currentStep = this.currentStep + 1
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  watch: {
    invitation (invitation) {
      this.inviteEmail = invitation.email
      this.selectedRole = invitation.role
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .modal-heading {
    position: relative;
    margin-bottom: 30px;
    .steps-header {
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      .steps {
        display: flex;
        .step {
          width: 50px;
          height: 5px;
          border: 1px solid #1261A0;
          border-radius: 2px;
          &.completed {
            background-color: #1261A0;
          }
        }
      }
    }
  }
  .assets {
    margin: 0 auto;
    margin-bottom: 20px;
    .assets-container {
      height: 400px;
      overflow: auto;
      border: 1px solid #efefef;
      padding: 20px 0 0;
    }
  }
  .footer {
    position: absolute;
    text-align: right;
    bottom: 1.75rem;
    right: 1.75rem;
  }
</style>

<style lang="scss">
  .app {
    position: relative;
    .custom-control {
      position: absolute;
      left: 4px;
      top: 2px;
    }
  }
  .footer {
    .btn {
      min-width: 105px;
    }
  }
  #invite-user-modal {
    .modal-content {
      min-height: 600px;
    }
  }
  .multiple-select-options {
    display: flex;
    .option-checkbox {
      margin: 0 0 0 auto;
    }
  }
</style>
