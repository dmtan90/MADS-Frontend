<template>
  <div class="projects">
    <h2 class="page-heading">Hello {{currentUser.first_name}}, you have {{projects.length}} projects</h2>
    <div class="view-header">
      <ul class="nav nav-tabs">
        <li class="active">Active ({{projects.length}})</li>
        <li class="" v-if="!parentCmp">Archived (0)</li>
      </ul>
      <div class="project-view" v-if="parentCmp">
        <svg class="icon grid" :class="{'active': viewType === 'grid'}" @click="viewType = 'grid'">
          <use xlink:href="/assets/img/mads-common-icons.svg#grid"></use>
        </svg>
        <svg class="icon list" :class="{'active': viewType === 'list'}" @click="viewType = 'list'">
          <use xlink:href="/assets/img/mads-common-icons.svg#list"></use>
        </svg>
      </div>
    </div>
    <project-list :projects="projects" v-if="viewType === 'list'" :parentCmp="parentCmp"></project-list>
    <project-grid :projects="projects" v-if="viewType === 'grid'" :parentCmp="parentCmp"></project-grid>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import projectService from '@/services/project.service'
import projectList from './projectList'
import projectGrid from './projectGrid'
import ProjectEventBus from './projectEventBus'

export default {
  components: {
    projectList,
    projectGrid
  },
  props: {
    parentCmp: {
      default: null
    }
  },
  data () {
    return {
      projects: [],
      viewType: this.parentCmp ? 'grid' : 'list'
    }
  },
  methods: {
    loadProjects () {
      this.projects = [
        {
          id: 1,
          name: 'Power Plant',
          description: 'This is project descrption',
          users: [{ first_name: 'Vikram', last_name: 'Singh' }, { first_name: 'Chandra', last_name: 'Shekhar' }, { first_name: 'Ayoush', last_name: 'Singh' }],
          leads: [{ first_name: 'Arjun', last_name: 'Singh' }],
          metadata: [{ name: 'metadata1', data_type: 'string', unit: 'unit1', value: 'value1' }],
          location: {
            name: 'Cluny Road, Singapore Botanic Gardens, Singapore',
            place_id: 'ChIJvWDbfRwa2jERgNnTOpAU3-o',
            url: 'https://maps.google.com/?cid=16924268534376421760'
          },
          project_image: 'https://www.gtreview.com/wp-content/uploads/2014/10/Power-Plant-Factory.jpg'
        },
        {
          id: 1,
          name: 'Rubber Factory',
          description: 'This is project descrption',
          users: [{ first_name: 'Vikram', last_name: 'Singh' }, { first_name: 'Chandra', last_name: 'Shekhar' }, { first_name: 'Ayoush', last_name: 'Singh' }],
          leads: [{ first_name: 'Arjun', last_name: 'Singh' }],
          metadata: [{ name: 'metadata1', data_type: 'string', unit: 'unit1', value: 'value1' }],
          location: {
            name: 'Cluny Road, Singapore Botanic Gardens, Singapore',
            place_id: 'ChIJvWDbfRwa2jERgNnTOpAU3-o',
            url: 'https://maps.google.com/?cid=16924268534376421760'
          },
          project_image: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Wolfsburg_VW-Werk.jpg'
        },
        {
          id: 1,
          name: 'Smart Building',
          description: 'This is project descrption',
          users: [{ first_name: 'Vikram', last_name: 'Singh' }, { first_name: 'Chandra', last_name: 'Shekhar' }, { first_name: 'Ayoush', last_name: 'Singh' }],
          leads: [{ first_name: 'Arjun', last_name: 'Singh' }],
          metadata: [{ name: 'metadata1', data_type: 'string', unit: 'unit1', value: 'value1' }],
          location: {
            name: 'Cluny Road, Singapore Botanic Gardens, Singapore',
            place_id: 'ChIJvWDbfRwa2jERgNnTOpAU3-o',
            url: 'https://maps.google.com/?cid=16924268534376421760'
          },
          project_image: 'https://s27389.pcdn.co/wp-content/uploads/2016/10/AdobeStock_114525500.jpeg'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadProjects()

    ProjectEventBus.$on('reload-projects', () => {
      this.loadProjects()
    })
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
    width: 90%;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
  }
</style>
