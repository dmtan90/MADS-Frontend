<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card title="Edit Tool">
          <b-row>
            <b-colxx xxs="6">
              <b-form>
                <b-form-group label="Name">
                  <b-form-input type="text" v-model="tool.name" />
                </b-form-group>
                <b-form-group label="Description">
                  <b-form-textarea
                    rows="4"
                    v-model="tool.description"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group label="Status">
                  <v-select v-model="tool.status" :options="statuses" />
                </b-form-group>
                <b-form-group label="Tool type">
                  <v-select
                    v-model="tool.tool_type_id"
                    label="identifier"
                    index="tool_type_id"
                    :options="toolTypes"
                  />
                </b-form-group>
                <b-form-group label="Tool box">
                  <v-select
                    v-model="tool.tool_box_id"
                    label="name"
                    index="tool_box_id"
                    :options="toolBoxes"
                  />
                </b-form-group>
              </b-form>
              <b-row v-if="errors.length > 0">
                <b-colxx xxs="12">
                  <div
                    v-for="(error, index) in errors"
                    :key="index"
                    class="mt-2 error-message capitalize-first-letter"
                  >
                    {{ error }}
                  </div>
                </b-colxx>
              </b-row>
              <div class="mt-5">
                <router-link to="/app/tool-management/tools">
                  <b-button size="lg" variant="outline-primary"
                    >Cancel</b-button
                  >
                </router-link>
                <b-button size="lg" variant="primary" @click="createTool"
                  >Submit</b-button
                >
              </div>
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable */

import _ from "lodash";
import vSelect from "vue-select";
import toolService from "@/services/tool.service";
import toolTypeService from "@/services/toolType.service";
import toolBoxService from "@/services/toolBox.service";

export default {
  components: {
    vSelect
  },
  data() {
    return {
      tool: {},
      toolTypes: [],
      toolBoxes: [],
      statuses: ["issued", "in_inventory"],
      errors: []
    };
  },
  methods: {
    loadTool() {
      let id = this.$route.params.id;

      toolService.readId(id).then(response => {
        this.tool = response;
      });
    },
    loadToolBoxes() {
      toolBoxService.read().then(response => {
        this.toolBoxes = response.tool_box;
      });
    },
    loadToolTypes() {
      toolTypeService.read().then(response => {
        this.toolTypes = response.tool_type;
      });
    },
    createTool() {
      let id = this.$route.params.id;
      let payload = this.tool;

      toolService.update(id, payload).then(response => {
        this.errors = [];
        if (response.errors) {
          let errors = response.errors.message.error || response.errors.message;
          _.each(errors, (errors, key) => {
            this.errors = _.concat(
              this.errors,
              _.lowerCase(key) + " " + errors
            );
          });
        } else {
          this.$router.push("/app/tool-management/tools");
        }
      });
    }
  },
  mounted() {
    this.loadTool();
    this.loadToolBoxes();
    this.loadToolTypes();
  }
};
</script>
