<template>
  <div class="h-100">
    <router-view/>
  </div>
</template>

<style lang="scss">
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
  .nav-tabs {
    font-size: 16px;
  }
  .w-20 {
    width: 20%;
  }
  .vuetable{
    thead tr th, tbody tr td {
      font-size: 15px;
    }
    .vuetable-body{
      .vuetable-slot {
        i {
          cursor: pointer;
          margin-right: 10px;
          font-size: 20px;
        }
      }
    }
  }
  .add-new{
    position: absolute;
    right: 1.75rem;
    top: 1.75rem;
  }
</style>
