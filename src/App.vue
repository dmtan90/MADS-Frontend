<template>
  <div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  body {
    height: 100%;
  }

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
  .c3-line {
    fill: none !important;
  }
  .vdr {
    border: none !important;
  }
  .break{
    flex-basis: 100%;
    height: 0;
  }
  .app-window {
    .sidebar {
      width: 100px;
      position: absolute;
      left: 0;
      top: 40px;
      height: calc(100% - 40px);
      border-right: 1px solid rgba(242, 242, 242, 1);
      .item {
        width: 100px;
        height: 100px;
        border-bottom: 1px solid rgba(242, 242, 242, 1);
        text-align: center;
        padding: 6px;
        position: relative;
        .item-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          .icon {
            width: 30px;
            height: 30px;
            display: block;
            margin: 0 auto;
            fill: #808080;
          }
          span {
            display: block;
            padding-top: 5px;
            line-height: 1.2;
            font-size: 12px;
          }
        }
        &.active > .active-tab {
            position: absolute;
            width: 4px;
            height: 80px;
            top: 10px;
            left: 0;
            background-color: rgba(76, 146, 195, 1);
        }
      }
    }
  }
</style>
