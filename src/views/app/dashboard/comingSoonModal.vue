<template>
  <b-modal id="new-dashboard-modal" ref="comingSoonModal" size="md" hide-footer>
    <div class="coming-soon-wrap">
      <span>This feature is in progress, please check back later. Thanks!</span>
    </div>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    closeModal () {
      this.$refs['comingSoonModal'].hide()
    }
  }
}
</script>

<style lang="scss" scoped>
  .coming-soon-wrap {
    padding: 40px 20px;
    font-size: 15px;
  }
</style>
