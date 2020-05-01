<template>
  <div class="users">
    <h2 class="page-heading">Users</h2>
    <div>
      <ul class="nav nav-tabs">
        <li :class="{'active': selectedTab === 'users'}" @click="selectedTab = 'users'">USERS ({{users.length}})</li>
        <li :class="{'active': selectedTab === 'invites'}" @click="selectedTab = 'invites'">INVITES (0)</li>
      </ul>
    </div>
    <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" @change="searchUsers()" placeholder="Search users"></b-form-input>
      </div>
      <div class="role-filter">
        <multiselect v-model="selectedRole" :options="roles" :select-label="''" :selected-label="''" :deselect-label="''" placeholder="Select role" label="name" track-by="id">
        </multiselect>
        <label for="dropdown-left">Role</label>
      </div>
      <div class="invite-user">
        <b-button v-b-modal.invite-user-modal>Invite user</b-button>
      </div>
    </div>
    <div class="users-table">
      <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="fields"
          :data="displayedUsers"
        >
        <template v-slot:checkbox>
          <b-form-checkbox></b-form-checkbox>
        </template>
        <template v-slot:teams="props">
          <span>
            {{renderList(props.rowData.teams)}}
          </span>
        </template>
        <template v-slot:assets="props">
          <span>
            {{renderList(props.rowData.assets)}}
          </span>
        </template>
        <template v-slot:apps="props">
          <span>
            {{renderList(props.rowData.apps)}}
          </span>
        </template>
        <template v-slot:actions="props">
          <span @click="editUser(props.rowData)" class="edit-user">Edit</span>
        </template>
      </vuetable>
    </div>

    <!-- Modal Section -->
    <invite-user-modal :roles="roles"></invite-user-modal>
    <edit-user-modal :roles="roles" ref="editUser" :user="selectedUser" @reloadUser="loadUsers()"></edit-user-modal>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import inviteUserModal from './inviteUserModal'
import editUserModal from './editUserModal'
import userService from '@/services/user.service'
import roleService from '@/services/role.service'

export default {
  components: {
    Vuetable,
    inviteUserModal,
    editUserModal
  },
  data () {
    return {
      users: [],
      roles: [],
      displayedUsers: [],
      selectedUser: null,
      selectedTab: 'users',
      selectedRole: null,
      searchText: '',
      fields: [
        {
          name: '__slot:checkbox',
          title: '',
          dataClass: ''
        },
        {
          name: 'user',
          sortField: 'user'
        },
        {
          name: 'role',
          sortField: 'role',
          dataClass: 'user-role'
        },
        {
          name: '__slot:teams',
          title: 'Teams'
        },
        {
          name: '__slot:assets',
          title: 'Assets'
        },
        {
          name: '__slot:apps',
          title: 'Apps'
        },
        {
          name: '__slot:actions',
          title: ''
        }
      ]
    }
  },
  methods: {
    loadUsers () {
      userService.read({ orgId: 1 }, { page_size: 100 })
        .then((response) => {
          let users = response.users
          this.users = this.$_.map((users), (user) => {
            return {
              id: user.id,
              email: user.email,
              user: user.first_name + ' ' + user.last_name,
              originialRole: user.role,
              role: user.role.name,
              teams: [],
              assets: [],
              apps: []
            }
          })
          this.displayedUsers = this.users
        })
    },
    loadRoles () {
      roleService.read({ page_number: 1, page_size: 10 })
        .then(response => {
          this.roles = response.roles
        })
    },
    searchUsers () {
      if (this.searchText) {
        userService.search(this.searchText)
          .then((response) => {
            this.displayedUsers = this.$_.map((response.users), (user) => {
              return {
                id: user.id,
                email: user.email,
                user: user.first_name + ' ' + user.last_name,
                originialRole: user.role,
                role: user.role.name,
                teams: [],
                assets: [],
                apps: []
              }
            })
          })
      } else {
        this.displayedUsers = this.users
      }
    },
    renderList (list) {
      return this.$_.join(list, ', ')
    },
    editUser (user) {
      this.selectedUser = user
      this.$refs.editUser.$refs.editUserModal.show()
    }
  },
  mounted () {
    this.loadUsers()
    this.loadRoles()
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
    width: 90%;
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
    .users-table {
      margin-top: 30px;
    }
  }
</style>

<style lang="scss">
  .users {
    .users-table {
      .edit-user {
        text-decoration: underline;
        color: #2aa7ff;
        cursor: pointer;
      }
      td.user-role {
        text-transform: capitalize;
      }
    }
  }
</style>
