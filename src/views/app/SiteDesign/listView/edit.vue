<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card title="Edit Site">
          <b-row>
            <b-colxx xxs="6">
              <b-form>
                <b-form-group label="Name">
                  <b-form-input type="text" v-model="site.name" />
                </b-form-group>
                <b-form-group label="Current Location">
                  <b-form-input type="text" disabled v-model="siteLocation" />
                </b-form-group>
                <b-form-group label="New Location">
                  <google-autocomplete
                    :searchText="siteLocation"
                    @placeChanged="setSiteLocation"
                  ></google-autocomplete>
                </b-form-group>
                <b-form-group label="Image">
                  <input type="file" id="img" @change="uploadImage" />
                  <!-- <label class="button" for="img">Upload a New Image</label> -->
                  <span>{{ image_name }}</span>
                </b-form-group>
              </b-form>
              <b-row v-if="errors.length > 0">
                <b-colxx xxs="12">
                  <div
                    v-for="(error, index) in errors"
                    :key="index"
                    class="mt-2 error-message capitalize-first-letter"
                  >
                    {{ error }}
                  </div>
                </b-colxx>
              </b-row>
              <div class="mt-5">
                <router-link to="/app/site-layout/list-view">
                  <b-button size="lg" variant="outline-primary"
                    >Cancel</b-button
                  >
                </router-link>
                <b-button size="lg" variant="primary" @click="updateSite"
                  >Submit</b-button
                >
              </div>
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable */

import siteService from '@/services/site.service'
import _ from 'lodash'
import vSelect from 'vue-select'
import toolTypeService from '@/services/toolType.service'
import googleAutocomplete from './../../shared/googleAutocomplete.vue'
import axios from 'axios'
import {apiUrl} from "../../../../constants/config"

export default {
  components: {
    vSelect,
    googleAutocomplete
  },
  data() {
    return {
      site: {},
      siteLocation: '',
      errors: [],
      image_name: '',
      selectedFile: null
    }
  },
  methods: {
    loadSite() {
      let id = this.$route.params.id
      siteService.readId(id).then(response => {
        this.site = response
        this.extractName(response.image_url)
        this.siteLocation = response.location_details.name
      })
    },
    updateSite() {
      let payload = this.site
      let id = this.$route.params.id

      let fd = new FormData()
      if (this.selectedFile) {
        fd.append('image', this.selectedFile, this.selectedFile.name)
      }
      fd.append('name', this.site.name)
      fd.append('location_details[lat]', this.site.location_details.lat)
      fd.append('location_details[lng]', this.site.location_details.lon)
      fd.append('location_details[name]', this.site.location_details.name)
      fd.append(
        'location_details[place_id]',
        this.site.location_details.place_id
      )
      siteService.update(id,fd).then(response => {
        this.errors = []
        if (response.errors) {
          let errors = response.errors.message.error || response.errors.message
          _.each(errors, (errors, key) => {
            this.errors = _.concat(this.errors, _.lowerCase(key) + ' ' + errors)
          })
        } else {
          this.$router.push('/app/site-layout/list-view')
        }
      })
    },
    setSiteLocation(place) {
      let location_details = {
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng(),
        name: place.formatted_address,
        place_id: place.place_id
      }

      this.site.location_details = location_details
    },
    uploadImage(file) {
      this.selectedFile = file.target.files[0]
      this.image_name = ''
    },
    extractName(url) {
      let extRevUrl = ''
      for (let i = url.length - 1; i >= 0; i--) {
        if (url[i] !== '/') {
          extRevUrl += url[i]
        } else {
          break
        }
      }

      let extUrl = ''
      for (let i = extRevUrl.length - 1; i >= 0; i--) {
        extUrl += extRevUrl[i]
      }
      this.image_name = extUrl
    }
  },
  mounted() {
    this.loadSite()
  }
}
</script>

<style scoped>
.button {
  padding: 10px 20px;
  text-align: center;
  color: #fff;
  border-radius: 50px;
  background: #4cb6bb;
  font-weight: bold;
  cursor: pointer;
}</style
>>
