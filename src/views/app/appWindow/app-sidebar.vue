<template v-slot:sidebar>
  <div class="app-sidebar">
    <div v-for="(item, index) in appVuexState.appSections" :key="index">
      <div class="item" @click="openSection(item.key)">
        <div class="item-content">
          <svg class="icon">
            <use :xlink:href="'/assets/img/' + appVuexState.appSectionsIconFile +  '#' + item.iconId"></use>
          </svg>
          <span>{{item.name}}</span>
        </div>
        <div :class="{'active-tab': appVuexState.currentSection === item.key}"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['appVuexState']
}
</script>

<style lang="scss" scoped>
  .app-sidebar {
    width: 100px;
    display: inline-block;
    height: calc(100% - 40px);
    border-right: 1px solid rgba(242, 242, 242, 1);
    position: absolute;
    top: 40px;
    overflow-y: scroll;
    overflow-x: hidden;
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
          width: 40px;
          height: 40px;
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
      .active-tab {
        position: absolute;
        width: 4px;
        height: 80px;
        top: 10px;
        left: 0;
        background-color: rgba(76, 146, 195, 1);
      }
    }
  }
</style>
