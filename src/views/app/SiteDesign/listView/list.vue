<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" title="Site List">
          <div v-if="loader">
            <Loader />
          </div>
          <div v-else>
            <vuetable
              ref="vuetable"
              :api-mode="false"
              :fields="fields"
              :data="sites"
            >
              <template v-slot:actions="slotProps">
                <router-link
                  :to="'list-view/' + slotProps.rowData.id + '/edit' + '?currTab=' + currTab"
                  tag="span"
                >
                  <i class="simple-icon-pencil"></i>
                </router-link>
                <span @click="deleteSite(slotProps.rowData.id)">
                  <i class="simple-icon-trash"></i>
                </span>
                <span @click="configureSite(slotProps.rowData.id)">
                  <i class="simple-icon-settings"></i>
                </span>
              </template>
            </vuetable>
          </div>
        </b-card>
      </b-colxx>
    </b-row>
    <Pagination
      :total_pages="total_pages"
      :page_number="page_number"
      :page_size="page_size"
      v-on:page-num-click="onPageNumClick"
    />
  </div>
</template>

<script>
/* eslint-disable */

import siteService from '@/services/site.service'
import Vuetable from 'vuetable-2'
import axios from 'axios'
import Pagination from '../../../../components/Pagination/Pagination'
import Loader from '../../../../components/Loader/Loader'

export default {
  components: {
    Vuetable,
    Pagination,
    Loader
  },
  data() {
    return {
      sites: [],
      siteData: null,
      page_number: 1,
      page_size: 5,
      total_pages: null,
      loader: true,
      currTab: 2,
      fields: [
        {
          name: 'id',
          title: '<span>Serial No.</span>',
          sortField: 'id',
          dataClass: 'list-item-heading'
        },
        {
          name: 'name',
          title: '<span>Site Name</span>',
          sortField: 'name',
          dataClass: 'list-item-heading'
        },
        {
          name: '__slot:actions',
          title: '<span>Actions</span>'
        }
      ]
    }
  },
  methods: {
    loadSites() {
      siteService
        .read({ page_number: this.page_number, page_size: this.page_size })
        .then(response => {
          this.sites = response.sites
          this.total_pages = response.total_pages
          this.loader = false
        })
    },
    onPageNumClick(num) {
      this.loader = true
      this.page_number = num
      this.sites = []
      this.loadSites()
    },
    deleteSite(id) {
      this.loader = true
      siteService.delete(id).then(response => {
        this.sites = []
        this.loadSites()
      })
    },
    configureSite(id) {
      let routeData = this.$router.resolve('/app/digital-twin-configuration');
      window.open(routeData.href, '_blank');
    }
  },
  mounted() {
    this.loadSites()
  }
}
</script>
