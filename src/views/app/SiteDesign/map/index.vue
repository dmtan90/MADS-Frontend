<template>
    <div>
      <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" title="Site List">
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
          name: "",
          title: "<span>Serial No.</span>",
          sortField: "",
          dataClass: ""
        },
        {
          name: "",
          sortField: "",
          title: "<span>Clmn 2<span>",
          dataClass: ""
        },
        {
          name: "",
          sortField: "",
          title: "<span>Clmn 3</span>",
          dataClass: ""
        }
      ]
    };
  },
}
</script>


<style>

</style>