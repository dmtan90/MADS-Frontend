<template>
  <div>
    <!-- <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search project"></b-form-input>
      </div>
      <div class="add-project" v-if="!source">
        <b-button @click="addProject()">Add project</b-button>
      </div>
    </div> -->
    <div class="lists-table projects-table">
      <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="fields"
          :data="projects"
        >
        <template v-slot:checkbox>
          <b-form-checkbox></b-form-checkbox>
        </template>
        <template v-slot:project="props">
          <span class="project-name" @click="onSelectProject(props.rowData)">{{props.rowData.name}}</span>
        </template>
        <template v-slot:metadata="props">
          <div class="metadata-box">
            <span>{{props.rowData.metadata.length}}</span>
          </div>
        </template>
        <template v-slot:managers="props">
          <div class="managers-box" v-if="props.rowData.leads.length>0">
            <div class="img-box">
              <span>{{renderFirstLetter(renderUserFullName(props.rowData.leads))}}</span>
            </div>
            <div class="text-box">
              <div class="name">{{renderUserFullName(props.rowData.leads)}}</div>
              <div class="email">{{renderUserEmail(props.rowData.leads)}}</div>
            </div>
          </div>
        </template>
        <template v-slot:members="props">
          <div class="members-box">
            <div class="member-box" v-for="(user, i) in getUserNames(props.rowData.users)" :key="i">
                <span>{{renderFirstLetter(user)}}</span>
            </div>
          </div>
        </template>
        <template v-slot:location="props">
          <template v-if="props.rowData.location">
            <a :href="getProjectLocationUrl(props.rowData)" target="_blank" class="location">
              {{props.rowData.location && props.rowData.location.name}}
            </a>
          </template>
        </template>
        <template v-slot:actions="props" v-if="!source">
          <div class="action-box">
            <span class="icon-box" @click="editProject(props.rowData)">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-common-icons.svg#edit"></use>
              </svg>
            </span>
            <span class="icon-box" @click="deleteProject(props.rowData)">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-common-icons.svg#trash"></use>
              </svg>
            </span>
            <span class="icon-box" @click="archiveProject(props.rowData)">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-common-icons.svg#archive"></use>
              </svg>
            </span>
            <span class="icon-box">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-common-icons.svg#view"></use>
              </svg>
            </span>
          </div>

        </template>
      </vuetable>

      <mads-pagination :perPage="perPage" :onChange="onPaginationChange" :currentPage="currentPage" :totalRows="totalRows"></mads-pagination>

    </div>

    <!-- Modal Section -->
    <add-edit-project ref="addEditProject"></add-edit-project>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import fieldsDef from './projectFieldsDef'
import Vuetable from 'vuetable-2'
import addEditProject from './addEditProject'
import projectService from '@/services/project.service'
import ProjectEventBus from './projectEventBus'
import madsPagination from '../../shared/madsPagination'

export default {
  props: {
    projects: {
      type: Array,
      default: () => {
        return []
      }
    },
    source: {
      type: String,
      default: null
    },
    totalRows: {
      type: Number
    }
  },
  components: {
    Vuetable,
    addEditProject,
    madsPagination
  },
  data () {
    return {
      fields: fieldsDef,
      searchText: '',
      currentPage: 1,
      perPage: 5
    }
  },
  methods: {
    ...mapActions(['selectProject', 'setEntityManagerCurrentPage']),
    addProject () {
      this.$refs.addEditProject.add()
    },
    editProject (project) {
      this.$refs.addEditProject.edit(project)
    },
    deleteProject (project) {
      let config = { orgId: this.currentUser.org.id, projectId: 1, id: project.id }
      projectService.delete(config)
        .then((response) => {
          ProjectEventBus.$emit('reload-projects')
        })
    },
    onSelectProject (project) {
      this.selectProject(project)
      this.setEntityManagerCurrentPage(this.source)
    },
    getProjectLocationUrl (project) {
      return project.location ? project.location.url : ''
    },
    renderUserName (users) {
      users = this.$_.map(users, (user) => {
        return user.first_name
      })
      return this.$_.join(users, ', ')
    },
    renderUserEmail (users) {
      users = this.$_.map(users, (user) => {
        return user.email
      })
      return this.$_.join(users, ', ')
    },
    renderUserFullName (users) {
      users = this.$_.map(users, (user) => {
        return user.first_name + ' ' + user.last_name
      })
      return this.$_.join(users, ', ')
    },
    renderFirstLetter (str) {
      if (str) {
        let matches = str.match(/\b(\w)/g)
        return matches.join('')
      }
    },
    getUserNames (users) {
      users = this.$_.map(users, (user) => {
        return user.first_name + ' ' + user.last_name
      })
      return users
    },
    archiveProject (project) {
      let config = { orgId: this.currentUser.org.id, projectId: 1, id: project.id }
      let payload = {
        archived: true
      }
      projectService.update(config, payload)
        .then((res) => {
          ProjectEventBus.$emit('reload-projects')
        })
    },
    onPaginationChange (e) {
      this.currentPage = e
      this.$emit('project-pagination', e)
      ProjectEventBus.$emit('reload-projects')
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
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
    .add-project {
      margin: 0 0 0 auto;
    }
  }
  .projects-table {
    margin-top: 30px;
    table{
      background: #FFFFFF;
      box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.07);
      border-radius: 8px;
      border:0;
    }

    .project-name {
      cursor: pointer;
    }
    .location {
      text-decoration: none;
      color: #3576AB;
      white-space: nowrap;
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      background: #DEF7FF;
      border-radius: 5px;
      padding: 6px 10px;
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
    }
    .action-box {
      display: flex;
      .icon-box{
        margin-right: 13px;
        cursor: pointer;
        .icon{
          width: 18px;
          height: 18px;
        }
      }
    }
  }
</style>

<style lang="scss">
  .vuetable{
    thead{
      background-color: #F4F4F4;
      border-radius: 5px 5px 0px 0px;
      border-bottom: 0px;
      tr{
        th{
          font-weight: bold;
          font-size: 14px;
          line-height: 17px;
          color: #363636;
        }
      }
    }
    tbody{
      tr{
        td{
          font-weight: bold;
          font-size: 14px;
          line-height: 17px;
          color: #363636;
          .managers-box{
            display: flex;
            align-items: center;
            .img-box{
              height: 45px;
              width: 45px;
              border-radius: 50%;
              background-color: #FF9D26;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 6px;
              span{
                font-weight: bold;
                font-size: 14px;
                line-height: 17px;
                color: #fff;
              }
            }
            .text-box{
              .name{
                font-weight: bold;
                font-size: 14px;
                line-height: 17px;
                color: #363636;
              }
              .email{
                font-size: 14px;
                line-height: 17px;
                color: #A7A9AC;
              }
            }
          }
          .members-box{
            display: flex;
            align-items: center;
            .member-box{
              height: 35px;
              width: 35px;
              border-radius: 50%;
              background-color: #FF9D26;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: -8px;
              box-shadow: 3px 9px 16px rgba(0, 0, 0, 0.09);
              span{
                font-weight: bold;
                font-size: 14px;
                line-height: 17px;
                color: #fff;
              }
            }
          }
          .metadata-box{
            text-align: center;
          }
        }
      }
    }
  }
</style>
