<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
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
                  <!-- <vue-dropzone
                    ref="myVueDropzone"
                    id="dropzone"
                    :options="dropzoneOptions"
                    @vdropzone-file-added="uploadImage"
                  ></vue-dropzone> -->
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
                <b-button size="lg" variant="primary" @click="createNewSite"
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
import VueDropzone from 'vue2-dropzone'
import axios from 'axios'

export default {
  components: {
    vSelect,
    googleAutocomplete,
    VueDropzone
  },
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
        // previewTemplate: this.dropzoneTemplate(),
        headers: { 'My-Awesome-Header': 'header value' }
      },
      errors: []
    }
  },
  methods: {
    createNewSite() {
      let payload = this.newSiteForm
      let fd = new FormData()
      fd.append('image', this.seldectedFIle, this.seldectedFIle.name)
      fd.append('name', this.newSiteForm.name)
      fd.append('location_details[lat]', this.newSiteForm.location_details.lat)
      fd.append('location_details[lng]', this.newSiteForm.location_details.lon)
      fd.append(
        'location_details[name]',
        this.newSiteForm.location_details.name
      )
      fd.append(
        'location_details[place_id]',
        this.newSiteForm.location_details.place_id
      )

      axios.post('http://02285a8e.ngrok.io/site', fd)

      // siteService.create(payload).then(response => {
      //   this.errors = []
      //   if (response.errors) {
      //     let errors = response.errors.message.error || response.errors.message
      //     _.each(errors, (errors, key) => {
      //       this.errors = _.concat(this.errors, _.lowerCase(key) + " " + errors)
      //     })
      //   } else {
      //     this.$router.push("/app/site-layout/list-view")
      //   }
      // })
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
      // console.log("file",file.dataURL)
    }
    // dropzoneTemplate: function() {
    //   return `(<div class="dz-preview dz-file-preview mb-3">
    //               <div class="d-flex flex-row "> <div class="p-0 w-30 position-relative">
    //                   <div class="dz-error-mark"><span><i></i>  </span></div>
    //                   <div class="dz-success-mark"><span><i></i></span></div>
    //                   <div class="preview-container">
    //                     <img data-dz-thumbnail class="img-thumbnail border-0" />
    //                     <i class="simple-icon-doc preview-icon"></i>
    //                   </div>
    //               </div>
    //               <div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
    //                 <div> <span data-dz-name /> </div>
    //                 <div class="text-primary text-extra-small" data-dz-size /> </div>
    //                 <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
    //                 <div class="dz-error-message"><span data-dz-errormessage></span></div>
    //               </div>
    //               <a href="#" class="remove" data-dz-remove> <i class="glyph-icon simple-icon-trash"></i> </a>
    //             </div> )      `
    // }
  }
}
</script>
