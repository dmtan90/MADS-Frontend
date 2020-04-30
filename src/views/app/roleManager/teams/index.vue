<template>
  <div class="teams">
    <h2 class="page-heading">Teams</h2>
    <div>
      <ul class="nav nav-tabs">
        <li class="active">Teams ({{teams.length}})</li>
      </ul>
    </div>
    <div class="table-options">
      <div class="search-box">
        <b-form-input placeholder="Search teams"></b-form-input>
      </div>
      <div class="create-team">
        <b-button v-b-modal.create-team-modal>Create Team</b-button>
      </div>
    </div>
    <div class="teams-table">
      <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="fields"
          :data="teams"
        >
        <template v-slot:checkbox>
          <b-form-checkbox></b-form-checkbox>
        </template>
        <template v-slot:users="props">
          <span>
            {{renderList(props.rowData.users)}}
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
          <span @click="editUser(props.rowData.name)" class="edit-team">Edit</span>
        </template>
      </vuetable>
    </div>

    <!-- Modal Section -->
    <create-team-modal></create-team-modal>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import createTeamModal from './createTeamModal'

export default {
  components: {
    Vuetable,
    createTeamModal
  },
  data () {
    return {
      teams: [],
      fields: [
        {
          name: '__slot:checkbox',
          title: '__slot:checkbox',
          dataClass: ''
        },
        {
          name: 'name',
          sortField: 'name'
        },
        {
          name: '__slot:users',
          title: 'Users'
        },
        {
          name: 'team_lead',
          sortField: 'team_lead',
          title: 'Team Lead'
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
    loadTeams () {
      this.teams = [
        {
          name: 'Datakrew',
          users: ['Chandra', 'Ayoush'],
          team_lead: 'Arjun',
          assets: ['Bintan Factory', 'Singapore office'],
          apps: ['Widget Manager', 'Data Cruncher']
        },
        {
          name: 'Dailyploy',
          users: ['Ayoush', 'Chandra'],
          team_lead: 'Vikram',
          assets: ['Bintan Factory', 'Singapore office'],
          apps: ['Widget Manager', 'Data Cruncher']
        },
        {
          name: 'StackAvenue',
          users: ['Vikram', 'Alam'],
          team_lead: 'Kiran',
          assets: ['Bintan Factory', 'Singapore office'],
          apps: ['Widget Manager', 'Data Cruncher']
        }
      ]
    },
    renderList (list) {
      return this.$_.join(list, ', ')
    },
    editTeam (user) {
      // this.$refs.editUser.$refs.editUserModal.show()
    }
  },
  mounted () {
    this.loadTeams()
  }
}
</script>

<style lang="scss" scoped>
  .teams {
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
      .create-team {
        margin: 0 0 0 auto;
      }
    }
    .teams-table {
      margin-top: 30px;
    }
  }
</style>

<style lang="scss">
  .teams {
    .teams-table {
      .edit-team {
        text-decoration: underline;
        color: #2aa7ff;
        cursor: pointer;
      }
    }
  }
</style>
