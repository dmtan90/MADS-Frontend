<template>
  <div>
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
  </div>
</template>

<script>
/* eslint-disable */

import toolService from "@/services/tool.service";
import Vuetable from "vuetable-2";

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      tools: [],
      fields: [
        {
          name: "uuid",
          title: "<span>UUID</span>",
          sortField: "uuid",
          dataClass: "list-item-heading"
        },
        {
          name: "name",
          title: "<span>Name</span>",
          sortField: "name",
          dataClass: "text-muted"
        },
        {
          name: "__slot:tool-type",
          title: "<span>Tool Type</span>",
          dataClass: "text-muted"
        },
        {
          name: "__slot:tool-box",
          title: "<span>Tool Box</span>",
          dataClass: "text-muted"
        },
        {
          name: "status",
          title: "<span>Status</span>",
          sortField: "status",
          dataClass: "text-muted"
        },
        {
          name: "__slot:actions",
          title: "<span>Actions</span>"
        }
      ]
    };
  },
  methods: {
    loadTools() {
      toolService.read().then(response => {
        this.tools = response.tools;
      });
    },
    deleteTool(id) {
      toolService.delete(id).then(response => {
        this.loadTools();
      });
    }
  },
  mounted() {
    this.loadTools();
  }
};
</script>
