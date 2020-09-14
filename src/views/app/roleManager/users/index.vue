<template>
  <div class="users">
    <h2 class="page-heading">Users</h2>
    <div>
      <ul class="nav nav-tabs">
        <li :class="{'active': selectedTab === 'users'}" @click="selectedTab = 'users'">USERS ({{totalRows}})</li>
        <li :class="{'active': selectedTab === 'invites'}" @click="selectedTab = 'invites'">INVITES ({{invitationTotalRows}})</li>
      </ul>
    </div>
    <div class="table-options" v-if="selectedTab === 'users'">
      <div class="search-box">
        <b-form-input v-model="searchText" @change="searchUsers()" placeholder="Search users"></b-form-input>
      </div>
      <div class="role-filter">
        <multiselect v-model="selectedRole" :options="roles" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Select role" label="name" track-by="id">
        </multiselect>
        <label for="dropdown-left">Role</label>
      </div>
      <div class="invite-user">
        <b-button v-b-modal.add-edit-user-modal>Invite user</b-button>
      </div>
    </div>
    <user-list v-if="selectedTab === 'users'" :users="displayedUsers" :roles="roles" @user-pagination="userPaginationChange" :totalRows="totalRows"></user-list>
    <invite-list v-if="selectedTab === 'invites'" :invitations="invitations" :roles="roles" @invitation-pagination="invitationPaginationChange" :totalRows="invitationTotalRows"></invite-list>

    <!-- Modal Section -->
    <!-- <invite-user-modal :roles="roles"></invite-user-modal> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userService from '@/services/user.service'
import roleService from '@/services/role.service'
import invitationService from '@/services/invitation.service'
import userList from './userList'
import inviteList from './inviteList'
import UserEventBus from './../eventBus'

export default {
  components: {
    userList,
    inviteList
  },
  data () {
    return {
      users: [],
      roles: [],
      invitations: [],
      displayedUsers: [],
      selectedTab: 'users',
      selectedRole: null,
      searchText: '',
      currentPage: 1,
      perPage: 5,
      totalRows: null,
      invitationCurrentPage: 1,
      invitationPerPage: 5,
      invitationTotalRows: null
    }
  },
  methods: {
    loadUsers () {
      let config = { orgId: this.currentUser.org.id }
      const params = {
        page_size: this.perPage,
        page_number: this.currentPage
      }
      userService.read(config, params)
        .then((response) => {
          let users = response.users
          this.users = this.$_.map((users), (user) => {
            return {
              id: user.id,
              email: user.email,
              user: user.first_name + ' ' + user.last_name,
              originialRole: user.role,
              role: user.role.name,
              assets: [],
              apps: []
            }
          })
          this.displayedUsers = this.users
          this.totalRows = response.total_entries
        })
    },
    userPaginationChange (paginationData) {
      this.currentPage = paginationData
    },
    invitationPaginationChange (paginationData) {
      this.invitationCurrentPage = paginationData
    },
    loadRoles () {
      roleService.read({ page_number: 1, page_size: 100 })
        .then(response => {
          this.roles = response.roles
        })
    },
    searchUsers () {
      if (this.searchText) {
        let config = { orgId: this.currentUser.org.id }

        userService.search(config, this.searchText)
          .then((response) => {
            this.displayedUsers = this.$_.map((response.users), (user) => {
              return {
                id: user.id,
                email: user.email,
                user: user.first_name + ' ' + user.last_name,
                originialRole: user.role,
                role: user.role.name,
                assets: [],
                apps: []
              }
            })
          })
      } else {
        this.displayedUsers = this.users
      }
    },
    loadInvitations () {
      let config = { orgId: this.currentUser.org.id }
      const params = {
        page_size: this.invitationPerPage,
        page_number: this.invitationCurrentPage
      }
      invitationService.read(config, params)
        .then((response) => {
          this.invitations = response.invitations
          this.invitationTotalRows = response.total_entries
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadUsers()
    this.loadRoles()
    this.loadInvitations()

    UserEventBus.$on('reload-user-list', () => {
      this.loadUsers()
    })
    UserEventBus.$on('reload-invite-list', () => {
      this.loadInvitations()
    })

    UserEventBus.$on('reload-users', () => {
      this.loadUsers()
      this.loadInvitations()
      this.selectedTab = 'invites'
    })
  },
  beforeDestroy () {
    UserEventBus.$off()
  }
}
</script>

<style lang="scss" scoped>
  .users {
    .page-heading {
      color: #3e4956;
      margin-bottom: 20px;
    }
    .nav {
      display: inline-flex;
      font-size: 13px;
      li {
        color: #79899d;
        min-width: 90px;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      li.active {
        color: #2aa7ff;
        box-shadow: inset 0 -2px 0 #2aa7ff;
      }
    }
    width: 95%;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
    .table-options {
      display: flex;
      align-items: center;
      margin-top: 20px;
      .search-box {
        input {
          border-radius: 20px;
          width: 500px;
        }
      }
      .role-filter {
        margin-left: 20px;
        position: relative;
        width: 120px;
        label {
          position: absolute;
          left: 0;
          top: -20px;
        }
      }
      .invite-user {
        margin: 0 0 0 auto;
      }
    }
  }
</style>
