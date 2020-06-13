<template v-slot:sidebar>
  <div class="app-sidebar" v-if="!appVuexState.sidebarHidden">
    <div v-for="(section, index) in appVuexState.appSections" :key="index">
      <div class="section" @click="openSection(section)">
        <div class="section-content">
          <svg class="icon" :class="section.class ? section.class : ''">
            <use :xlink:href="'/assets/img/' + appVuexState.appSectionsIconFile +  '#' + section.iconId"></use>
          </svg>
          <span>{{section.name}}</span>
        </div>
        <div :class="{'active-tab': appVuexState.currentSection === section.key}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['appVuexState'],
  methods: {
    ...mapActions(['setCurrentSection', 'setCurrentPage']),
    openSection (section) {
      this.setCurrentSection({ appKey: this.appVuexState.appKey, section: section.key })
      this.setCurrentPage('index')
    }
  }
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
    overflow: auto;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.14902);
    .section {
      height: 100px;
      border-bottom: 1px solid rgba(242, 242, 242, 1);
      text-align: center;
      padding: 6px;
      position: relative;
      .section-content {
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
          &.sensor-icon {
            transform: rotate(180deg);
          }
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
