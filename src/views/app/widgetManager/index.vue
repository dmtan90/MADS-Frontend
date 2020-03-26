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
          <router-link :to="'/app/widget-manager' + item.routerLink" tag="div" class="item">
            <div class="item-content">
              <svg class="icon">
                <use :xlink:href="'/assets/img/widget-manager-icons.svg#' + item.iconId"></use>
              </svg>
              <span>{{item.displayName}}</span>
            </div>
            <div class="active-tab"></div>
          </router-link>
        </div>
      </template>
      <template v-slot:content>
        <router-view></router-view>
      </template>
    </app-window>
  </div>
</template>

<script>
/* eslint-disable */
import appWindow from '../appWindow'
import widgetManager from '../widgetManager/widgetManager'


export default {
  components: {
    appWindow,
    widgetManager
  },
  data() {
    return {
      sidebarData: {}
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
        'search': {
          displayName: 'Search',
          iconId: '4-search',
          routerLink: '/search'
        },
        'editor': {
          displayName: 'Editor',
          iconId: '5-editor',
          routerLink: '/editor'
        }
      }
    }
  },
  computed: {
    currentPage() {
      debugger;
      return this.$route.path;
    }
  },
  mounted() {
    this.sidebarData = this.getSidebarData();
  }
}
</script>

<style lang="scss" scoped>

</style>
