<template>
  <div class="widget-store">
    <my-widgets v-if="currentPage === 'index'"></my-widgets>
    <widget-detail v-if="currentPage === 'widgetDetail'"></widget-detail>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import widgetDetail from './myWidgets/detail'
import myWidgets from './myWidgets/index'

export default {
  props: ['appVuexState'],
  components: {
    widgetDetail,
    myWidgets
  },
  computed: {
    ...mapGetters(['currentPage'])
  }
}
</script>

<style lang="scss" scoped>
  .widget-store {
    height: 100%;
  }
</style>
