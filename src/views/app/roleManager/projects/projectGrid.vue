<template>
  <div>
    <div class="table-options">
      <div class="search-box" v-if="!source">
        <b-form-input v-model="searchText" placeholder="Search project"></b-form-input>
      </div>
      <div class="add-project" v-if="!source">
        <b-button @click="addProject()">Add project</b-button>
      </div>
    </div>
    <!-- <div class="grid projects-grid row">
      <div class="col-md-4 grid-item" v-for="(project, index) in projects" :key="index">
        <div class="header">
          <span class="name">{{project.name}}</span>
          <div class="actions" v-if="!source">
            <svg class="icon" @click="editProject(project)">
              <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
            </svg>
            <svg class="icon" @click="deleteProject(project)">
              <use xlink:href="/assets/img/mads-common-icons.svg#dustbin"></use>
            </svg>
          </div>
       </div>
        <div class="img-wrap" @click="onSelectProject(project)">
          <img :src="project.avatar" alt="" v-if="project.avatar">
          <svg class="icon" v-else>
            <use xlink:href="/assets/img/mads-role-manager-icons.svg#projects"></use>
          </svg>
        </div>
      </div>
    </div> -->

    <div class="grid projects-grid row">
      <div class="col-md-4 grid-item"  v-for="(project, index) in projects" :key="index">
        <div class="img-wrap" @click="onSelectProject(project)">
          <img :src="project.avatar" alt="" v-if="project.avatar">
          <svg class="icon" v-else>
            <use xlink:href="/assets/img/mads-role-manager-icons.svg#projects"></use>
          </svg>
          <div class="overlay">
             <div class="actions" v-if="!source">
              <svg class="icon dustbin" @click="deleteProject(project)">
                <use xlink:href="/assets/img/mads-common-icons.svg#dustbin"></use>
              </svg>
              <svg class="icon" @click="editProject(project)">
                <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
              </svg>
            </div>
          </div>
        </div>
        <div class="header">
          <span class="name">{{project.name}}</span>
        </div>
      </div>
    </div>

    <!-- Modal Section -->
    <add-edit-project ref="addEditProject"></add-edit-project>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import addEditProject from './addEditProject'
import projectService from '@/services/project.service'
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
    addEditProject
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    ...mapActions(['selectProject', 'setEntityManagerCurrentPage', 'setIotManagerCurrentPage']),
    renderUserName (users) {
      users = this.$_.map(users, (user) => {
        return user.first_name
      })
      return this.$_.join(users, ', ')
    },
    addProject (project) {
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

      switch (this.source) {
        case 'iotManager':
          this.setIotManagerCurrentPage(this.source)
          break
        default:
          this.setEntityManagerCurrentPage(this.source)
      }
    },
    getProjectLocationUrl (project) {
      return project.location ? project.location.url : ''
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
    .edit-project, .delete-project {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
  .grid.projects-grid {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0px;
    .grid-item {
      display: flex;
      flex-direction: column;
      height: 300px;
      padding: 0;
      justify-content: space-between;
      flex: 0 0 30%;
      width: 30%;
      border-radius: 4px;
      margin-bottom: 30px;
      margin-right: 30px;
      .header {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 10px 0px;
        background: transparent;
        color: white;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        .name {
          font-weight: bold;
          font-size: 16px;
          line-height: 19px;
          color: #44545B;
        }
        .actions {
          height: 30px;
          margin: 0 0 0 auto;
          display: flex;
          .icon {
            width: 30px;
            height: 30px;
            margin-left: 10px;
            cursor: pointer;
            background: white;
            border-radius: 4px;
            padding: 5px;
            &.dustbin {
              background-color: #4c92c3;
            }
          }
        }
      }
      .img-wrap {
        height: 258px;
        background-color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.14902);
        border-radius: 10px;
        position: relative;
        &:hover{
          .overlay{
            opacity: 1;
          }
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        .overlay{
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          width: 100%;
          opacity: 0;
          transition: .5s ease;
          background-color: rgba(0,0,0,0.7);
          border-radius: 10px;
          .actions {
            height: 100%;
            display: flex;
            // align-items: center;
            justify-content: flex-end;
            .icon {
              width: 25px;
              height: 25px;
              cursor: pointer;
              margin: 15px;
              &:hover{
                path{
                  stroke: #000;
                }
              }
            }
          }
        }
      }
      .info-wrap {
        height: 90px;
        padding: 20px;
        .info {
          display: flex;
          font-size: 14px;
          .title {
            width: 60px;
            font-weight: 700;
              &::after {
              content: ':';
            }
          }
          .value {
            padding-left: 15px;
            &.location {
              text-decoration: underline;
              color: #2aa7ff;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
</style>
