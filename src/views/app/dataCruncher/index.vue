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
          <router-link :to="'/app/data-cruncher' + item.routerLink" tag="div" class="item">
            <div class="item-content">
              <svg class="icon">
                <use xlink:href="/assets/img/icons-sprite.svg#A1-Data-Cruncher"></use>
              </svg>
              <span>{{item.displayName}}</span>
            </div>
            <div :class="{'active-tab': isActiveLink(item)}"></div>
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

export default {
  components: {
    appWindow
  },
  data() {
    return {
      sidebarData: {}
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
        'widgetStore': {
          displayName: 'Workspace',
          iconId: '2-widget-store',
          routerLink: '/workspace'
        }
      }
    },
    isActiveLink(item) {
      let link = '/app/data-cruncher' + item.routerLink;
      return this.$route.path === link;
    }
  },
  mounted() {
    this.sidebarData = this.getSidebarData();
  }
}
</script>

<style lang="scss" scoped>

</style>
