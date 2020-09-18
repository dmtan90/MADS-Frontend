<template>
  <b-form class="field-form">
        <b-form-group label="Name" label-for="name">
            <b-form-input v-model="field.name" type="text" id="name"></b-form-input>
        </b-form-group>
        <b-form-group label="Description" label-for="desc">
          <b-form-input v-model="field.desc" type="text" id="desc"></b-form-input>
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
          <multiselect v-model="field.fieldType" :options="fieldTypes"></multiselect>
        </b-form-group>
        <b-form-group label="Query Type" label-for="query-type">
          <multiselect v-model="field.queryType" :options="queryTypes"></multiselect>
        </b-form-group>
        <b-form-group label="Scope Type" label-for="scope-type">
           <multiselect v-model="field.scopeType" :options="scopeTypes"></multiselect>
        </b-form-group>
        <b-form-group label="Key" label-for="key">
          <b-form-input v-model="field.key" type="text" id="key"></b-form-input>
        </b-form-group>
        <div class="button-box">
            <b-button @click="cancel()">Cancel</b-button>
            <b-button @click="save()">Save</b-button>
        </div>
      </b-form>
</template>

<script>

export default {
  components: {

  },
  props: {
    field: {
      type: Object
    }
  },
  data () {
    return {
      status: '',
      fieldTypes: ['STRING', 'NUMERIC', 'DATE', 'BOOLEAN', 'CALCULATED', 'STATE'],
      queryTypes: [' ENTITY_NAME ', ' ENTITY_LABEL ', ' OWNER ', ' ATTRIBUTE ', ' TELEMETRY '],
      scopeTypes: [' CLIENT_SCOPE ', ' SERVER_SCOPE ', ' SHARED_SCOPE ']
    }
  },
  computed: {
  },
  methods: {
    cancel () {

    },
    save () {

    }
  }
}
</script>

<style lang="scss" scoped>
  .field-form{
    padding: 10px;
  }
</style>
