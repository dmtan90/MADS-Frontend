<template>
  <div class="projects">
    <h2 class="page-heading">Hello {{currentUser.first_name}}, you have {{projects.length}} projects</h2>
    <div class="view-header" v-if="!source">
      <ul class="nav nav-tabs">
        <li :class="{'active': selectedTab === 'active'}" @click="selectedTab = 'active'">Active ({{active.length}})</li>
        <li :class="{'active': selectedTab === 'archived'}" @click="selectedTab = 'archived'">Archived ({{archived.length}})</li>
      </ul>
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
      <project-list :projects="active" v-if="selectedTab === 'active'" :source="source" @project-pagination="projectPaginationChange" :totalRows="totalRows"></project-list>
      <archived-list :projects="archived" v-if="selectedTab === 'archived'" :source="source" @archived-pagination="archivedPaginationChange" :totalRows="archivedTotalRows"></archived-list>
    </div>
    <project-grid :projects="active" v-if="viewType === 'grid'" :source="source"></project-grid>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import projectService from '@/services/project.service'
import projectList from './projectList'
import projectGrid from './projectGrid'
import ProjectEventBus from './projectEventBus'
import archivedList from './archivedList'

export default {
  components: {
    projectList,
    projectGrid,
    archivedList
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
      archivedTotalRows: null
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
    },
    archivedPaginationChange (paginationData) {
      this.archivedCurrentPage = paginationData
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
      this.loadArchived()
    })
  },
  beforeDestroy () {
    ProjectEventBus.$off()
  }
}
</script>

<style lang="scss" scoped>
  .projects {
    .page-heading {
      color: #3e4956;
      margin-bottom: 20px;
    }
    .view-header {
      display: flex;
      align-items: flex-end;
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
    background-color: white;
    padding: 20px;
  }
</style>
