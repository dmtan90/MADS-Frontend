<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Edit Notification" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <div class="row">
      <div class="col col-12">
        <div class="card">
          <div class="card-body col col-6">
            <form v-if="notification">
              <b-form-group label="Device">
                <b-form-input
                  type="text"
                  :value="notification.device.name"
                  :disabled="true"
                />
              </b-form-group>
              <b-form-group label="Sensor">
                <b-form-input
                  type="text"
                  :value="notification.sensor.name"
                  :disabled="true"
                />
              </b-form-group>
              <b-form-group label="Alarm Status">
                <switches
                  v-model="notification.alarm_status"
                  theme="custom"
                  color="primary"
                ></switches>
              </b-form-group>
              <div>
                <h3>Rule Configuration</h3>
                <rule-configuration
                  :ruleValues="ruleValues"
                  :policies="policies"
                  :isRuleValuesValid="isRuleValuesValid"
                ></rule-configuration>
              </div>
              <div class="mt-5">
                <router-link to="/app/notifications">
                  <b-button size="lg" variant="outline-primary"
                    >Cancel</b-button
                  >
                </router-link>
                <b-button
                  size="lg"
                  variant="primary"
                  @click="updateNotification"
                  >Submit</b-button
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import _ from "lodash";
import Switches from "vue-switches";
import vSelect from "vue-select";
import notificationService from "@/services/notification.service";
import policyService from "@/services/policy.service";
import ruleConfiguration from "./ruleConfiguration.vue";

export default {
  components: {
    Switches,
    vSelect,
    ruleConfiguration
  },
  data() {
    return {
      enabled: true,
      notification: null,
      policies: [],
      ruleValues: [],
      isRuleValuesValid: true
    };
  },
  methods: {
    fetchNotification() {
      let id = this.$route.params.id;
      let that = this;
      notificationService.readId(id).then(response => {
        this.notification = response;
        this.ruleValues = _.each(response.rule_values, function(rule) {
          return _.assign(rule, { module: that.policies[0].policy_name });
        });
      });
    },
    loadPolicies() {
      policyService.read().then(response => {
        this.policies = response.policies;
        this.fetchNotification();
      });
    },
    updateNotification() {
      let id = this.$route.params.id;
      let payload = {
        rule_values: this.ruleValues,
        sensor_id: this.notification.sensor_id,
        alarm_status: this.notification.alarm_status
      };

      this.isNotificationPayloadValid(payload);
      if (!this.isRuleValuesValid) {
        return;
      }

      notificationService.update(id, payload).then(response => {
        this.$router.push("/app/notifications");
      });
    },
    isNotificationPayloadValid(payload) {
      let valid = true;
      _.forEach(payload.rule_values, ruleVal => {
        if (
          !ruleVal.preferences["lower_limit"] ||
          !ruleVal.preferences["upper_limit"]
        ) {
          valid = false;
          return;
        }
      });
      this.isRuleValuesValid = valid;
    }
  },
  mounted() {
    this.loadPolicies();
  }
};
</script>
