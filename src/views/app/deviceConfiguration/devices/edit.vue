<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Edit Device" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <div class="row">
      <div class="col col-12">
        <div class="card">
          <div class="card-body col col-6">
            <b-form>
              <b-form-group label="Name">
                <b-form-input type="text" v-model="device.name" />
              </b-form-group>
              <b-form-group label="Description">
                <b-form-textarea
                  rows="4"
                  v-model="device.description"
                ></b-form-textarea>
              </b-form-group>
              <b-form-group label="Access Token">
                <b-form-input type="text" v-model="device.access_token" />
              </b-form-group>
            </b-form>
            <b-form-group label="Image">
              <input type="file" id="img" @change="uploadImage" />
              <span>{{ img_name }}</span>
            </b-form-group>
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
              <router-link to="/app/device-configuration/devices">
                <b-button size="lg" variant="outline-primary">Cancel</b-button>
              </router-link>
              <b-button size="lg" variant="primary" @click="updateDevice"
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

export default {
  data() {
    return {
      device: {},
      errors: [],
      newImg: null,
      img_name : ""
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
    fetchDevice() {
      let id = this.$route.params.id
      deviceService.readId(id).then(response => {
        this.device = response
        this.extractName(response.image_url)
      })
    },
    updateDevice() {
      let payload = this.device

      let fd = new FormData()
      if (this.newImg) {
        fd.append('image', this.newImg, this.newImg.name)
      }
      fd.append('name', this.device.name)
      fd.append('description', this.device.description)
      fd.append('access_token', this.device.access_token)
      // fd.append('site_id', this.device.site_id)

      deviceService.update(this.device.id,fd).then(response => {
        this.errors = []
        let that = this
        if (response.errors) {
          _.each(response.errors.message, (errors, key) => {
            this.errors = _.concat(this.errors, _.lowerCase(key) + ' ' + errors)
          })
        } else {
          this.$router.push('/app/device-configuration/devices')
        }
      })
    },
    uploadImage(file) {
      this.newImg = file.target.files[0]
      this.img_name = file.target.files[0].name
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
      this.device.image_name = extUrl
      this.img_name = extUrl
    }
  },
  mounted() {
    this.fetchDevice()
  }
}
</script>

<style scoped>
input[type='file'] 
{
  color: transparent;
  width: 100%;
  height: 36px;
  border-radius: 3px;
}
</style>
