<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Edit Sensor Type" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <div class="row">
      <div class="col col-12">
        <div class="card">
          <div class="card-body col col-6">
            <b-form>
              <b-form-group label="Name">
                <b-form-input
                  v-model="sensorType.name"
                />
              </b-form-group>
              <b-form-group label="Manufacturer">
                <b-form-input
                  v-model="sensorType.make"
                />
              </b-form-group>
              <b-form-group label="Visualizer">
                <b-form-input
                  v-model="sensorType.visualizer"
                />
              </b-form-group>
              <b-form-group label="Identifier">
                <b-form-input
                  v-model="sensorType.identifier"
                />
              </b-form-group>
              <b-form-group
                label="Value keys"
                description="Hit enter to input multiple value keys"
              >
                <input-tag
                  v-model="sensorType.value_keys" :value="['a', 'b', 'c']"
                ></input-tag>
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
              <router-link to="/app/device-configuration/sensor-types">
                <b-button size="lg" variant="outline-primary">Cancel</b-button>
              </router-link>
              <b-button size="lg" variant="primary" @click="updateSensorType"
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
import InputTag from '@/components/Form/InputTag'
import { validationMixin } from "vuelidate";
import sensorTypeService from "@/services/sensorType.service";
const { required } = require("vuelidate/lib/validators");

export default {
  components: {
    InputTag
  },
  data() {
    return {
      sensorType: {},
      errors: []
    };
  },
  mixins: [validationMixin],
  validations: {
    validateForm: {}
  },
  methods: {
    updateSensorType() {
      let payload = this.sensorType;
      let id = this.$route.params.id;

      sensorTypeService.update(id, payload).then(response => {
        this.errors = [];
        if (response.errors) {
          let errors = response.errors.message.error || response.errors.message
          _.each(errors, (errors, key) => {
            this.errors = _.concat(
              this.errors,
              _.lowerCase(key) + " " + errors
            );
          });
        } else {
          this.$router.push("/app/device-configuration/sensor-types");
        }
      });
    },
    loadSensorType() {
      let id = this.$route.params.id;
      sensorTypeService.readId(id).then(response => {
        this.sensorType = response
      })
    }
  },
  mounted() {
    this.loadSensorType()
  }
};
</script>
