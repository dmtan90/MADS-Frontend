<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="fields"
          :data="sensors"
        >
          <template v-slot:sensor-type="slotProps">
            <span>
              {{ slotProps.rowData.sensor_type.name }}
            </span>
          </template>
          <template v-slot:actions="slotProps">
            <span @click="editDeviceSensor(slotProps.rowData.id)" class="cursor-pointer">
              <i class="iconsminds-file-edit"></i>
            </span>
            <span @click="deleteDeviceSensor(slotProps.rowData.id)" class="cursor-pointer">
              <i class="iconsminds-delete-file"></i>
            </span>
          </template>
        </vuetable>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable */

import Vuetable from "vuetable-2";

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
          name: "uuid",
          sortField: "uuid",
          dataClass: "text-muted"
        },
        {
          name: "__slot:sensor-type",
          title: "<span>Sensor Type</span>",
          sortField: "sensor_type_id",
          dataClass: "text-muted"
        },
        {
          name: "__slot:actions",
          title: "<span>Actions</span>"
        }
      ]
    };
  },
  props: ["sensors"],
  methods: {
    deleteDeviceSensor(id) {
      this.$emit('deleteSensor', id)
    },
    editDeviceSensor(id) {
      this.$emit('editSensor', id)
    }
  }
};
</script>
