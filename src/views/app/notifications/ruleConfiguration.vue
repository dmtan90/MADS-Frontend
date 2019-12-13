<template>
  <div>
    <b-form>
      <div
        class="form-group"
        v-for="(rule, key, index) in ruleValues"
        :key="index"
      >
        <h4 class="mb-3">Key: {{ key }}</h4>
        <b-row>
          <b-colxx xxs="12" md="12">
            <b-form-group label="Select Policy">
              <v-select
                v-model="rule.module"
                label="rule_name"
                index="policy_name"
                :options="policies"
              />
            </b-form-group>
          </b-colxx>
        </b-row>
        <template v-if="rule.module">
          <b-form-group label="Lower Limit">
            <b-form-input
              :class="{
                'error-field':
                  !isRuleValuesValid && !rule.preferences.lower_limit
              }"
              type="number"
              v-model="rule.preferences.lower_limit"
            />
            <div
              class="mt-2 error-message"
              v-if="!isRuleValuesValid && !rule.preferences.lower_limit"
            >
              Field is required
            </div>
          </b-form-group>
          <b-form-group label="Upper Limit">
            <b-form-input
              :class="{
                'error-field':
                  !isRuleValuesValid && !rule.preferences.upper_limit
              }"
              type="number"
              v-model="rule.preferences.upper_limit"
            />
            <div
              class="mt-2 error-message"
              v-if="!isRuleValuesValid && !rule.preferences.upper_limit"
            >
              Field is required
            </div>
          </b-form-group>
        </template>
      </div>
    </b-form>
  </div>
</template>

<script>
/* eslint-disable */
import vSelect from "vue-select";

export default {
  components: {
    vSelect
  },
  props: ["ruleValues", "policies", "isRuleValuesValid"]
};
</script>
