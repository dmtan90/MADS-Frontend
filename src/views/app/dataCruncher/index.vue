<template>
  <app-window :sidebarData="sidebarData" :zIndex="openedApps['data-cruncher'].zIndex" :appName="'data-cruncher'">
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
</template>

<script>
/* eslint-disable */
import appWindow from '../appWindow'
import dataCruncher from './dataCruncher'
import workspace from './workspace'
import { mapGetters, mapActions } from 'vuex'

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
  },
  computed: {
    ...mapGetters(['openedApps'])
  }
}
</script>

<style lang="scss" scoped>

</style>
