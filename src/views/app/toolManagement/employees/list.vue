<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" title="Employees">
          <router-link to="employees/new">
            <b-button variant="primary" size="md" class="add-sensor">Add New</b-button>
          </router-link>
          <vuetable
            ref="vuetable"
            :api-mode="false"
            :fields="fields"
            :data="employees"
          >
            <template v-slot:actions="slotProps">
              <router-link
                :to="'employees/' + slotProps.rowData.employee_id + '/edit'"
                tag="span"
              >
                <i class="iconsminds-file-edit"></i>
              </router-link>
              <span @click="deleteEmployee(slotProps.rowData.employee_id)">
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

import employeeService from "@/services/employee.service";
import Vuetable from "vuetable-2";

export default {
  components: {
    Vuetable
  },
  data() {
    return {
      employees: [],
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
          name: "phone_number",
          title: "<span>Phone Number</span>",
          sortField: "phone_number",
          dataClass: "text-muted"
        },
        {
          name: "role",
          sortField: "role",
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
    loadEmployees() {
      employeeService.read().then(response => {
        this.employees = response.employee;
      });
    },
    deleteEmployee(id) {
      employeeService.delete(id).then(response => {
        this.loadEmployees();
      })
    }
  },
  mounted() {
    this.loadEmployees();
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
