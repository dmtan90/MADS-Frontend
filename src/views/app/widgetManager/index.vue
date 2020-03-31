<template>
  <div>
    <app-window :sidebarData="sidebarData">
      <template v-slot:header>
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#M6-Widget-Manager"></use>
        </svg>
        <span>
          Widget Manager
        </span>
      </template>
      <template v-slot:sidebar>
        <div v-for="(item, key) in sidebarData" :key="key">
          <div class="item" @click="openSection(key)">
            <div class="item-content">
              <svg class="icon">
                <use :xlink:href="'/assets/img/widget-manager-icons.svg#' + item.iconId"></use>
              </svg>
              <span>{{item.displayName}}</span>
            </div>
            <div :class="{'active-tab': currentSection === key}"></div>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <widget-manager v-if="currentSection === 'widgetManager'"></widget-manager>
        <widget-store v-if="currentSection === 'widgetStore'"></widget-store>
        <my-widget v-if="currentSection === 'myWidget'"></my-widget>
        <editor v-if="currentSection === 'editor'"></editor>
      </template>
    </app-window>
  </div>
</template>

<script>
/* eslint-disable */
import appWindow from '../appWindow'
import widgetManager from './widgetManager'
import widgetStore from './widgetStore'
import myWidget from './myWidgets'
import editor from './editor'

export default {
  components: {
    appWindow,
    widgetManager,
    widgetStore,
    myWidget,
    editor
  },
  data() {
    return {
      sidebarData: {},
      currentSection: 'widgetManager'
    }
  },
  methods: {
    getSidebarData() {
      return {
        'widgetManager': {
          displayName: 'Widget Manager',
          iconId: '1-widget-manager',
          routerLink: ''
        },
        'widgetStore': {
          displayName: 'Widget Store',
          iconId: '2-widget-store',
          routerLink: '/store'
        },
        'myWidget': {
          displayName: 'My Widget',
          iconId: '3-my-widgets',
          routerLink: '/my-widgets'
        },
        'editor': {
          displayName: 'Editor',
          iconId: '5-editor',
          routerLink: '/editor'
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
