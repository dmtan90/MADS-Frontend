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
        <b-form-input placeholder="Search teams" v-model="searchText"></b-form-input>
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
            {{renderUsers(props.rowData.members)}}
          </span>
        </template>
        <template v-slot:team-lead="props">
          <span>{{renderTeamLead(props.rowData)}}</span>
        </template>
        <template v-slot:assets="props">
          <span>
            {{renderAssets(props.rowData.assets)}}
          </span>
        </template>
        <template v-slot:apps>
          <span>-</span>
        </template>
        <template v-slot:actions="props">
          <span @click="editTeam(props.rowData)" class="edit-team">Edit</span>
        </template>
      </vuetable>
    </div>

    <!-- Modal Section -->
    <create-team-modal :orgUsers="orgUsers"></create-team-modal>
    <edit-team-modal ref="editTeam" :orgUsers="orgUsers" :team="selectedTeam"></edit-team-modal>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import { mapGetters } from 'vuex'
import teamService from '@/services/team.service.js'
import userService from '@/services/user.service'
import createTeamModal from './createTeamModal'
import editTeamModal from './editTeamModal'

export default {
  components: {
    Vuetable,
    createTeamModal,
    editTeamModal
  },
  data () {
    return {
      searchText: '',
      teams: [],
      orgUsers: [],
      selectedTeam: null,
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
          name: '__slot:team-lead',
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
    // Api Load Data methods
    loadOrgUsers () {
      let config = { orgId: this.currentUser.org.id }

      userService.read(config, { page_size: 100 })
        .then((response) => {
          this.orgUsers = response.users
        })
    },
    loadTeams () {
      let config = { orgId: this.currentUser.org.id }

      teamService.read(config, { page_number: 1, page_size: 10 })
        .then((response) => {
          this.teams = response.teams
        })
    },
    searchTeams () {
      let config = { orgId: this.currentUser.org.id }
      teamService.search(config, this.searchText)
        .then((response) => {
        })
    },
    // component methods
    getTeamLead (team) {
      return this.$_.find(team.members, (member) => { return (member.id === team.team_lead_id) })
    },

    // View helper methods
    renderUsers (users) {
      return this.$_.join(this.$_.map(users, (user) => { return (user.first_name +  ' ' + user.last_name || '') }), ', ')
    },
    renderAssets (assets) {
      return this.$_.join(this.$_.map(assets, (asset) => { return asset.name }), ', ')
    },
    renderTeamLead (team) {
      let teamLead = this.getTeamLead(team)
      return (teamLead.first_name + ' ' + teamLead.last_name)
    },
    editTeam (team) {
      this.selectedTeam = team
      this.$refs.editTeam.$refs.editTeamModal.show()
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadTeams()
    this.loadOrgUsers()
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
