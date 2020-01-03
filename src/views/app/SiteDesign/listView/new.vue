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

import siteService from "@/services/site.service"
import _ from "lodash"
import vSelect from "vue-select"
import toolTypeService from "@/services/toolType.service"
import googleAutocomplete from "./../../shared/googleAutocomplete.vue"

export default {
  components: {
    vSelect,
    googleAutocomplete
  },
  data() {
    return {
      newSiteForm: {
        name: "",
        location_details: null
      },
      errors: []
    }
  },
  methods: {
    createNewSite() {
      let payload = this.newSiteForm

      siteService.create(payload).then(response => {
        this.errors = []
        if (response.errors) {
          let errors = response.errors.message.error || response.errors.message
          _.each(errors, (errors, key) => {
            this.errors = _.concat(this.errors, _.lowerCase(key) + " " + errors)
          })
        } else {
          this.$router.push("/app/site-layout/list-view")
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

      this.newSiteForm.location_details = location_details;
    }
  }
}
</script>
