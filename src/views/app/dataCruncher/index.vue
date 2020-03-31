<template>
  <div>
    <app-window :sidebarData="sidebarData">
      <template v-slot:header>
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#A1-Data-Cruncher"></use>
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
                <use xlink:href="/assets/img/icons-sprite.svg#A1-Data-Cruncher"></use>
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
          iconId: '1-widget-manager',
          routerLink: ''
        },
        'workspace': {
          displayName: 'Workspace',
          iconId: '2-widget-store',
          routerLink: '/workspace'
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
