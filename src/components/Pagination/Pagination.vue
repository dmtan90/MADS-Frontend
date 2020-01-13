<template>
  <div v-if="total_pages <= 1">
    {{ null }}
  </div>
  <div v-else>
    <nav aria-label="..." class="paging">
      <ul class="pagination">
        <div v-if="page_number <= 1">
          {{ null }}
        </div>
        <div v-else>
          <li v-on:click="onPageNumClick(page_number - 1)" class="page-item">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
        </div>
        <div v-for="page in total_pages" v-bind:key="page">
          <li
            class="page-item"
            :class="[page === page_number ? 'active-pg' : null]"
            v-on:click="onPageNumClick(page)"
          >
            <a class="page-link" href="#">{{ page }}</a>
          </li>
        </div>
        <div v-if="page_number >= total_pages">
          {{ null }}
        </div>
        <div v-else>
          <li v-on:click="onPageNumClick(page_number + 1)" class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['total_pages', 'page_number', 'page_size'],
  methods: {
    onPageNumClick: function (num) {
      this.$emit('page-num-click', num)
    }
  }
}
</script>

<style>
.paging {
  display: flex;
  justify-content: center;
  align-items: center;
}

.active-pg {
  background: #4cb6bb;
  color: #fff;
  font-weight: bold;
  border-radius: 50%;
}

.active-pg a {
  color: #fff;
}

.active-pg:hover,
.active-pg a:hover {
  border: none !important;
  color: #fff !important;
}
</style>
