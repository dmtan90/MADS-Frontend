<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card title="Add ToolType">
          <b-row>
            <b-colxx xxs="6">
              <b-form>
                <b-form-group label="Identifier">
                  <b-form-input type="text" v-model="toolTypeForm.identifier" />
                </b-form-group>
                <b-form-group label="Description">
                  <b-form-textarea
                    rows="4"
                    v-model="toolTypeForm.description"
                  ></b-form-textarea>
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
                <router-link to="/app/tool-management/tool-types">
                  <b-button size="lg" variant="outline-primary">Cancel</b-button>
                </router-link>
                <b-button size="lg" variant="primary" @click="createToolType"
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
import toolTypeService from "@/services/toolType.service";

export default {
  components: {
    vSelect
  },
  data() {
    return {
      toolTypeForm: {
        identifier: "",
        description: ""
      },
      errors: []
    };
  },
  methods: {
    createToolType() {
      let payload = this.toolTypeForm;

      toolTypeService.create(payload).then(response => {
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
          this.$router.push("/app/tool-management/tool-types");
        }
      });
    }
  }
};
</script>
