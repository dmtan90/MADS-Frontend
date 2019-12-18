<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="device.name" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <div class="row">
      <div class="col col-3">
        <div class="card">
          <div class="card-body">
            <b-row>
              <b-colxx>
                <b-img
                  src="https://acqdat.herokuapp.com/images/device_detail_card.png"
                  thumbnail
                  fluid
                ></b-img>
              </b-colxx>
            </b-row>
            <b-row>
              <b-colxx>
                <p>Name : {{device.name}}</p>
                <p>Description : {{device.description}}</p>
                <p>Token : {{device.access_token}}</p>
                <p>UUID : {{device.uuid}}</p>
              </b-colxx>
            </b-row>
          </div>
        </div>
      </div>
      <div class="col col-9">
        <b-card title="Sensors" v-if="sensorComponent === 'list'">
          <b-button variant="primary" size="md" class="add-sensor" @click="sensorComponent = 'new'">Add New</b-button>
          <list-sensors :sensors="deviceSensors" @deleteSensor="deleteDeviceSensor" @editSensor="editDeviceSensor"></list-sensors>
        </b-card>
        <b-card title="New Sensor" v-if="sensorComponent === 'new'">
          <new-sensor @setSensorComponent="sensorComponent = 'list'" @loadSensors="loadDeviceSensors"></new-sensor>
        </b-card>
        <b-card title="Edit Sensor" v-if="sensorComponent === 'edit'">
          <edit-sensor :sensorId="editSensorId" @setSensorComponent="sensorComponent = 'list'" @loadSensors="loadDeviceSensors"></edit-sensor>
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
      sensorComponent: 'list'
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
      this.sensorComponent = 'list';
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
      this.sensorComponent = 'edit';
    }
  },
  mounted() {
    this.fetchDevice();
  }
};
</script>

<style lang="scss" scoped>
  .add-sensor{
    position: absolute;
    right: 1.75rem;
    top: 1.75rem;
  }
</style>
