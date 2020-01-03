<template>
  <div> 
    <b-row>
      <b-colxx xxs="12">
        <b-card title="Add Site">
          <b-row>
            <b-colxx xxs="6">
              <b-form>
                <b-form-group label="name">
                  <b-form-input type="text" v-model="newSiteForm.name" />
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
                <router-link to="/app/site-layout/list-view">
                  <b-button size="lg" variant="outline-primary">Cancel</b-button>
                </router-link>
                <b-button size="lg" variant="primary" @click="createNewSite"
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

                <!-- <b-form-group label="Description">
                  <b-form-textarea
                    rows="4"
                    v-model="toolTypeForm.description"
                  ></b-form-textarea>
                </b-form-group> -->

<script>
/* eslint-disable */
import siteService from "@/services/site.service";
import _ from "lodash";
import vSelect from "vue-select";
import toolTypeService from "@/services/toolType.service";

export default {
  components: {
    vSelect
  },
  data() {
    return {
      newSiteForm: {
        name: ""      
      },
      errors: []
    };
  },
  methods: {
    createNewSite() {
      let payload = this.newSiteForm;

      siteService.create(payload).then(response => {
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
          this.$router.push("/app/site-layout/list-view");
        }
      });
    }
  }
};
</script>
