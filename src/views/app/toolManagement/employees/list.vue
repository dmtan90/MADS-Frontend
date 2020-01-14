<template>
  <div>
    <div v-if="loader">
      <Loader />
    </div>
    <div v-else>
      <b-row>
        <b-colxx xxs="12">
          <b-card class="mb-4" title="Employees">
            <router-link to="employees/new">
              <b-button variant="primary" size="md" class="add-new"
                >Add New</b-button
              >
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
                  <i class="simple-icon-pencil"></i>
                </router-link>
                <span @click="deleteEmployee(slotProps.rowData.employee_id)">
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

import employeeService from '@/services/employee.service'
import Vuetable from 'vuetable-2'
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
      employees: [],
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
          name: 'phone_number',
          title: '<span>Phone Number</span>',
          sortField: 'phone_number',
          dataClass: 'text-muted'
        },
        {
          name: 'role',
          sortField: 'role',
          dataClass: 'text-muted'
        },
        {
          name: '__slot:actions',
          title: '<span>Actions</span>'
        }
      ],
      loader: true,
      page_number: 1,
      page_size: 5,
      total_pages: null
    }
  },
  methods: {
    loadEmployees() {
      employeeService
        .read({ page_number: this.page_number, page_size: this.page_size })
        .then(response => {
          this.employees = response.employee
          this.total_pages = response.total_pages
          this.loader = false
        })
    },
    onPageNumClick(num) {
      this.loader = true
      this.page_number = num
      this.employees = []
      this.loadEmployees()
    },
    deleteEmployee(id) {
      this.loader = true
      employeeService.delete(id).then(response => {
        this.employees = []
        this.loadEmployees()
      })
    }
  },
  mounted() {
    this.loadEmployees()
  }
}
</script>
