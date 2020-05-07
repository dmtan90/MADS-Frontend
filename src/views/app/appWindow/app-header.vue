<template v-slot:header>
  <div class="app-header">
    <svg class="icon">
      <use :xlink:href="'/assets/img/mads-app-icons.svg#' + appVuexState.appIcon"></use>
    </svg>
    <span>{{appVuexState.appName}}</span>
    <div class="right-section">
      <div class="window-icons">
        <svg class="icon hide-icon" @click="hideApp(appVuexState.appKey)">
          <use xlink:href="/assets/img/mads-app-window-icons.svg#hide"></use>
        </svg>
      </div>
      <div class="window-icons">
        <svg class="icon collapse-icon">
          <use xlink:href="/assets/img/mads-app-window-icons.svg#collapse"></use>
        </svg>
      </div>
      <div class="window-icons" @click="closeApp(appVuexState.appKey)">
        <svg class="icon close-icon">
          <use xlink:href="/assets/img/mads-app-window-icons.svg#close"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['appVuexState'],
  methods: {
    ...mapActions(['closeApp', 'hideApp'])
  }
}
</script>

<style lang="scss" scoped>
  .app-header {
    display: flex;
    height: 45px;
    width: 100%;
    color: #f8f8f8;
    background-color: rgba(76, 146, 195, 1);
    align-items: center;
    padding-left: 20px;
    padding-right: 10px;
    position: absolute;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.14902);
    z-index: 999;
    .icon {
      width: 27px;
      height: 27px;
    }
    span {
      padding-left: 24px;
      font-size: 18px;
      font-weight: 700;
    }
    .right-section {
      display: flex;
      margin-left: auto;
      .window-icons {
        padding: 0 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        .icon {
          fill: white;
          &.hide-icon {
            width: 17px;
          }
          &.collapse-icon {
            width: 16px;
          }
          &.close-icon {
            width: 15px;
          }
        }
      }
    }
  }
</style>
