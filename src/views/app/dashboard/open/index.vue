<template>
  <div>
    <div class="templates" v-if="!selectedTheme">
      <h2 class="page-heading">Hello Sumanta, you have {{templates.length}} Dashboards</h2>
      <div class="view-header">
        <ul class="nav nav-tabs">
          <li class="active">Active ({{templates.length}})</li>
          <li class="" v-if="!source">Archived (0)</li>
        </ul>
      </div>
      <template-grid :templates="templates" :source="source" @select-theme="selectedTheme = $event"></template-grid>
    </div>
    <div class="detail-section h-100" v-else>
      <shea-template v-if="selectedTheme === 'shea'" @show-all="selectedTheme = null; showAppSidebar('Dashboards')"></shea-template>
      <hevea-template v-if="selectedTheme === 'hevea'"  @show-all="selectedTheme = null; showAppSidebar('Dashboards')"></hevea-template>
      <smart-agriculture-template v-if="selectedTheme === 'smart_agriculture'"  @show-all="selectedTheme = null; showAppSidebar('Dashboards')">
      </smart-agriculture-template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import templateGrid from './templateGrid'
import sheaTemplate from './../sheaTemplate'
import heveaTemplate from './../heveaTemplate'
import smartAgricultureTemplate from './../smartAgricultureTemplate'

export default {
  components: {
    templateGrid,
    sheaTemplate,
    heveaTemplate,
    smartAgricultureTemplate
  },
  props: {
    source: {
      default: null
    }
  },
  data () {
    return {
      templates: [],
      viewType: this.source ? 'grid' : 'list',
      selectedTheme: null
    }
  },
  methods: {
    ...mapActions(['hideAppSidebar', 'showAppSidebar']),
    loadTemplates () {
      this.templates = [
        {
          id: 1,
          name: 'Shea',
          key: 'shea',
          description: 'This is template descrption',
          users: [{ first_name: 'Vikram', last_name: 'Singh' }, { first_name: 'Chandra', last_name: 'Shekhar' }, { first_name: 'Ayoush', last_name: 'Singh' }],
          leads: [{ first_name: 'Arjun', last_name: 'Singh' }],
          metadata: [{ name: 'metadata1', data_type: 'string', unit: 'unit1', value: 'value1' }],
          template_image: '/assets/img/shea.png'
        },
        {
          id: 1,
          name: 'HeveaConnect',
          key: 'hevea',
          description: 'This is template descrption',
          users: [{ first_name: 'Vikram', last_name: 'Singh' }, { first_name: 'Chandra', last_name: 'Shekhar' }, { first_name: 'Ayoush', last_name: 'Singh' }],
          leads: [{ first_name: 'Arjun', last_name: 'Singh' }],
          metadata: [{ name: 'metadata1', data_type: 'string', unit: 'unit1', value: 'value1' }],
          template_image: '/assets/img/hevea.png'
        },
        {
          id: 1,
          name: 'Smart Agriculture',
          key: 'smart_agriculture',
          description: 'This is template descrption',
          users: [{ first_name: 'Vikram', last_name: 'Singh' }, { first_name: 'Chandra', last_name: 'Shekhar' }, { first_name: 'Ayoush', last_name: 'Singh' }],
          leads: [{ first_name: 'Arjun', last_name: 'Singh' }],
          metadata: [{ name: 'metadata1', data_type: 'string', unit: 'unit1', value: 'value1' }],
          template_image: '/assets/img/smart_agriculture.png'
        }
      ]
    }
  },
  computed: {
  },
  mounted () {
    this.loadTemplates()
  }
}
</script>

<style lang="scss" scoped>
  .templates {
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
      .template-view {
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
