<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="device.name" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <div class="row">
      <div class="col col-12">
        <div class="card">
          <div class="card-body">
            <b-row>
              <b-colxx xxs="2">
                <b-img class="device-image"
                  src="https://acqdat.herokuapp.com/images/device_detail_card.png"
                  thumbnail
                  fluid
                ></b-img>
              </b-colxx>
              <b-colxx xxs="10">
                <p><b>Name : </b>{{ device.name }}</p>
                <p><b>Description : </b>{{ device.description }}</p>
                <p><b>Token : </b>{{ device.access_token }}</p>
                <p><b>UUID : </b>{{ device.uuid }}</p>
              </b-colxx>
            </b-row>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col col-12">
        <b-card title="Sensors" v-if="sensorComponent === 'list'">
          <b-button
            variant="primary"
            size="md"
            class="add-new"
            @click="sensorComponent = 'new'"
            >Add New</b-button
          >
          <list-sensors
            :sensors="deviceSensors"
            @deleteSensor="deleteDeviceSensor"
            @editSensor="editDeviceSensor"
          ></list-sensors>
        </b-card>
        <b-card title="New Sensor" v-if="sensorComponent === 'new'">
          <new-sensor
            @setSensorComponent="sensorComponent = 'list'"
            @loadSensors="loadDeviceSensors"
          ></new-sensor>
        </b-card>
        <b-card title="Edit Sensor" v-if="sensorComponent === 'edit'">
          <edit-sensor
            :sensorId="editSensorId"
            @setSensorComponent="sensorComponent = 'list'"
            @loadSensors="loadDeviceSensors"
          ></edit-sensor>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import deviceService from "@/services/device.service";
import sensorService from "@/services/sensor.service";
import listSensors from "./sensors/list.vue";
import newSensor from "./sensors/new.vue";
import editSensor from "./sensors/edit.vue";

export default {
  components: {
    listSensors,
    newSensor,
    editSensor
  },
  data() {
    return {
      device: [],
      deviceSensors: [],
      editSensorId: null,
      sensorComponent: "list"
    };
  },
  methods: {
    fetchDevice() {
      let id = this.$route.params.id;
      deviceService.readId(id).then(response => {
        this.device = response;
        this.loadDeviceSensors();
      });
    },
    loadDeviceSensors() {
      let id = this.$route.params.id;
      this.sensorComponent = "list";
      this.editSensorId = null;

      sensorService.getDeviceSensors(id).then(response => {
        this.deviceSensors = response.sensors;
      });
    },
    deleteDeviceSensor(id) {
      sensorService.delete(id).then(response => {
        this.loadDeviceSensors();
      });
    },
    editDeviceSensor(id) {
      this.editSensorId = id;
      this.sensorComponent = "edit";
    }
  },
  mounted() {
    this.fetchDevice();
  }
};
</script>

<style lang="scss" scoped>
  .device-image {
    width: 90%;
  }
</style>
