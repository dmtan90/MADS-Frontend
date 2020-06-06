<template>
  <div>
    <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search project"></b-form-input>
      </div>
      <div class="add-project" v-if="!source">
        <b-button @click="addProject()">Add project</b-button>
      </div>
    </div>
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
          <span>{{props.rowData.metadata.length}}</span>
        </template>
        <template v-slot:managers="props">
          <span>{{renderUserName(props.rowData.leads)}}</span>
        </template>
        <template v-slot:members="props">
          <span>{{renderUserName(props.rowData.users)}}</span>
        </template>
        <template v-slot:location="props">
          <a :href="getProjectLocationUrl(props.rowData)" target="_blank" class="location">
            {{props.rowData.location && props.rowData.location.name}}
          </a>
        </template>
        <template v-slot:actions="props" v-if="!source">
          <span class="edit-project" @click="editProject(props.rowData)">Edit</span>
          <span class="delete-project" @click="deleteProject(props.rowData)">Delete</span>
        </template>
      </vuetable>
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
// import projectService from '@/services/project.service'
import ProjectEventBus from './projectEventBus'

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
    }
  },
  components: {
    Vuetable,
    addEditProject
  },
  data () {
    return {
      fields: fieldsDef,
      searchText: ''
    }
  },
  methods: {
    ...mapActions(['selectProject', 'setEntityManagerCurrentPage']),
    addProject (project) {
      this.$refs.addEditProject.add()
    },
    editProject (project) {
      this.$refs.addEditProject.edit(project)
    },
    deleteProject (project) {
      // let config = { orgId: this.currentUser.org.id, projectId: 1, id: project.id }
      // projectService.delete(config)
      //   .then((response) => {
      //     ProjectEventBus.$emit('reload-projects')
      //   })
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
    .project-name {
      cursor: pointer;
    }
    .location {
      text-decoration: underline;
      color: #2aa7ff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .edit-project, .delete-project {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
</style>
