<template>
  <div class="dynamic-card-wrap">
    <div class="image-wrap" :style="{background: getImageUrl()}">
    </div>
    <h2>{{getTitle().text}}</h2>
    <h2>15 {{getUnit().text}}</h2>
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
    },
    getUnit () {
      return this.widget.visual_properties.unit
    },
    getImageUrl () {
      let url = this.widget.visual_properties.icon.text
      return 'url(' + url + ')'
    }
  }
}
</script>

<style lang="scss" scoped>
  .dynamic-card-wrap {
    height: calc(100% - 28px);
    padding: 0 10px 10px;
    .image-wrap {
      background-color: #777777;
      height: 180px;
      margin-bottom: 20px;
      background-size: cover !important;
    }
    .description {
      display: block;
      height: 95px;
      overflow: auto;
    }
  }
</style>
