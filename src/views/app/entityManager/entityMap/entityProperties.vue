<template>
  <div class="properties-container">
    <ul class="properties">
      <li class="property" v-for="key in propertyKeys" :key="key">
        <div class="header">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
          </svg>
          <div class="property-name">
            <span>{{key}}</span>
          </div>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
          </svg>
        </div>
        <div class="body">
          <span>{{entity[key]}}</span>
        </div>
      </li>
    </ul>
    <div class="footer">
      <b-button class="delete-btn" @click="onDelete()">Delete</b-button>
      <b-button class="save-btn">Save</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['entity'],
  data () {
    return {
      propertyKeys: ['name', 'entity', 'type', 'description', 'metadata', 'parameters']
    }
  },
  methods: {
    onDelete () {
      this.$emit('delete-entity')
    }
  }
}
</script>

<style lang="scss" scoped>
  .properties-container {
    position: relative;
    height: calc(100% - 45px);
    .properties {
      list-style: none;
      padding: 0;
      margin: 0;
      .property {
        border-bottom: 1px solid #c8cbce;
        padding: 15px;
        .header {
          display: flex;
          align-items: center;
          width: 100%;
          margin-bottom: 10px;
          .property-name {
            padding: 0 15px;
            font-size: 14px;
            text-transform: capitalize;
          }
          .icon {
            width: 15px;
            height: 15px;
            cursor: pointer;
            fill: #393F4D;
          }
        }
      }
    }
    .footer {
      padding: 10px;
      .delete-btn {
        background-color: #F32013 !important;
        color: #ffffff !important;
      }
      .save-btn {
        background-color: #4c92c3 !important;
        color: #ffffff !important;
      }
    }
  }
</style>
