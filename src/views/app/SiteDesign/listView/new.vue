<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <div v-if="loader">
          <Loader />
        </div>
        <div v-else>
          <b-card title="Add Site">
            <b-row>
              <b-colxx xxs="6">
                <b-form>
                  <b-form-group label="Name">
                    <b-form-input type="text" v-model="newSiteForm.name" />
                  </b-form-group>
                  <b-form-group label="Location">
                    <google-autocomplete
                      :searchText="newSiteForm.name"
                      @placeChanged="setSiteLocation"
                    ></google-autocomplete>
                  </b-form-group>
                  <b-form-group label="Image">
                    <input type="file" @change="uploadImage" />
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
                  <!-- <router-link to="/app/site-layout/list-view">
                    <b-button size="lg" variant="outline-primary"
                      >Cancel</b-button
                    >
                  </router-link> -->
                  <router-link
                    v-if="this.$route.query.currTab === '0'"
                    to="/app/site-layout/"
                  >
                    <b-button size="lg" variant="outline-primary"
                      >Cancel</b-button
                    >
                  </router-link>
                  <router-link
                    v-else-if="this.$route.query.currTab === '1'"
                    to="/app/site-layout/tile-view"
                  >
                    <b-button size="lg" variant="outline-primary"
                      >Cancel</b-button
                    >
                  </router-link>
                  <router-link v-else to="/app/site-layout/list-view">
                    <b-button size="lg" variant="outline-primary"
                      >Cancel</b-button
                    >
                  </router-link>
                  <b-button size="lg" variant="primary" @click="createNewSite"
                    >Submit</b-button
                  >
                </div>
              </b-colxx>
            </b-row>
          </b-card>
        </div>
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
import VueDropzone from 'vue2-dropzone'
import axios from 'axios'
import { apiUrl } from '../../../../constants/config'
import Loader from '../../../../components/Loader/Loader'

export default {
  components: {
    vSelect,
    googleAutocomplete,
    VueDropzone,
    Loader
  },
  props: {},
  data() {
    return {
      newSiteForm: {
        name: '',
        location_details: null,
        image: null
      },
      seldectedFIle: null,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailHeight: 160,
        maxFilesize: 2,
        headers: { 'My-Awesome-Header': 'header value' }
      },
      errors: [],
      loader: false
    }
  },
  methods: {
    createNewSite() {
      this.loader = true
      let payload = this.newSiteForm
      let fd = new FormData()
      if (this.seldectedFIle === null) {
        fd.append('image', null)
      } else {
        fd.append('image', this.seldectedFIle, this.seldectedFIle.name)
      }
      fd.append('name', this.newSiteForm.name)
      if (this.newSiteForm.location_details === null) {
        fd.append('location_details[lat]', null)
        fd.append('location_details[lng]', null)
        fd.append('location_details[name]', null)
        fd.append('location_details[place_id]', null)
      } else {
        fd.append(
          'location_details[lat]',
          this.newSiteForm.location_details.lat
        )
        fd.append(
          'location_details[lng]',
          this.newSiteForm.location_details.lon
        )
        fd.append(
          'location_details[name]',
          this.newSiteForm.location_details.name
        )
        fd.append(
          'location_details[place_id]',
          this.newSiteForm.location_details.place_id
        )
      }
      siteService.create(fd).then(response => {
        this.loader = false
        this.errors = []
        if (response.errors) {
          this.loader = false
          let errors = response.errors.message.error || response.errors.message
          _.each(errors, (errors, key) => {
            this.errors = _.concat(this.errors, _.lowerCase(key) + ' ' + errors)
          })
        } else {
          if (parseInt(this.$route.query.currTab) === 2) {
            this.$router.push('/app/site-layout/list-view')
          } else if (parseInt(this.$route.query.currTab) === 1) {
            this.$router.push('/app/site-layout/tile-view')
          } else if (parseInt(this.$route.query.currTab) === 0) {
            this.$router.push('/app/site-layout')
          } else {
            this.$router.push('/app/site-layout/list-view')
          }
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

      this.newSiteForm.location_details = location_details
    },
    uploadImage(file) {
      this.seldectedFIle = file.target.files[0]
    }
  }
}
</script>
