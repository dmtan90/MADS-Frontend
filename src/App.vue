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
  .vue-simple-context-menu {
    background-color: rgba(255, 255, 255, 1) !important;
    font-size: 14px;
    font-family: inherit !important;
    &__item {
      width: 180px;
      height: 40px;
      &:hover {
        background-color: rgba(242, 242, 242, 1) !important;
        color: #333 !important;
      }
    }
    li:first-of-type {
      margin-top: 0 !important;
    }
    li:last-of-type {
      margin-bottom: 0 !important;
    }
  }
  #set-wallpaper-modal {
    .modal-dialog {
      top: 50%;
      transform: translateY(-60%);
    }
    .modal-content {
      .modal-header {
        border-bottom: none;
        padding: 10px;
      }
      .modal-body {
        padding: 0;
        .left-panel {
          .categories {
            list-style: none;
            padding-left: 0;
            .item {
              height: 40px;
              cursor: pointer;
              padding-left: 20px;
              display: flex;
              align-items: center;
              border-top-right-radius: 20px;
              border-bottom-right-radius: 20px;
              font-size: 14px;
              &.active {
                background-color: #f2f2f2;
              }
            }
          }
        }
        .right-panel {
          .current-wallpaper {
            display: flex;
            border-bottom: 1px solid #f2f2f2;
            padding-bottom: 15px;
            .wallpaper-img {
              width: 6rem;
              height: 6rem;
              img {
                width: 100%;
                height: 100%;
                border-radius: 4px;
                object-fit: cover;
              }
            }
            .text-info {
              padding-left: 15px;
              .currently {
              }
              .category {
                margin-top: 4px;
                font-weight: bold;
                font-size: 14px;
              }
            }
          }
          .wallpaper-options {
            padding-top: 15px;
            margin-left: -4px;
            margin-right: 0;
            padding-right: 15px;
            height: 400px;
            overflow: scroll;
            .wallpaper-img {
              width: 30%;
              height: 175px;
              margin-bottom: 10px;
              padding-left: 4px;
              padding-right: 4px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 4px;
                cursor: pointer;
                object-fit: cover;
              }
            }
          }
        }
      }
    }
  }

  .tooltip {
    display: block !important;
    z-index: 10000;

    .tooltip-inner {
      background: #4c92c3;
      color: white;
      border-radius: 4px;
      padding: 5px 10px;
      border: none;
    }

    .tooltip-arrow {
      width: 0;
      height: 0;
      border-style: solid;
      position: absolute;
      margin: 5px;
      border-color: #4c92c3;
      z-index: 1;
    }

    &[x-placement^="top"] {
      margin-bottom: 5px;

      .tooltip-arrow {
        border-width: 5px 5px 0 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        bottom: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^="bottom"] {
      margin-top: 5px;

      .tooltip-arrow {
        border-width: 0 5px 5px 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^="right"] {
      margin-left: 5px;

      .tooltip-arrow {
        border-width: 5px 5px 5px 0;
        border-left-color: transparent !important;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        left: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
      }
    }

    &[x-placement^="left"] {
      margin-right: 5px;

      .tooltip-arrow {
        border-width: 5px 0 5px 5px;
        border-top-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        right: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
      }
    }

    &.popover {
      $color: #f9f9f9;

      .popover-inner {
        background: $color;
        color: black;
        padding: 24px;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(black, .1);
      }

      .popover-arrow {
        border-color: $color;
      }
    }

    &[aria-hidden='true'] {
      visibility: hidden;
      opacity: 0;
      transition: opacity .15s, visibility .15s;
    }

    &[aria-hidden='false'] {
      visibility: visible;
      opacity: 1;
      transition: opacity .15s;
    }
  }
</style>
