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
    <div v-if="sensorTypes.length === 0">
      <Loader />
    </div>
    <div v-else>
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
import sensorTypeService from '@/services/sensorType.service'
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
          name: 'name',
          sortField: 'name',
          dataClass: 'list-item-heading'
        },
        {
          name: 'identifier',
          sortField: 'identifier',
          dataClass: 'text-muted'
        },
        {
          name: 'make',
          title: '<span>Manufacturer</span>',
          sortField: 'make',
          dataClass: 'text-muted'
        },
        {
          name: '__slot:actions',
          title: '<span>Actions</span>'
        }
      ],
      sensorTypes: [],
      page_number: 1,
      page_size: 2,
      total_pages: null
    }
  },
  methods: {
    loadSensorTypes() {
      sensorTypeService
        .read({ page_number: this.page_number, page_size: this.page_size })
        .then(response => {
          this.sensorTypes = response.sensor_types
          this.total_pages = response.total_pages
        })
    },
    onPageNumClick(num) {
      this.page_number = num
      this.sensorTypes = []
      this.loadSensorTypes()
    },
    deleteSensorType(id) {
      sensorTypeService.delete(id).then(response => {
        this.sensorTypes = []
        this.loadSensorTypes()
      })
    }
  },
  mounted() {
    this.loadSensorTypes()
  }
}
</script>
