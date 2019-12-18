<template>
  <div class="h-100">
    <router-view/>
  </div>
</template>

<style lang="scss">
  // .vue-switcher--unchecked div:after {
  //   left: 15px !important;
  // }
  .vue-switcher div {
    height: 27px !important;
    width: 58px !important;
    &:after {
      height: 18px !important;
      width: 18px !important;
      left: 30px !important;
      top: 3px !important;
      margin-left: 3px !important;
    }
  }
  .vue-switcher.vue-switcher--unchecked div:after {
    left: 2px!important;
  }
  .vuetable thead tr th {
    font-size: 15px;
  }
  .vuetable tbody tr td {
    font-size: 15px;
  }
  .error-message {
    color: #dc3545;
  }
  .error-field {
    border-color: #dc3545;
  }
  .capitalize {
    text-transform: capitalize;
  }
  .capitalize-first-letter:first-letter {
    text-transform: capitalize;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>
