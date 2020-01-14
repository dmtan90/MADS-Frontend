<template>
  <div>
    <div v-if="loader">
      <Loader />
    </div>
    <div v-else>
      <b-row>
        <b-colxx xxs="12">
          <b-card class="mb-4" title="Tool Types">
            <router-link to="tool-types/new">
              <b-button variant="primary" size="md" class="add-new"
                >Add New</b-button
              >
            </router-link>
            <vuetable
              ref="vuetable"
              :api-mode="false"
              :fields="fields"
              :data="toolTypes"
            >
              <template v-slot:actions="slotProps">
                <router-link
                  :to="'tool-types/' + slotProps.rowData.tool_type_id + '/edit'"
                  tag="span"
                >
                  <i class="simple-icon-pencil"></i>
                </router-link>
                <span @click="deleteToolType(slotProps.rowData.tool_type_id)">
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

import toolTypeService from '@/services/toolType.service'
import Vuetable from 'vuetable-2'
import Pagination from '../../../../components/Pagination/Pagination'
import Loader from '../../../../components/Loader/Loader'

export default {
  components: {
    Vuetable,
    Pagination,
    Loader
  },
  data() {
    return {
      loader: true,
      toolTypes: [],
      fields: [
        {
          name: 'tool_type_id',
          title: '<span>Serial No.</span>',
          sortField: 'uutool_type_idid',
          dataClass: 'list-item-heading'
        },
        {
          name: 'identifier',
          sortField: 'identifier',
          dataClass: 'text-muted'
        },
        {
          name: '__slot:actions',
          title: '<span>Actions</span>'
        }
      ],
      page_number: 1,
      page_size: 5,
      total_pages: null
    }
  },
  methods: {
    loadToolTypes() {
      toolTypeService
        .read({ page_number: this.page_number, page_size: this.page_size })
        .then(response => {
          this.toolTypes = response.tool_type
          this.total_pages = response.total_pages
          this.loader = false
        })
    },
    onPageNumClick(num) {
      this.page_number = num
      this.toolTypes = []
      this.loadToolTypes()
    },
    deleteToolType(id) {
      toolTypeService.delete(id).then(response => {
        this.toolTypes = []
        this.loadToolTypes()
      })
    }
  },
  mounted() {
    this.loadToolTypes()
  }
}
</script>
