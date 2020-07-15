<template>
  <div class="vue-tree-header">
    <span>Entity Map | {{selectedProject.name}}</span>
    <div class="view-select">
      <multiselect v-model="treeView" :options="[{name: 'Map View', key: 'map'}, {name: 'Outline View', key: 'outline'}]" @select="changeView" label="name" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
    </div>
    <b-button @click="save()" class="save-btn" style="background-color: #FFA07A !important">
      <svg class="icon">
        <use xlink:href="/assets/img/mads-common-icons.svg#save"></use>
      </svg>
      <span>Save</span>
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      treeView: { name: 'Map View', key: 'map' }
    }
  },
  props: {
    selectedView: {
      type: String,
      required: true
    }
  },
  methods: {
    changeView (view) {
      this.$emit('change-view', view.key)
    },
    save () {
      this.$emit('save-tree-data')
    }
  },
  computed: {
    ...mapGetters(['selectedProject'])
  }
}
</script>

<style lang="scss" scoped>
  .vue-tree-header {
    height: 60px;
    border-bottom: 1px solid #c8cbce;
    padding: 0 10px;
    display: flex;
    align-items: center;
    .view-select {
      width: 135px;
      margin-left: 20px;
    }
    .view-type {
      list-style: none;
      display: flex;
      margin: 0;
      li {
        padding: 0 5px;
        cursor: pointer;
      }
    }
    .save-btn {
      padding: 7px 10px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border: none;
      margin:  0 0 0 auto;
      .icon {
        width: 24px;
        height: 24px;
        fill: white;
      }
      span {
        padding-left: 10px;
        font-size: 15px;
        color: white;
      }
    }
  }
</style>

<style lang="scss">
  .view-select {
    .multiselect, .multiselect__input, .multiselect__single {
      font-size: 12px;
    }
  }
</style>
