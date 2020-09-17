<template>
  <b-form class="field-form">
        <b-form-group label="Name" label-for="name">
            <b-form-input v-model="name" type="text" id="name"></b-form-input>
        </b-form-group>
        <b-form-group label="Description" label-for="desc">
          <b-form-input v-model="desc" type="text" id="desc"></b-form-input>
        </b-form-group>
        <b-form-checkbox
            v-model="status"
            name="checkbox-1"
            value="hide"
            unchecked-value="unhide"
        >
        Hidden
        </b-form-checkbox>
        <b-form-group label="Field Type" label-for="field-type">
          <multiselect v-model="fieldType" :options="fieldTypes"></multiselect>
        </b-form-group>
        <b-form-group label="Query Type" label-for="query-type">
          <multiselect v-model="queryType" :options="queryTypes"></multiselect>
        </b-form-group>
        <b-form-group label="Scope Type" label-for="scope-type">
           <multiselect v-model="scopeType" :options="scopeTypes"></multiselect>
        </b-form-group>
        <b-form-group label="Key" label-for="key">
          <b-form-input v-model="key" type="text" id="key"></b-form-input>
        </b-form-group>
      </b-form>
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      name: '',
      desc: '',
      status: '',
      fieldTypes: ['STRING', 'NUMERIC', 'DATE', 'BOOLEAN', 'CALCULATED', 'STATE'],
      queryTypes: [' ENTITY_NAME ', ' ENTITY_LABEL ', ' OWNER ', ' ATTRIBUTE ', ' TELEMETRY '],
      fieldType: '',
      queryType: '',
      type: '',
      scopeType: '',
      scopeTypes: [' CLIENT_SCOPE ', ' SERVER_SCOPE ', ' SHARED_SCOPE ']
    }
  },
  computed: {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .field-form{
    padding: 10px;
  }
</style>
