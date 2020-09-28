<template>
  <b-form class="criteria-form">
        <b-form-group label="Name" label-for="name">
            <b-form-input v-model="entity.name" type="text" id="name"></b-form-input>
          <!-- <multiselect v-model="name" :options="assetTypes" @select="onSelectAssetType" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="name"></multiselect> -->
        </b-form-group>
        <b-form-group label="Description" label-for="desc">
          <b-form-input v-model="entity.desc" type="text" id="desc"></b-form-input>
        </b-form-group>
        <b-form-checkbox
            v-model="status"
            name="checkbox-1"
            value="hide"
            unchecked-value="unhide"
        >
        Hidden
        </b-form-checkbox>
        <b-form-group label="Entity Type" label-for="entity-type">
          <multiselect v-model="entity.entityType" :options="entityTypes"></multiselect>
        </b-form-group>
        <b-form-group label="Type" label-for="type">
          <b-form-input v-model="entity.type" type="text" id="type"></b-form-input>
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
    entity: {
      type: Object
    }
  },
  data () {
    return {
      name: '',
      desc: '',
      status: '',
      entityTypes: ['asset', 'device'],
      entityType: '',
      type: ''
    }
  },
  computed: {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
    .criteria-form{
        padding: 10px !important;
    }
</style>
