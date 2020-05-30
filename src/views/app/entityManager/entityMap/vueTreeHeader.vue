<template>
  <div class="vue-tree-header">
    <span>Entity Map | {{projectName}}</span>
    <ul class="view-type">
      <li @click="changeView('map')">Map View</li>
      <li @click="changeView('outline')">Outline View</li>
    </ul>
    <b-button @click="save()" class="save-btn">
      <svg class="icon">
        <use xlink:href="/assets/img/mads-common-icons.svg#save"></use>
      </svg>
      <span>Save</span>
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    projectName: {
      type: String,
      required: true
    },
    selectedView: {
      type: String,
      required: true
    }
  },
  methods: {
    changeView (view) {
      this.$emit('change-view', view)
    },
    save () {
      this.$emit('save-tree-data')
    }
  }
}
</script>

<style lang="scss" scoped>
  .vue-tree-header {
    height: 45px;
    border-bottom: 1px solid #c8cbce;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
      background-color: #FFA07A !important;
      .icon {
        width: 21px;
        height: 21px;
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
