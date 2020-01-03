<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" title="Site List">
          <router-link to="list-view/new">
            <b-button variant="primary" size="md" class="add-new">Add New</b-button>
          </router-link>
          <vuetable ref="vuetable" :api-mode="false" :fields="fields" :data="sites">
            <template v-slot:actions="slotProps">
              <router-link :to="'list-view/' + slotProps.rowData.id + '/edit'" tag="span">
                <i class="simple-icon-pencil"></i>
              </router-link>
              <span @click="deleteSite(slotProps.rowData.id)">
                <i class="simple-icon-trash"></i>
              </span>
            </template>
          </vuetable>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<!-- <vuetable-pagination-bootstrap
ref="pagination"
@vuetable-pagination:change-page="onChangePage"
></vuetable-pagination-bootstrap> -->

<script>
/* eslint-disable */

import siteService from "@/services/site.service";
import Vuetable from "vuetable-2";
import axios from "axios";

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      sites: [],
      siteData: null,
      fields: [
        {
          name: "id",
          title: "<span>Serial No.</span>",
          sortField: "id",
          dataClass: "list-item-heading"
        },
        {
          name: "name",
          title: "<span>Site Name</span>",
          sortField: "name",
          dataClass: "list-item-heading"
        },
        {
          name: "__slot:actions",
          title: "<span>Actions</span>"
        }
      ]
    };
  },
  methods: {
    loadSites() {
      siteService.read().then(response => {
        console.log("lissst",response)
        this.sites = response.sites;
      });
    },
    deleteSite(id) {
      siteService.delete(id).then(response => {
        this.loadSites();
      });
    }
  },
  mounted() {
    this.loadSites();
  }
};
</script>


<style>
</style><!-- <vuetable-pagination-bootstrap
ref="pagination"
@vuetable-pagination:change-page="onChangePage"
></vuetable-pagination-bootstrap> -->
