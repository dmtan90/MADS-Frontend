<template>
  <div>
    <div v-if="toolBoxes.length === 0">
      <Loader />
    </div>
    <div v-else>
      <b-row>
        <b-colxx xxs="12">
          <b-card class="mb-4" title="Tool Boxes">
            <router-link to="tool-boxes/new">
              <b-button variant="primary" size="md" class="add-new"
                >Add New</b-button
              >
            </router-link>
            <vuetable
              ref="vuetable"
              :api-mode="false"
              :fields="fields"
              :data="toolBoxes"
            >
              <template v-slot:actions="slotProps">
                <router-link
                  :to="'tool-boxes/' + slotProps.rowData.tool_box_id + '/edit'"
                  tag="span"
                >
                  <i class="simple-icon-pencil"></i>
                </router-link>
                <span @click="deleteToolbox(slotProps.rowData.tool_box_id)">
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

import toolBoxService from '@/services/toolBox.service'
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
      toolBoxes: [],
      fields: [
        {
          name: 'uuid',
          title: '<span>UUID</span>',
          sortField: 'uuid',
          dataClass: 'list-item-heading'
        },
        {
          name: 'name',
          title: '<span>Name</span>',
          sortField: 'name',
          dataClass: 'text-muted'
        },
        {
          name: '__slot:actions',
          title: '<span>Actions</span>'
        }
      ],
      page_number: 1,
      page_size: 2,
      total_pages: null
    }
  },
  methods: {
    loadToolBoxes() {
      toolBoxService
        .read({ page_number: this.page_number, page_size: this.page_size })
        .then(response => {
          this.toolBoxes = response.tool_box
          this.total_pages = response.total_pages
        })
    },
    onPageNumClick(num) {
      this.page_number = num
      this.toolBoxes = []
      this.loadToolBoxes()
    },
    deleteToolbox(id) {
      toolBoxService.delete(id).then(response => {
        this.toolBoxes = []
        this.loadToolBoxes()
      })
    }
  },
  mounted() {
    this.loadToolBoxes()
  }
}
</script>
