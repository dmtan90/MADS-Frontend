<template>
  <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      aria-controls="my-table"
      @change="onChange"
    ></b-pagination>
</template>

<script>
import { BPagination } from 'bootstrap-vue'

export default {
  components: {
    BPagination
  },
  data () {
    return {
    }
  },
  props: {
    perPage: Number,
    onChange: Function,
    currentPage: Number,
    totalRows: Number
  }
}
</script>

<style scoped>

</style>
