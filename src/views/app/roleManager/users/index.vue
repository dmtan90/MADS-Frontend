<template>
  <div class="users">
    <h2 class="page-heading">Users</h2>
    <div>
      <ul class="nav nav-tabs">
        <li :class="{'active': selectedTab === 'users'}" @click="selectedTab = 'users'">USERS (0)</li>
        <li :class="{'active': selectedTab === 'invites'}" @click="selectedTab = 'invites'">INVITES (0)</li>
      </ul>
    </div>
    <div class="table-options">
      <div class="search-box">
        <b-form-input placeholder="Search members"></b-form-input>
      </div>
      <div class="role-filter">
        <b-dropdown id="dropdown-left" text="All roles">
          <b-dropdown-item>All roles</b-dropdown-item>
          <b-dropdown-item>Admin</b-dropdown-item>
          <b-dropdown-item>Managers</b-dropdown-item>
          <b-dropdown-item>Members</b-dropdown-item>
        </b-dropdown>
        <label for="dropdown-left">Role</label>
      </div>
      <div class="invite-member">
        <b-button variant="primary">Invite member</b-button>
      </div>
    </div>
    <div class="users-table">
      <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="fields"
          :data="users"
        >
        <template v-slot:checkbox>
          <input type="checkbox" id="checkbox">
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
          <b-dropdown id="dropdown-left" text="Actions">
            <b-dropdown-item>Edit {{props.rowData.user}} Role</b-dropdown-item>
            <b-dropdown-item>Edit {{props.rowData.user}} Teams</b-dropdown-item>
            <b-dropdown-item>Edit {{props.rowData.user}} Assets</b-dropdown-item>
            <b-dropdown-item>Edit {{props.rowData.user}} Apps</b-dropdown-item>
            <b-dropdown-item>Enable/Disable {{props.rowData.user}} Activity Tracking</b-dropdown-item>
          </b-dropdown>
        </template>
      </vuetable>
    </div>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'

export default {
  components: {
    Vuetable
  },
  data () {
    return {
      users: [],
      selectedTab: 'users',
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
          sortField: 'role'
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
          name: 'activity'
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
      this.users = [
        {
          user: 'Chandra',
          role: 'Admin',
          teams: ['Datakrew', 'Dailyploy'],
          assets: ['Bintan Factory', 'Singapore office'],
          apps: ['Widget Manager', 'Data Cruncher'],
          activity: 'No activity'
        },
        {
          user: 'Arjun',
          role: 'Manager',
          teams: ['Datakrew', 'Dailyploy'],
          assets: ['Bintan Factory', 'Singapore office'],
          apps: ['Widget Manager', 'Data Cruncher'],
          activity: 'No activity'
        },
        {
          user: 'Sumanta',
          role: 'Admin',
          teams: ['Datakrew', 'Dailyploy'],
          assets: ['Bintan Factory', 'Singapore office'],
          apps: ['Widget Manager', 'Data Cruncher'],
          activity: 'No activity'
        },
        {
          user: 'Ayoush',
          role: 'Member',
          teams: ['Datakrew', 'Dailyploy'],
          assets: ['Bintan Factory', 'Singapore office'],
          apps: ['Widget Manager', 'Data Cruncher'],
          activity: 'No activity'
        },
        {
          user: 'Bandana',
          role: 'Member',
          teams: ['Datakrew', 'Dailyploy'],
          assets: ['Bintan Factory', 'Singapore office'],
          apps: ['Widget Manager', 'Data Cruncher'],
          activity: 'No activity'
        },
        {
          user: 'Kiran',
          role: 'Manager',
          teams: ['Datakrew', 'Dailyploy'],
          assets: ['Bintan Factory', 'Singapore office'],
          apps: ['Widget Manager', 'Data Cruncher'],
          activity: 'No activity'
        },
        {
          user: 'Vikram',
          role: 'Manager',
          teams: ['Datakrew', 'Dailyploy'],
          assets: ['Bintan Factory', 'Singapore office'],
          apps: ['Widget Manager', 'Data Cruncher'],
          activity: 'No activity'
        }
      ]
    },
    renderList (list) {
      return this.$_.join(list, ', ')
    }
  },
  mounted () {
    this.loadUsers()
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
      .invite-member {
        margin: 0 0 0 auto;
      }
    }
    .users-table {
      margin-top: 30px;
    }
  }
</style>
