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
</style>
