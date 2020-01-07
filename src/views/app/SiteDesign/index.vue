<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <div class="top-bar">
          <piaf-breadcrumb heading="Site Explorer" />
          <router-link class="add-new-btn" to="list-view/new">
            Add New Site
          </router-link>
        </div>
        <b-tabs
          nav-class="separator-tabs ml-0 mb-5"
          content-class="tab-content"
          :no-fade="true"
          v-model="selectedTab"
        >
          <b-tab
            @click="goTo(0, '')"
            title="Map View"
            title-item-class="w-20 text-center sd"
          ></b-tab>
          <b-tab
            @click="goTo(1, 'tile-view')"
            title="Tile View"
            title-item-class="w-20 text-center sd"
          ></b-tab>
          <b-tab
            @click="goTo(2, 'list-view')"
            title="List View"
            title-item-class="w-20 text-center sd"
          ></b-tab>
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
import _ from 'lodash'

export default {
  data() {
    return {
      selectedTab: 0
    }
  },
  methods: {
    goTo(tabNo, tab) {
      this.$router.push('/app/site-layout/' + tab)
      this.selectedTab = tabNo
    }
  },
  mounted() {
    let path = this.$route.path
    if (_.includes(path, 'list-view')) {
      this.selectedTab = 2
    } else if (_.includes(path, 'tile-view')) {
      this.selectedTab = 1
    } else {
      this.selectedTab = 0
    }
  }
}
</script>

<style>
.top-bar {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}

.add-new-btn {
  border: none;
  background: #4cb6bb;
  padding: 15px 30px;
  border-radius: 50px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.add-new-btn:hover {
  color: #fff !important;
}

.sd {
  width: 33.333% !important;
}
</style>
