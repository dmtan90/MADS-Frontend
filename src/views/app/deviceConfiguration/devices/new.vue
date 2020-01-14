<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="New Device" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <div class="row">
      <div class="col col-12">
        <div class="card">
          <div class="card-body col col-6">
            <b-form>
              <b-form-group label="Name">
                <b-form-input type="text" v-model="deviceForm.name" />
              </b-form-group>
              <b-form-group label="Description">
                <b-form-textarea
                  rows="4"
                  v-model="deviceForm.description"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group label="Access Token">
                <b-form-input type="text" v-model="deviceForm.access_token" />
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
            <!-- <b-form-group label="Select Site">
              <select @change="onSiteSelect">
                <option :value="null">Select Site</option>
                <option :value="site.id" v-for="site in sites" :key="site.id">
                  {{ site.name }}
                </option>
              </select>
            </b-form-group> -->
            <b-form-group label="Select Site">
              <v-select
                v-model="deviceForm.site_id"
                label="name"
                :options="sites"
                index="id"
              />
            </b-form-group>
            <b-form-group label="Image">
              <input type="file" @change="uploadImage" />
            </b-form-group>
            <div class="mt-5">
              <router-link to="/app/device-configuration/devices">
                <b-button size="lg" variant="outline-primary">Cancel</b-button>
              </router-link>
              <b-button size="lg" variant="primary" @click="createDevice"
                >Submit</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import _ from 'lodash'
import { validationMixin } from 'vuelidate'
import deviceService from '@/services/device.service'
const { required } = require('vuelidate/lib/validators')
import siteService from '../../../../services/site.service'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect
  },
  data() {
    return {
      sites: [],
      deviceForm: {
        name: '',
        description: '',
        access_token: '',
        site_id: null,
        image: null
      },
      errors: []
    }
  },
  mixins: [validationMixin],
  validations: {
    validateForm: {
      name: {
        required
      },
      description: {
        required
      },
      access_token: {
        required
      }
    }
  },
  methods: {
    createDevice() {
      let payload = this.deviceForm

      let fd = new FormData()
      fd.append('image', this.deviceForm.image, this.deviceForm.image.name)
      fd.append('name', this.deviceForm.name)
      fd.append('description', this.deviceForm.description)
      fd.append('access_token', this.deviceForm.access_token)
      fd.append('site_id', this.deviceForm.site_id)

      deviceService.create(fd).then(response => {
        this.errors = []
        if (response.errors) {
          _.each(response.errors.message.error, (errors, key) => {
            this.errors = _.concat(this.errors, _.lowerCase(key) + ' ' + errors)
          })
        } else {
          this.$router.push('/app/device-configuration/devices')
        }
      })
    },
    loadSites() {
      siteService.read().then(response => {
        this.sites = response.sites
      })
    },
    uploadImage(file) {
      this.deviceForm.image = file.target.files[0]
    }
  },
  mounted() {
    this.loadSites()
  }
}
</script>
