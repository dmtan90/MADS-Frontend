<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4 dashboard">
          <b-row>
            <b-colxx xxs="3">
              <b-card class="text-center icon-cards-row">
                <div class="icon">
                  <i class="simple-icon-people" />
                </div>
                <div class="info">
                  <p class="card-text font-weight-semibold mb-0">
                    Total Employees
                  </p>
                  <p class="lead text-center">{{ totalEmployees }}</p>
                </div>
              </b-card>
            </b-colxx>
            <b-colxx xxs="3">
              <b-card class="text-center icon-cards-row">
                <div class="icon">
                  <i class="simple-icon-wrench" />
                </div>
                <div class="info">
                  <p class="card-text font-weight-semibold mb-0">Total Tools</p>
                  <p class="lead text-center">{{ totalTools }}</p>
                </div>
              </b-card>
            </b-colxx>
            <b-colxx xxs="3">
              <b-card class="text-center icon-cards-row">
                <div class="icon">
                  <i class="iconsminds-box-full" />
                </div>
                <div class="info">
                  <p class="card-text font-weight-semibold mb-0">
                    Total Tool Boxes
                  </p>
                  <p class="lead text-center">{{ totalToolBoxes }}</p>
                </div>
              </b-card>
            </b-colxx>
            <b-colxx xxs="3">
              <b-card class="text-center icon-cards-row">
                <div class="icon">
                  <i class="simple-icon-note" />
                </div>
                <div class="info">
                  <p class="card-text font-weight-semibold mb-0">
                    Total Tool Types
                  </p>
                  <p class="lead text-center">{{ totalToolTypes }}</p>
                </div>
              </b-card>
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable */

import toolTypeService from "@/services/toolType.service";
import toolService from "@/services/tool.service";
import toolBoxService from "@/services/toolBox.service";
import employeeService from "@/services/employee.service";

export default {
  data() {
    return {
      totalToolTypes: 0,
      totalTools: 0,
      totalToolBoxes: 0,
      totalEmployees: 0
    };
  },
  methods: {
    loadToolTypes() {
      toolTypeService.read().then(response => {
        this.totalToolTypes = response.total_entries;
      });
    },
    loadTools() {
      toolService.read().then(response => {
        this.totalTools = response.total_entries;
      });
    },
    loadToolBoxes() {
      toolBoxService.read().then(response => {
        this.totalToolBoxes = response.total_entries;
      });
    },
    loadEmployees() {
      employeeService.read().then(response => {
        this.totalEmployees = response.total_entries;
      });
    }
  },
  mounted() {
    this.loadToolTypes();
    this.loadTools();
    this.loadToolBoxes();
    this.loadEmployees();
    this.$emit('tabLoaded', 'dashboard');
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  min-height: 400px;
}
.card-text {
  font-size: 15px;
  margin-top: 25px;
}
.icon-cards-row {
  border: 1px solid #d7d7d7;
  box-shadow: none;
  margin-top: 4px;
  margin-bottom: 4px;
  .card-body {
    padding: 0;
    .icon {
      padding: 2rem 0.5rem;
      background-color: #f8f8f8;
    }
    .info {
      padding: 0 0.5rem 2rem;
    }
  }
}
</style>
