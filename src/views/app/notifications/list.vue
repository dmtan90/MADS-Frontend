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
    <div v-if="loader">
      <Loader />
    </div>
    <div v-else>
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
          </b-card>
        </b-colxx>
      </b-row>

      <Pagination
        :total_pages="total_pages"
        :page_number="page_number"
        :page_size="page_size"
        v-on:page-num-click="onPageNumClick"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import _ from 'lodash'
import Vuetable from 'vuetable-2'
import notificationService from '@/services/notification.service'
import Pagination from '../../../components/Pagination/Pagination.vue'
import Loader from '../../../components/Loader/Loader'

export default {
  components: {
    Vuetable,
    Pagination,
    Loader
  },
  data() {
    return {
      fields: [
        {
          name: 'device_name',
          title: '<span>Device</span>',
          sortField: 'device_name',
          dataClass: 'list-item-heading'
        },
        {
          name: 'sensor_name',
          title: '<span>Sensor</span>',
          sortField: 'sensor_name',
          dataClass: 'text-muted'
        },
        {
          name: 'alarm_status',
          title: '<span>Alarm Status</span>',
          sortField: 'alarm_status',
          dataClass: 'text-muted',
          formatter: value => {
            return value.toUpperCase()
          }
        },
        {
          name: '__slot:actions',
          title: '<span>Actions</span>'
        }
      ],
      loader : true,
      data: [],
      page_number: 1,
      page_size: 5,
      total_pages: null
    }
  },
  methods: {
    loadNotifications() {
      notificationService
        .read({ page_number: this.page_number, page_size: this.page_size })
        .then(response => {
          this.notifications = response.sensor_notification
          this.data = this.formatNotifications()
          this.total_pages = response.total_pages
          this.loader = false
        })
    },
    onPageNumClick(num) {
      this.loader = true
      this.page_number = num
      this.data = []
      this.loadNotifications()
    },
    formatNotifications() {
      return this.notifications.map(notification => {
        return {
          id: notification.id,
          device_name: notification.device.name,
          sensor_name: notification.sensor.name,
          alarm_status: notification.alarm_status
        }
      })
    },
    deleteNotification(id) {
      this.loader = true
      notificationService.delete(id).then(response => {
        this.data = []
        this.loadNotifications()
      })
    }
  },
  mounted() {
    this.loadNotifications()
  }
}
</script>
