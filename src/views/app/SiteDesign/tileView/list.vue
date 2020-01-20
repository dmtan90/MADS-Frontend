<template>
  <div class="content">
    <div v-if="loader">
      <Loader />
    </div>
    <div v-else>
      <div class="no-data-cont" v-if="sites.length === 0">
        <h1>No Data Available</h1>
      </div>
      <div v-else>
        <b-row>
          <b-colxx
            xxs="12"
            xs="6"
            lg="3"
            v-for="site in sites"
            v-bind:key="site.id"
          >
            <b-card class="mb-4" no-body>
              <div class="position-relative">
                <img :src="site.image_url" class="card-img-top tile" />
              </div>
              <b-card-body>
                <h6 class="mb-4 card-subtitle site-name">{{ site.name }}</h6>
                <div class="tile-act">
                  <router-link :to="`list-view/${site.id}/edit?currTab=1`">
                    <i class="simple-icon-pencil pencil-icon"></i>
                  </router-link>
                  <span @click="deleteSite(site.id)">
                    <i class="simple-icon-trash trash-icon"></i>
                  </span>
                </div>
              </b-card-body>
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
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import siteService from '@/services/site.service'
import Loader from '../../../../components/Loader/Loader'
import Pagination from '../../../../components/Pagination/Pagination'
// import Pagination from "../../../../components/Pagination/Pagination"

export default {
  components: {
    Loader,
    Pagination
  },
  data() {
    return {
      sites: [],
      loader: true,
      page_number: 1,
      page_size: 5,
      total_pages: null,
      selectedTab: 0
    }
  },
  methods: {
    loadSites() {
      siteService.read({ page_number: this.page_number, page_size: this.page_size }).then(response => {
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
        this.loadSites()
      })
    }
  },
  mounted() {
    this.loadSites()
    this.selectedTab = this.$route.query.currTab
  }
}
</script>

<style scoped>
.tile {
  height: 230px !important;
  object-fit: cover !important;
}

.site-name {
  margin: 0 !important;
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tile-act {
  display: flex;
  align-items: center;
}

.pencil-icon {
  cursor: pointer;
}

.trash-icon {
  margin: 0 0 0 20px;
  cursor: pointer;
}

.no-data-cont {
  background: white;
}

.no-data-cont h1 {
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 50px;
}
</style>
