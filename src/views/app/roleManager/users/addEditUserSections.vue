<template>
  <div class="user-sections">
    <h3>{{editMode ? 'Edit' : 'Add'}} User</h3>
    <section v-if="selectedSectionIndex === 1" class="details">
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
    <section v-if="selectedSectionIndex === 2" class="assets">
      <h5>Select Assets</h5>
        <div class="vue-tree-container">
          <mads-tree
            ref="tree"
            :treeView="'file'"
            :selectableEntities="['Asset']"
            :treeOptions="treeOptions"
          ></mads-tree>
        </div>
    </section>
    <section v-if="selectedSectionIndex === 3" class="apps">
      <h5>Select Apps</h5>
      <apps-list></apps-list>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userService from '@/services/user.service'
import appsList from './../../shared/modalAppsList'
import madsTree from './../../shared/madsTree/index'
import UserEventBus from './userEventBus'

export default {
  components: {
    appsList,
    madsTree
  },
  props: {
    roles: {
      type: Array,
      required: true
    },
    selectedSectionIndex: {
      type: Number,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    },
    userData: {
      type: Object
    }
  },
  data () {
    return {
      inviteEmail: '',
      selectedRole: null,
      selectedAssets: [],
      selectedApps: [],
      treeOptions: {
        selectable: true
      }
    }
  },
  methods: {
    saveUser () {
      let config = { orgId: this.currentUser.org.id }
      let userData = this.$refs.sections.getUserData()

      if (this.editMode) {
        config = this.$_.assign(config, { id: this.user.id })
        userService.update(config, userData)
          .then((response) => {
            UserEventBus.$emit('reload-users')
          })
      } else {
        userService.create(config, userData)
          .then((response) => {
            UserEventBus.$emit('reload-users')
          })
      }
      this.selectedSectionIndex = 1
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .user-sections {
    height: 480px;
    overflow: auto;
  }
  h3 {
    margin-bottom: 20px;
  }
  .details {
    .description {
      height: 165px;
    }
  }
  .assets {
    .vue-tree-container {
        margin-top: 20px;
        border: 1px solid #e2e2e2;
        height: 430px;
        border-radius: 4px;
        padding-bottom: 20px;
        overflow: auto;
      }
  }
</style>

<style lang="scss">
  .modal-body {
    padding: 0;
    .right-panel {
      padding-bottom: 100px;
      .horizontal-form {
        fieldset {
          display: inline-block;
        }
      }
    }
  }
</style>
