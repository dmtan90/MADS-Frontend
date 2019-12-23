<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Sensor Types" />
        <div class="float-sm-right">
          <router-link to="sensor-types/new">
            <b-button variant="primary" size="lg">Add New</b-button>
          </router-link>
        </div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" title="Sensor Types">
          <vuetable
            ref="vuetable"
            :api-mode="false"
            :fields="fields"
            :data="sensorTypes"
          >
            <template v-slot:actions="slotProps">
              <router-link
                :to="'sensor-types/' + slotProps.rowData.id + '/edit'"
                tag="span"
              >
                <i class="simple-icon-pencil"></i>
              </router-link>
              <span @click="deleteSensorType(slotProps.rowData.id)">
                <i class="simple-icon-trash"></i>
              </span>
            </template>
          </vuetable>
          <!-- <vuetable-pagination-bootstrap
            ref="pagination"
            @vuetable-pagination:change-page="onChangePage"
          ></vuetable-pagination-bootstrap> -->
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable */

import _ from "lodash";
import Vuetable from "vuetable-2";
import sensorTypeService from "@/services/sensorType.service";

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      fields: [
        {
          name: "name",
          sortField: "name",
          dataClass: "list-item-heading"
        },
        {
          name: "identifier",
          sortField: "identifier",
          dataClass: "text-muted"
        },
        {
          name: "make",
          title: "<span>Manufacturer</span>",
          sortField: "make",
          dataClass: "text-muted"
        },
        {
          name: "__slot:actions",
          title: "<span>Actions</span>"
        }
      ],
      sensorTypes: [],
      perPage: 5
    };
  },
  methods: {
    loadSensorTypes() {
      sensorTypeService.read().then(response => {
        this.sensorTypes = response.sensor_types;
      });
    },
    deleteSensorType(id) {
      sensorTypeService.delete(id).then(response => {
        this.loadSensorTypes();
      });
    }
  },
  mounted() {
    this.loadSensorTypes();
  }
};
</script>
