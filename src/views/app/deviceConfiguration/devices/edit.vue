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
            <b-row v-if="errors.length > 0">
              <b-colxx xxs="12">
                <div
                  v-for="(error, index) in errors"
                  :key="index"
                  class="mt-2 error-message capitalize-first-letter"
                >
                  {{error}}
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

import _ from "lodash";
import { validationMixin } from "vuelidate";
import deviceService from "@/services/device.service";
const { required } = require("vuelidate/lib/validators");

export default {
  data() {
    return {
      device: {},
      errors: []
    };
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
      let id = this.$route.params.id;
      deviceService.readId(id).then(response => {
        this.device = response;
      });
    },
    updateDevice() {
      let payload = this.device;
      deviceService.update(this.device.id, payload).then(response => {
        this.errors = [];
        let that = this;
        if(response.errors) {
          _.each(response.errors.message, (errors, key) => {
            this.errors = _.concat(
              this.errors,
              _.lowerCase(key) + " " + errors
            );
          });
        } else {
          this.$router.push("/app/device-configuration/devices");
        }
      });
    }
  },
  mounted () {
    this.fetchDevice();
  }
};
</script>
