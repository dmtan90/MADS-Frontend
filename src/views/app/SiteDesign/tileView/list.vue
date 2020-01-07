<template>
  <div class="content">
    <div v-if="sites.length == 0">
      <Loader />
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
                <router-link :to="`list-view/${site.id}/edit`">
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
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import siteService from '@/services/site.service'
import Loader from '../../../../components/Loader/Loader'

export default {
  components: {
    Loader
  },
  data() {
    return {
      sites: []
    }
  },
  methods: {
    loadSites() {
      siteService.read().then(response => {
        this.sites = response.sites
      })
    },
    deleteSite(id) {
      siteService.delete(id).then(response => {
        this.loadSites()
      })
    }
  },
  mounted() {
    this.loadSites()
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
</style>
