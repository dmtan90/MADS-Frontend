<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card title="Edit Site">
          <b-row>
            <b-colxx xxs="6">
              <b-form>
                <b-form-group label="Name">
                  <b-form-input type="text" v-model="site.name" />
                </b-form-group>
              </b-form>
              <b-row v-if="errors.length > 0">
                <b-colxx xxs="12">
                  <div
                    v-for="(error, index) in errors"
                    :key="index"
                    class="mt-2 error-message capitalize-first-letter"
                  >{{ error }}</div>
                </b-colxx>
              </b-row>
              <div class="mt-5">
                <router-link to="/app/site-layout/list-view">
                  <b-button size="lg" variant="outline-primary">Cancel</b-button>
                </router-link>
                <b-button size="lg" variant="primary" @click="updateSite">Submit</b-button>
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
      site: {},
      errors: []
    };
  },
  methods: {
    loadSite() {
      let id = this.$route.params.id;

      siteService.readId(id).then(response => {
        this.site = response;
      });
    },
    updateSite() {
      let payload = this.site;
      let id = this.$route.params.id;

      siteService.update(id, payload).then(response => {
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
  },
  mounted() {
    this.loadSite();
  }
};
</script>
