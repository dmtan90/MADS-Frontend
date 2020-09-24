<template>
  <div class="dynamic-card-wrap">
    <h2>{{getTitle().text}}</h2>
    <h2>15 {{getUnit().text}}</h2>
    <span>
      {{getDescription().text}}
    </span>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  props: {
    widget: {
      type: Object,
      required: true
    }
  },
  methods: {
    getTitle () {
      return this.widget.visual_properties.title
    },
    getDescription () {
      return this.widget.visual_properties.description
    },
    getUnit () {
      return this.widget.visual_properties.unit
    }
  }
}
</script>

<style lang="scss" scoped>
  .dynamic-card-wrap {
    height: calc(100% - 28px);
    padding: 0 10px 10px;
    span {
      overflow: scroll;
      display: block;
    }
  }
</style>
