<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" title="Tool Boxes">
          <router-link to="tool-boxes/new">
            <b-button variant="primary" size="md" class="add-sensor">Add New</b-button>
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
                <i class="iconsminds-file-edit"></i>
              </router-link>
              <span @click="deleteToolbox(slotProps.rowData.tool_box_id)">
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

import toolBoxService from "@/services/toolBox.service";
import Vuetable from "vuetable-2";

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      toolBoxes: [],
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
          name: "__slot:actions",
          title: "<span>Actions</span>"
        }
      ]
    };
  },
  methods: {
    loadToolBoxes() {
      toolBoxService.read().then(response => {
        this.toolBoxes = response.tool_box;
      });
    },
    deleteToolbox(id) {
      toolBoxService.delete(id).then(response => {
        this.loadToolBoxes();
      });
    }
  },
  mounted() {
    this.loadToolBoxes();
  }
};
</script>

<style lang="scss" scoped>
  .add-sensor{
    position: absolute;
    right: 1.75rem;
    top: 1.75rem;
  }
</style>
