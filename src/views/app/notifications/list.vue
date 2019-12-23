<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Notifications" />
        <div class="float-sm-right">
          <router-link to="notifications/new">
            <b-button variant="primary" size="lg">Add New</b-button>
          </router-link>
        </div>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" title="Notifications">
          <vuetable
            ref="vuetable"
            :api-mode="false"
            :fields="fields"
            :data="data"
          >
            <template v-slot:actions="slotProps">
              <router-link
                :to="'notifications/' + slotProps.rowData.id + '/edit'"
                tag="span"
              >
                <i class="simple-icon-pencil"></i>
              </router-link>
              <span @click="deleteNotification(slotProps.rowData.id)">
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
import notificationService from "@/services/notification.service";

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      fields: [
        {
          name: "device_name",
          title: "<span>Device</span>",
          sortField: "device_name",
          dataClass: "list-item-heading"
        },
        {
          name: "sensor_name",
          title: "<span>Sensor</span>",
          sortField: "sensor_name",
          dataClass: "text-muted"
        },
        {
          name: "alarm_status",
          title: "<span>Alarm Status</span>",
          sortField: "alarm_status",
          dataClass: "text-muted",
          formatter: value => {
            return value.toUpperCase();
          }
        },
        {
          name: "__slot:actions",
          title: "<span>Actions</span>"
        }
      ],
      data: [],
      perPage: 5
    };
  },
  methods: {
    loadNotifications() {
      notificationService.read().then(response => {
        this.notifications = response.sensor_notification;
        this.data = this.formatNotifications();
      });
    },
    formatNotifications() {
      return this.notifications.map(notification => {
        return {
          id: notification.id,
          device_name: notification.device.name,
          sensor_name: notification.sensor.name,
          alarm_status: notification.alarm_status
        };
      });
    },
    deleteNotification(id) {
      notificationService.delete(id).then(response => {
        this.loadNotifications();
      });
    }
  },
  mounted() {
    this.loadNotifications();
  }
};
</script>
