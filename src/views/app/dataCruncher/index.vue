<template>
  <div>
    <app-window :sidebarData="sidebarData">
      <template v-slot:header>
        <svg class="icon">
          <use xlink:href="/assets/img/mads-app-icons.svg#mads-data-cruncher"></use>
        </svg>
        <span>
          Data Cruncher
        </span>
      </template>
      <template v-slot:sidebar>
        <div v-for="(item, key) in sidebarData" :key="key">
          <div class="item" @click="openSection(key)">
            <div class="item-content">
              <svg class="icon">
                <use :xlink:href="'/assets/img/mads-data-cruncher-icons.svg#' + item.iconId"></use>
              </svg>
              <span>{{item.displayName}}</span>
            </div>
            <div :class="{'active-tab': currentSection === key}"></div>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <data-cruncher v-if="currentSection === 'dataCruncher'"></data-cruncher>
        <workspace v-if="currentSection === 'workspace'"></workspace>
      </template>
    </app-window>
  </div>
</template>

<script>
/* eslint-disable */
import appWindow from '../appWindow'
import dataCruncher from './dataCruncher'
import workspace from './workspace'

export default {
  components: {
    appWindow,
    dataCruncher,
    workspace
  },
  data() {
    return {
      sidebarData: {},
      currentSection: 'dataCruncher'
    }
  },
  methods: {
    getSidebarData() {
      return {
        'dataCruncher': {
          displayName: 'Data Cruncher',
          iconId: 'data-cruncher',
          routerLink: ''
        },
        'workspace': {
          displayName: 'Workspace',
          iconId: 'workspace',
          routerLink: '/workspace'
        },
        'dataLake': {
          displayName: 'Data Lake',
          iconId: 'data-lake',
          routerLink: ''
        },
        'functions': {
          displayName: 'Functions',
          iconId: 'functions',
          routerLink: ''
        },
        'exportedWidgets': {
          displayName: 'Exported Widgets',
          iconId: 'exported-widgets',
          routerLink: ''
        },
        'settings': {
          displayName: 'Settings',
          iconId: 'settings',
          routerLink: ''
        },
        'help': {
          displayName: 'Help',
          iconId: 'help',
          routerLink: ''
        }
      }
    },
    openSection(section) {
      this.currentSection = section;
    }
  },
  mounted() {
    this.sidebarData = this.getSidebarData();
  }
}
</script>

<style lang="scss" scoped>

</style>
