<template>
  <PulseLoader />
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'Loader',
  components: {
    PulseLoader
  }
}
</script>

<style scoped>
.v-spinner {
  margin: 200px auto;
  width: 10%;
  text-align: center;
}
</style>
