<template>
  <div>
    <div v-if="tools.length === 0">
      <Loader />
    </div>
    <div v-else>
      <b-row>
        <b-colxx xxs="12">
          <b-card class="mb-4" title="Tools">
            <router-link to="tools/new">
              <b-button variant="primary" size="md" class="add-new"
                >Add New</b-button
              >
            </router-link>
            <vuetable
              ref="vuetable"
              :api-mode="false"
              :fields="fields"
              :data="tools"
            >
              <template v-slot:tool-type="slotProps">
                <span>{{ slotProps.rowData.tool_type.identifier }}</span>
              </template>
              <template v-slot:tool-box="slotProps">
                <span>{{ slotProps.rowData.tool_box.name }}</span>
              </template>
              <template v-slot:actions="slotProps">
                <router-link
                  :to="'tools/' + slotProps.rowData.tool_id + '/edit'"
                  tag="span"
                >
                  <i class="simple-icon-pencil"></i>
                </router-link>
                <span @click="deleteTool(slotProps.rowData.tool_id)">
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

import toolService from '@/services/tool.service'
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
      tools: [],
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
          name: '__slot:tool-type',
          title: '<span>Tool Type</span>',
          dataClass: 'text-muted'
        },
        {
          name: '__slot:tool-box',
          title: '<span>Tool Box</span>',
          dataClass: 'text-muted'
        },
        {
          name: 'status',
          title: '<span>Status</span>',
          sortField: 'status',
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
    loadTools() {
      toolService
        .read({ page_number: this.page_number, page_size: this.page_size })
        .then(response => {
          this.tools = response.tools
          this.total_pages = response.total_pages
        })
    },
    onPageNumClick(num) {
      this.page_number = num
      this.tools = []
      this.loadTools()
    },
    deleteTool(id) {
      toolService.delete(id).then(response => {
        this.tools = []
        this.loadTools()
      })
    }
  },
  mounted() {
    this.loadTools()
  }
}
</script>
