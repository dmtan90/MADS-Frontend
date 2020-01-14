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
    <div v-if="loader">
      <Loader />
    </div>
    <div v-else>
      <b-row>
        <b-colxx xxs="12">
          <b-card class="mb-4" title="Devices">
            <div v-if="loader">
              <Loader />
            </div>
            <div v-else>
              <vuetable
                ref="vuetable"
                :api-mode="false"
                :fields="fields"
                :data="devices"
              >
                <template v-slot:name="slotProps">
                  <router-link
                    :to="'devices/' + slotProps.rowData.id"
                    tag="span"
                    class="cursor-pointer"
                    >{{ slotProps.rowData.name }}</router-link
                  >
                </template>
                <template v-slot:actions="slotProps">
                  <router-link
                    :to="'devices/' + slotProps.rowData.id + '/edit'"
                    tag="span"
                  >
                    <i class="simple-icon-pencil"></i>
                  </router-link>
                  <span @click="deleteDevice(slotProps.rowData.id)">
                    <i class="simple-icon-trash"></i>
                  </span>
                </template>
              </vuetable>
            </div>
          </b-card>
        </b-colxx>
      </b-row>
    </div>
    <Pagination
      :total_pages="total_pages"
      :page_number="page_number"
      :page_size="page_size"
      v-on:page-num-click="onPageNumClick"
    />
  </div>
</template>

<script>
/* eslint-disable */

import _ from 'lodash'
import Vuetable from 'vuetable-2'
import deviceService from '@/services/device.service'
import Pagination from '../../../../components/Pagination/Pagination.vue'
import Loader from '../../../../components/Loader/Loader'

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
          name: '__slot:name',
          title: '<span>Name</span>',
          sortField: 'name',
          dataClass: 'list-item-heading'
        },
        {
          name: 'access_token',
          title: '<span>Access Token</span>',
          sortField: 'access_token',
          dataClass: 'text-muted'
        },
        {
          name: 'uuid',
          title: '<span>UUID</span>',
          sortField: 'uuid',
          dataClass: 'text-muted'
        },
        {
          name: '__slot:actions',
          title: '<span>Actions</span>'
        }
      ],
      loader: true,
      devices: [],
      page_number: 1,
      page_size: 5,
      total_pages: null
    }
  },
  methods: {
    loadDevices() {
      deviceService
        .read({ page_number: this.page_number, page_size: this.page_size })
        .then(response => {
          this.devices = response.devices
          this.total_pages = response.total_pages
          this.loader = false
        })
    },
    onPageNumClick(num) {
      this.loader = true
      this.page_number = num
      this.devices = []
      this.loadDevices()
    },
    deleteDevice(id) {
      this.loader = true
      deviceService.delete(id).then(response => {
        this.devices = []
        this.loadDevices()
      })
    }
  },
  mounted() {
    this.loadDevices()
  }
}
</script>

<style scoped>
.paging {
  display: flex;
  justify-content: center;
  align-items: center;
}

.active-pg {
  background: #4cb6bb;
  color: #fff;
  font-weight: bold;
  border-radius: 50%;
}

.active-pg a {
  color: #fff;
}

.active-pg:hover,
.active-pg a:hover {
  border: none !important;
  color: #fff !important;
}
</style>
