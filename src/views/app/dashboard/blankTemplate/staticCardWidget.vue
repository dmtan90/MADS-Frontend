<template>
  <div class="static-card-wrap">
    <h2>{{getTitle().text}}</h2>
    <span class="description">
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .static-card-wrap {
    height: calc(100% - 28px);
    padding: 0 10px 10px;
    .description {
      display: block;
      height: 95px;
      overflow: auto;
    }
  }
</style>
