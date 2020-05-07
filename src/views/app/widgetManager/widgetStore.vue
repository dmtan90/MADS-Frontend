<template>
  <div class="widget-store">
    <store v-if="currentPage === 'index'"></store>
    <widget-detail v-if="currentPage === 'widgetDetail'"></widget-detail>
  </div>
</template>

<script>
import widgetDetail from './widgetStore/detail'
import { mapGetters } from 'vuex'
import store from './widgetStore/index'

export default {
  props: ['appVuexState'],
  components: {
    widgetDetail,
    store
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
