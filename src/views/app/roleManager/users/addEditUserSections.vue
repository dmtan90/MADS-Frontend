<template>
  <div class="user-sections">
    <h3>{{editMode ? 'Edit' : 'Add'}} User</h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Email" label-for="email">
          <b-form-input v-model="userInvite.email" id="email" type="email" required></b-form-input>
        </b-form-group>
        <b-form-group label="Select Role" label-for="role">
          <multiselect v-model="selectedRole" :options="roles" :select-label="''" @select="onSelectRole" :selected-label="''" :deselect-label="''" placeholder="Select role" label="name" track-by="id">
          </multiselect>
        </b-form-group>
        <b-form-group label="Activity Tracking">
          <toggle-button :value="true" :labels="{checked: 'on', unchecked: 'off'}"/>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="apps">
      <h5>Select Apps</h5>
      <apps-list v-on:selectApps="selectApps"></apps-list>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import appsList from './../../shared/modalAppsList'

export default {
  components: {
    appsList
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
      isAnyNodeSelected: false,
      userInvite: {},
      treeOptions: {
        selectable: true
      }
    }
  },
  methods: {
    onSelectEntity (event, entity) {
      if (event && entity.type === 'Asset') {
        let asset = {
          id: entity.id
        }
        this.userInvite.assets.push(asset)
      } else {
        this.userInvite.assets = []
      }
      this.selectedParentEntityId = event ? entity.id : null
    },
    onSelectRole (role) {
      this.selectedRole = role
      this.userInvite.role_id = role.id
    },
    getUserData () {
      return {
        invitation: this.userInvite
      }
    },
    getSelectedEntity () {
      let assets = this.userInvite.assets.map((asset) => {
        return {
          id: asset.id,
          type: 'Asset'
        }
      })
      return assets
    },
    selectApps (apps) {
      apps = this.$_.filter(apps, (value, key) => { return value })
      let selectAppValues = this.$_.keys(apps)
      let selectApp = this.$_.map(selectAppValues, (app) => {
        return {
          id: app
        }
      })

      this.userInvite.apps = selectApp
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    if (this.userData) {
      this.userInvite = {
        email: this.userData.email || '',
        role_id: this.userData.role.id || '',
        inviter_id: this.userData.inviter ? this.userData.inviter.id : '' || '',
        assets: this.userData.assets || [],
        apps: this.userData.apps || []
      }

      this.selectedRole = this.userData.originialRole ? this.userData.originialRole : this.userData.role
    } else {
      this.userInvite = {
        email: '',
        role_id: '',
        inviter_id: this.currentUser.id,
        assets: [],
        apps: []
      }
    }
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
