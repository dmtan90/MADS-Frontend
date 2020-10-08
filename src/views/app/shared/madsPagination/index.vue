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

<style lang="scss">
  .pagination{
    justify-content: flex-end;
    .page-item{
      &.active{
        .page-link{
          background: transparent;
          border: 1px solid #4cb6bb !important;
          color: #4cb6bb !important;
        }
      }
    }
  }
</style>
