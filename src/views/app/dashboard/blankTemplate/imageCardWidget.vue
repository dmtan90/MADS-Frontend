<template>
  <div class="image-card-wrap">
    <div class="image-wrap">
      <span>Image cap</span>
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
      color: white;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    span {
      overflow: scroll;
      display: block;
    }
  }
</style>
