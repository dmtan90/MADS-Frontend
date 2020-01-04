<template>
  <div class="content">
    <b-row>
      <b-colxx xxs="12" xs="6" lg="3" v-for="site in sites" v-bind:key="site.id">
        <b-card class="mb-4" no-body>
          <div class="position-relative">
            <img
              :src="site.image_url"
              class="card-img-top"
            />
          </div>
          <b-card-body>
            <h6 class="mb-4 card-subtitle">{{site.name}}</h6>
          </b-card-body>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable */

import siteService from "@/services/site.service";

export default {
  data() {
    return {
      sites: []
    };
  },
  methods: {
    loadSites() {
      siteService.read().then(response => {
        this.sites = response.sites;
      });
    }
  },
  mounted() {
    this.loadSites();
  }
};
</script>


<style>
.content {
  background: #fff;
  border-radius: 5px;
}
</style>
