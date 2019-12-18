<template>
  <div>
    <b-row>
      <b-colxx xxs="6">
        <b-form>
          <b-form-group label="Name">
            <b-form-input type="text" v-model="sensor.name" />
          </b-form-group>
          <b-form-group label="Sensor type">
            <v-select
              v-model="sensor.sensor_type_id"
              label="name"
              index="id"
              :options="sensorTypes"
            />
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
          <b-button size="lg" variant="outline-primary" @click="goToListSensors">Cancel</b-button>
          <b-button size="lg" variant="primary" @click="updateSensor"
            >Submit</b-button
          >
        </div>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable */

import _ from "lodash";
import vSelect from "vue-select";
import sensorService from "@/services/sensor.service";
import sensorTypeService from "@/services/sensorType.service";

export default {
  components: {
    vSelect
  },
  props: ["sensorId"],
  data() {
    return {
      sensorTypes: [],
      sensor: {},
      errors: []
    };
  },
  methods: {
    loadSensorTypes() {
      sensorTypeService.read().then(response => {
        this.sensorTypes = response.sensor_types;
      });
    },
    loadSensor() {
      sensorService.readId(this.sensorId).then(response => {
        this.sensor = response;
      })
    },
    updateSensor() {
      let payload = this.sensor;

      sensorService.update(this.sensorId, payload).then(response => {
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
          this.$emit('loadSensors');
        }
      });
    },
    goToListSensors() {
      this.$emit('setSensorComponent');
    }
  },
  mounted() {
    this.loadSensor();
    this.loadSensorTypes();
  }
};
</script>
