<template>
  <div class="projects">
    <h2 class="page-heading">Hello {{currentUser.first_name}}, you have <br /> <span>{{totalRows}} Projects</span></h2>
    <div class="view-header" v-if="!source">
      <ul class="nav nav-tabs">
        <li :class="{'active': selectedTab === 'active'}" @click="selectedTab = 'active'">Active ({{totalRows}})</li>
        <li :class="{'active': selectedTab === 'archived'}" @click="selectedTab = 'archived'">Archived ({{archived.length}})</li>
      </ul>
      <div class="right-box">
        <div class="search-box">
          <div class="search-icon">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#search"></use>
            </svg>
          </div>
          <b-form-input v-model="searchText" placeholder="Search Project"></b-form-input>
        </div>
        <div class="add-project">
          <b-button class="add-button" @click="addProject()">Add Project</b-button>
        </div>
      </div>
      <div class="project-view" v-if="source">
        <svg class="icon grid" :class="{'active': viewType === 'grid'}" @click="viewType = 'grid'">
          <use xlink:href="/assets/img/mads-common-icons.svg#grid"></use>
        </svg>
        <svg class="icon list" :class="{'active': viewType === 'list'}" @click="viewType = 'list'">
          <use xlink:href="/assets/img/mads-common-icons.svg#list"></use>
        </svg>
      </div>
    </div>
    <div v-if="viewType === 'list'">
      <project-list ref="project" :projects="active" v-if="selectedTab === 'active'" :source="source" @project-pagination="projectPaginationChange" :totalRows="totalRows" ></project-list>
      <archived-list :projects="archived" v-if="selectedTab === 'archived'" :source="source" @archived-pagination="archivedPaginationChange" :totalRows="archivedTotalRows"></archived-list>
    </div>
    <project-grid :projects="active" v-if="viewType === 'grid'" :source="source"></project-grid>

    <mads-pagination v-if="viewType === 'grid'" :perPage="perPage" :onChange="projectPaginationChange" :currentPage="currentPage" :totalRows="totalRows"></mads-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import projectService from '@/services/project.service'
import projectList from './projectList'
import projectGrid from './projectGrid'
import ProjectEventBus from './projectEventBus'
import archivedList from './archivedList'
import madsPagination from '../../shared/madsPagination'

export default {
  components: {
    projectList,
    projectGrid,
    archivedList,
    madsPagination
  },
  props: {
    source: {
      default: null
    }
  },
  data () {
    return {
      projects: [],
      viewType: this.source ? 'grid' : 'list',
      archived: [],
      active: [],
      selectedTab: 'active',
      currentPage: 1,
      perPage: 5,
      totalRows: null,
      archivedCurrentPage: 1,
      archivedPerPage: 5,
      archivedTotalRows: null,
      searchText: null
    }
  },
  methods: {
    loadProjects () {
      let loader = this.$loading.show()
      let config = { orgId: this.currentUser.org.id }
      const params = {
        page_size: this.perPage,
        page_number: this.currentPage
      }
      projectService.read(config, params)
        .then((response) => {
          this.projects = response.projects
          this.active = response.projects.filter((project) => project.archived === false)
          this.totalRows = response.total_entries
          loader.hide()
        })
    },
    loadArchived () {
      let loader = this.$loading.show()
      let config = { orgId: this.currentUser.org.id }
      const params = {
        page_size: this.archivedPerPage,
        page_number: this.archivedCurrentPage
      }
      projectService.read(config, params)
        .then((response) => {
          this.projects = response.projects
          this.archived = response.projects.filter((project) => project.archived === true)
          this.archivedTotalRows = response.total_entries
          loader.hide()
        })
    },
    projectPaginationChange (paginationData) {
      this.currentPage = paginationData
      this.loadProjects()
    },
    archivedPaginationChange (paginationData) {
      this.archivedCurrentPage = paginationData
    },
    addProject () {
      this.$refs.project.addProject()
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadProjects()
    this.loadArchived()

    ProjectEventBus.$on('reload-projects', () => {
      this.loadProjects()
    })
    ProjectEventBus.$on('reload-archived', () => {
      this.selectedTab = 'archived'
      this.loadArchived()
    })
  },
  beforeDestroy () {
    ProjectEventBus.$off()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/sass/_buttons.scss';

  .projects {
    background-color: transparent !important;
    .page-heading {
      color: #303033;
      margin-bottom: 30px;
      font-size: 18px;
      line-height: 22px;
      margin-top: 12px;
      span{
        font-size: 22px;
        line-height: 26px;
        color: #3576AB;
      }
    }
    .view-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right-box{
        width: 78%;
        display: flex;
        justify-content: space-between;
        .search-box{
          width: 55%;
          border: 1px solid #EEF1F2;
          box-sizing: border-box;
          border-radius: 5px;
          height: 55px;
          display: flex;
          background-color: #fff;
          input{
            border: 0px;
            height: 100%;
            font-size: 14px;
            line-height: 17px;
            color: #A7A9AC;
          }
          .search-icon{
            width: 55px;
            display: flex;
            align-items: center;
            justify-content: center;
            .icon{
              width: 16px;
              height: 16px;
            }
          }
        }
        .add-project{

        }
      }
      .nav {
        display: inline-flex;
        font-size: 13px;
        border: 0 !important;
        li {
          color: #79899d;
          min-width: 90px;
          height: 34px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-weight: bold;
          font-size: 14px;
          line-height: 17px;
          margin-right: 18px;
        }
        li.active {
          color: #3576AB;
          border-bottom: 3px solid #3576AB;
          // box-shadow: inset 0 -2px 0 #3576AB;
        }
      }
      .project-view {
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        margin: 0 0 0 auto;
        height: 36px;
        display: flex;
        align-items: center;
        .icon {
          cursor: pointer;
          fill: #79899d;
          &.grid {
            width: 40px;
            height: 34px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            padding: 4px;
          }
          &.list {
            width: 40px;
            height: 34px;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            padding: 7px;
          }
          &.active {
            fill: #ffffff;
            background: #FFA07A;
          }
        }
      }
    }
    width: 95%;
    margin: 0 auto;
    background-color: transparent;
    padding: 20px;
  }
</style>
