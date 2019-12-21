<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card title="Add ToolBox">
          <b-row>
            <b-colxx xxs="6">
              <b-form>
                <b-form-group label="Name">
                  <b-form-input type="text" v-model="toolBoxForm.name" />
                </b-form-group>
                <b-form-group label="Description">
                  <b-form-textarea
                    rows="4"
                    v-model="toolBoxForm.description"
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
                <router-link to="/app/tool-management/tool-boxes">
                  <b-button size="lg" variant="outline-primary">Cancel</b-button>
                </router-link>
                <b-button size="lg" variant="primary" @click="createToolbox"
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
import toolBoxService from "@/services/toolBox.service";

export default {
  components: {
    vSelect
  },
  data() {
    return {
      toolBoxForm: {
        name: "",
        description: ""
      },
      errors: []
    };
  },
  methods: {
    createToolbox() {
      let payload = this.toolBoxForm;

      toolBoxService.create(payload).then(response => {
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
          this.$router.push("/app/tool-management/tool-boxes");
        }
      });
    }
  }
};
</script>
