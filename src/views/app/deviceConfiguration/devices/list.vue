<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Devices" />
        <div class="float-sm-right">
          <router-link to="devices/new">
            <b-button variant="primary" size="lg">Add New</b-button>
          </router-link>
        </div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" title="Devices">
          <vuetable
            ref="vuetable"
            :api-mode="false"
            :fields="fields"
            :data="devices"
          >
            <template v-slot:name="slotProps">
              <router-link :to="'devices/' + slotProps.rowData.id" tag="span" class="cursor-pointer">{{slotProps.rowData.name}}</router-link>
            </template>
            <template v-slot:actions="slotProps">
              <router-link
                :to="'devices/' + slotProps.rowData.id + '/edit'"
                tag="span"
              >
                <i class="iconsminds-file-edit"></i>
              </router-link>
              <span @click="deleteDevice(slotProps.rowData.id)">
                <i class="iconsminds-delete-file"></i>
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
import deviceService from "@/services/device.service";

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      fields: [
        {
          name: "__slot:name",
          title: "<span>Name</span>",
          sortField: "name",
          dataClass: "list-item-heading"
        },
        {
          name: "access_token",
          title: "<span>Access Token</span>",
          sortField: "access_token",
          dataClass: "text-muted"
        },
        {
          name: "uuid",
          title: "<span>UUID</span>",
          sortField: "uuid",
          dataClass: "text-muted"
        },
        {
          name: "__slot:actions",
          title: "<span>Actions</span>"
        }
      ],
      devices: [],
      perPage: 5
    };
  },
  methods: {
    loadDevices() {
      deviceService.read().then(response => {
        this.devices = response.devices;
      });
    },
    deleteDevice(id) {
      deviceService.delete(id).then(response => {
        this.loadDevices();
      });
    }
  },
  mounted() {
    this.loadDevices();
  }
};
</script>

<style lang="scss" scoped>
i {
  font-size: 20px;
  cursor: pointer;
}
</style>
