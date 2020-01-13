<template>
  <div>
    <input
      ref="autocomplete"
      type="text"
      v-model="autocompleteText"
      placeholder="Type a Location"
      class="form-control"
    />
  </div>
</template>

<script>
/* eslint-disable */

export default {
  props: ['searchText'],
  data() {
    return {
      autocompleteText: ''
    }
  },
  mounted() {
    this.autocompleteText = this.searchText;
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      { types: ["geocode"] }
    );

    this.autocomplete.addListener("place_changed", () => {
      let place = this.autocomplete.getPlace();
      this.$emit('placeChanged', place);
    });
  }
};
</script>

<style lang="scss" scoped>
  input {
    width: 100%;
  }
</style>
