<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" title="Tool Types">
          <router-link to="tool-types/new">
            <b-button variant="primary" size="md" class="add-sensor"
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
                <i class="iconsminds-file-edit"></i>
              </router-link>
              <span @click="deleteToolType(slotProps.rowData.id)">
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

import toolTypeService from "@/services/toolType.service";
import Vuetable from "vuetable-2";

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      toolTypes: [],
      fields: [
        {
          name: "tool_type_id",
          title: "<span>Serial No.</span>",
          sortField: "uutool_type_idid",
          dataClass: "list-item-heading"
        },
        {
          name: "identifier",
          sortField: "identifier",
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
    loadToolTypes() {
      toolTypeService.read().then(response => {
        this.toolTypes = response.tool_type;
      });
    },
    deleteToolType() {}
  },
  mounted() {
    this.loadToolTypes();
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
