<template>
  <div class="gateways">
    <template v-if="showListing">
      <h2 class="page-heading">Hello {{currentUser.first_name}}, you have {{totalEntry}} gateways</h2>
      <div class="view-header">
        <ul class="nav nav-tabs">
          <li class="active">Active ({{totalEntry}})</li>
          <!-- <li class="" v-if="!source">Archived (0)</li> -->
        </ul>
        <!-- <div class="gateway-view">
          <svg class="icon grid" :class="{'active': viewType === 'grid'}" @click="viewType = 'grid'">
            <use xlink:href="/assets/img/mads-common-icons.svg#grid"></use>
          </svg>
          <svg class="icon list" :class="{'active': viewType === 'list'}" @click="viewType = 'list'">
            <use xlink:href="/assets/img/mads-common-icons.svg#list"></use>
          </svg>
        </div> -->
      </div>
      <gateway-list @show-detail="onShowDetail" @gateway-entry="gatewayTotalEntry" v-if="viewType === 'list' && showListing"></gateway-list>
    </template>
    <template v-if="showDetail">
      <detail></detail>
    </template>
    <!-- <gateway-grid :gateways="gateways" v-if="viewType === 'grid'" :source="source"></gateway-grid> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import gatewayList from './list'
import detail from './detail'

export default {
  components: {
    gatewayList,
    detail
  },
  data () {
    return {
      // gateways: [],
      // viewType: this.source ? 'grid' : 'list',
      viewType: 'list',
      showListing: true,
      showDetail: false,
      totalEntry: null
    }
  },
  methods: {
    onShowDetail (detail) {
      this.showListing = false
      this.showDetail = true
    },
    gatewayTotalEntry (total) {
      this.totalEntry = total
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .gateways {
    .page-heading {
      color: #3e4956;
      margin-bottom: 20px;
    }
    .view-header {
      display: flex;
      align-items: flex-end;
      .nav {
        display: inline-flex;
        font-size: 13px;
        li {
          color: #79899d;
          min-width: 90px;
          height: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        li.active {
          color: #2aa7ff;
          box-shadow: inset 0 -2px 0 #2aa7ff;
        }
      }
      .gateway-view {
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        margin: 0 0 0 auto;
        height: 36px;
        display: flex;
        align-items: center;
        .icon {
          cursor: pointer;
          fill: #79899d;
          &.grid {
            width: 40px;
            height: 34px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            padding: 4px;
          }
          &.list {
            width: 40px;
            height: 34px;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            padding: 7px;
          }
          &.active {
            fill: #ffffff;
            background: #FFA07A;
          }
        }
      }
    }
    width: 95%;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
  }
</style>
