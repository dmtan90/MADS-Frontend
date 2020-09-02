<template>
  <div class="sidebar">
    <ul>
      <li v-for="panel in getDashboardPanels()" :key="panel.id" :class="{'active': selectedPanel.id === panel.id}" @click="selectPanel(panel)">
        {{panel.name}}
      </li>
    </ul>
    <div class="action-btn-group">
      <b-button class="new-tab-btn sidebar-btn" @click="addNewTab()">
        <span>New Tab</span>
        <svg class="icon plus">
          <use xlink:href="/assets/img/mads-common-icons.svg#plus"></use>
        </svg>
      </b-button>
      <b-button class="back-btn sidebar-btn" @click="goBack()">
        <svg class="icon back">
          <use xlink:href="/assets/img/mads-common-icons.svg#back"></use>
        </svg>
        <span>Back</span>
      </b-button>
    </div>

    <new-tab-modal ref="newTabModal" @panel-created="selectPanel"></new-tab-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import newTabModal from './newTabModal'

export default {
  components: {
    newTabModal
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['setPanel']),
    goBack () {
      this.$emit('go-back')
    },
    addNewTab () {
      this.$refs.newTabModal.show()
    },
    selectPanel (panel) {
      this.setPanel(panel)
      this.$emit('select-panel', panel)
    },
    getDashboardPanels () {
      let panels = this.selectedDashboard ? this.selectedDashboard.panels || [] : []
      return panels
    }
  },
  computed: {
    ...mapGetters(['selectedDashboard', 'selectedPanel'])
  }
}
</script>

<style lang="scss" scoped>
  .sidebar {
    width: 180px;
    background-color: #1E3664;
    position: relative;
    padding-top: 40px;
    height: 100%;
    ul {
      list-style: none;
      padding: 0 1px 0 2px;
      margin-top: 20px;
      li {
        height: 40px;
        margin: 20px -1px;
        display: flex;
        align-items: center;
        padding-left: 40px;
        color: white;
        font-size: 16px;
        cursor: pointer;
        &.active {
          background-color: #f2f2f2;
          color: #000000;
          border-top-left-radius: 21px;
          border-bottom-left-radius: 21px;
        }
      }
    }
    .action-btn-group {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 10px;
      justify-content: space-around;
      width: 100%;
      flex-direction: column;
      .sidebar-btn {
        height: 40px;
        line-height: 1;
        border-radius: 20px !important;
        display: flex;
        align-items: center;
        font-size: 16px;
        margin: 0;
        padding: 0;
        justify-content: center;
        width: 75%;
        margin: 10px 0;
        .icon {
          width: 23px;
          height: 23px;
          &.back {
            margin-right: 5px;
          }
          &.plus {
            margin-left: 5px;
          }
        }
      }
    }
  }
</style>
