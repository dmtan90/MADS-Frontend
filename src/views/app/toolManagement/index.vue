<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Tool Management" />
        <b-tabs
          nav-class="separator-tabs ml-0 mb-5"
          content-class="tab-content"
          :no-fade="true"
          v-model="selectedTab"
        >
          <b-tab @click="goTo(0, 'dashboard')" title="Dashboard" title-item-class="w-20 text-center"></b-tab>
          <b-tab @click="goTo(1, 'employees')" title="Employees" title-item-class="w-20 text-center"></b-tab>
          <b-tab @click="goTo(2, 'tools')" title="Tools" title-item-class="w-20 text-center"></b-tab>
          <b-tab @click="goTo(3, 'tool-boxes')" title="Tool Boxes" title-item-class="w-20 text-center"></b-tab>
          <b-tab @click="goTo(4, 'tool-types')" title="Tool Types" title-item-class="w-20 text-center"></b-tab>
        </b-tabs>
      </b-colxx>
    </b-row>
    <div class="row">
      <div class="col col-12">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import _ from "lodash";

export default {
  data() {
    return {
      selectedTab: 0,
    }
  },
  methods: {
    goTo(tabNo, tab) {
      this.$router.push("/app/tool-management/" + tab);
      this.selectedTab = tabNo;
    }
  },
  mounted() {
    let path = this.$route.path;
    if(_.includes(path, 'employees')) {
      this.selectedTab = 1;
    } else if(_.includes(path, 'tools')) {
      this.selectedTab = 2;
    } else if(_.includes(path, 'tool-boxes')) {
      this.selectedTab = 3;
    } else if(_.includes(path, 'tool-types')) {
      this.selectedTab = 4;
    } else {
      this.selectedTab = 0;
    }
  }
};
</script>
