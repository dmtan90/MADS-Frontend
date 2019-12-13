<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="New Notification" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <div class="row">
      <div class="col col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Notifications</h4>
            <div class="row">
              <div class="col col-3">
                <ul class="nav nav-pills flex-column">
                  <li class="nav-item mb-3" @click="changeCurrentStep(1)">
                    <b-button
                      :variant="
                        visitedChooseDevice
                          ? 'primary default'
                          : 'outline-primary default'
                      "
                      :class="{ active: currentStep === 1 }"
                      size="lg"
                      >1. Choose Device</b-button
                    >
                  </li>
                  <li class="nav-item mb-3" @click="changeCurrentStep(2)">
                    <b-button
                      :variant="
                        visitedChooseSensor
                          ? 'primary default'
                          : 'outline-primary default'
                      "
                      :class="{ active: currentStep === 2 }"
                      size="lg"
                      :disabled="!visitedChooseSensor"
                      >2. Choose Sensor</b-button
                    >
                  </li>
                  <li class="nav-item mb-3" @click="changeCurrentStep(3)">
                    <b-button
                      :variant="
                        visitedConfigureRules
                          ? 'primary default'
                          : 'outline-primary default'
                      "
                      :class="{ active: currentStep === 3 }"
                      size="lg"
                      :disabled="!visitedConfigureRules"
                      >3. Configure Rules</b-button
                    >
                  </li>
                </ul>
              </div>
              <div v-if="currentStep === 1" class="col col-6 offset-1">
                <b-form>
                  <b-row>
                    <b-colxx xxs="12" md="12">
                      <b-form-group label="Select Device">
                        <v-select
                          v-model="selectedDevice"
                          label="name"
                          :options="devices"
                        />
                      </b-form-group>
                    </b-colxx>
                  </b-row>
                </b-form>
                <div class="mt-4">
                  <b-button
                    size="lg"
                    variant="primary"
                    @click="goToChooseSensors"
                    >Next</b-button
                  >
                </div>
              </div>

              <div v-if="currentStep === 2" class="col col-6 offset-1">
                <b-form>
                  <b-row>
                    <b-colxx xxs="12" md="12">
                      <b-form-group label="Select Sensor">
                        <v-select
                          v-model="selectedSensor"
                          label="name"
                          :options="sensors"
                        />
                      </b-form-group>
                    </b-colxx>
                  </b-row>
                </b-form>
                <div class="mt-4">
                  <b-button
                    size="lg"
                    variant="outline-primary"
                    @click="previousStep"
                    >Previous</b-button
                  >
                  <b-button
                    size="lg"
                    variant="primary"
                    @click="goToConfigureRules"
                    >Next</b-button
                  >
                </div>
              </div>

              <div
                v-if="currentStep === 3 && ruleValues"
                class="col col-6 offset-1"
              >
                <rule-configuration
                  :ruleValues="ruleValues"
                  :policies="policies"
                  :isRuleValuesValid="isRuleValuesValid"
                ></rule-configuration>
                <div class="mt-5">
                  <b-button
                    size="lg"
                    variant="outline-primary"
                    @click="previousStep"
                    >Previous</b-button
                  >
                  <b-button
                    size="lg"
                    variant="primary"
                    @click="createNotification"
                    >Submit</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import _ from "lodash";
import vSelect from "vue-select";
import deviceService from "@/services/device.service";
import sensorService from "@/services/sensor.service";
import policyService from "@/services/policy.service";
import notificationService from "@/services/notification.service";
import ruleConfiguration from "./ruleConfiguration.vue";

export default {
  components: {
    vSelect,
    ruleConfiguration
  },
  data() {
    return {
      devices: [],
      sensors: [],
      policies: [],
      selectedDevice: {},
      selectedSensor: {},
      currentStep: 1,
      visitedChooseDevice: true,
      visitedChooseSensor: false,
      visitedConfigureRules: false,
      ruleValues: [],
      isRuleValuesValid: true
    };
  },
  methods: {
    loadDevices() {
      deviceService.read().then(response => {
        this.devices = response.devices;
        this.selectedDevice = this.devices[0];
      });
    },
    loadeviceSensors() {
      let deviceId = this.selectedDevice.id;
      sensorService.getDeviceSensors(deviceId).then(response => {
        this.sensors = response.sensors;
        this.selectedSensor = this.sensors[0];
      });
    },
    loadPolicies() {
      policyService.read().then(response => {
        this.policies = response.policies;
      });
    },
    goToChooseSensors() {
      this.currentStep = 2;
      this.visitedChooseSensor = true;
      this.loadeviceSensors();
    },
    goToConfigureRules() {
      this.currentStep = 3;
      this.visitedConfigureRules = true;
      let keys = this.selectedSensor.sensor_type.value_keys;
      this.ruleValues = keys.reduce((result, key) => {
        return Object.assign(result, {
          [key]: {
            preferences: {
              lower_limit: null,
              upper_limit: null
            },
            module: this.policies[0] ? this.policies[0].policy_name : null
          }
        });
      }, {});
    },
    createNotification() {
      let payload = {
        rule_values: this.ruleValues,
        sensor_id: this.selectedSensor.id,
        alarm_status: true
      };

      this.isNotificationPayloadValid(payload);
      if (!this.isRuleValuesValid) {
        return;
      }

      notificationService.create(payload).then(response => {
        this.$router.push("/app/notifications");
      });
    },
    changeCurrentStep(step) {
      this.currentStep = step;
    },
    previousStep() {
      this.currentStep--;
    },
    nextStep() {
      this.currentStep++;
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
    this.loadDevices();
    this.loadPolicies();
  }
};
</script>

<style lang="scss" scoped>
li.nav-item {
  cursor: pointer;
  button {
    width: 100%;
    &:disabled {
      color: #4cb6bb;
      opacity: 1;
      background-color: white;
    }
  }
}
</style>
