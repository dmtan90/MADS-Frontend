<template>
  <div class="image-card-wrap">
    <div class="image-wrap" :style="{background: getImageUrl()}">
    </div>
    <h2>{{getTitle().text}}</h2>
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
    getImageUrl () {
      let url = this.widget.visual_properties.icon.text
      return 'url(' + url + ')'
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-card-wrap {
    height: calc(100% - 28px);
    padding: 0 10px 10px;
    .image-wrap {
      background-color: #777777;
      height: 180px;
      margin-bottom: 20px;
      background-size: cover !important;
    }
    span {
      overflow: scroll;
      display: block;
    }
  }
</style>
