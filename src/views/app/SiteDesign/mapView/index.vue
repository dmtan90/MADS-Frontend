<template>
  <div class="google-map" id="google-map"></div>
</template>

<script>
/* eslint-disable */

import siteService from '@/services/site.service'

export default {
  components: {},
  mounted: function() {
    siteService.read().then(async res => {
      const element = document.getElementById('google-map')
      const options = {
        zoom: 2,
        center: new google.maps.LatLng(26.8206, 30.8025)
      }
      const map = new google.maps.Map(element, options)
      res.sites.map(site => {
        const position = new google.maps.LatLng(
          site.location_details.lat,
          site.location_details.lng
        )
        const marker = new google.maps.Marker({
          position,
          map
        })
      })
    })
  }
}
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>
