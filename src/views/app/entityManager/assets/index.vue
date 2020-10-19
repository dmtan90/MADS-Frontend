<template>
  <div class="assets">
    <h2 class="page-heading">Assets of {{this.selectedProject.name}}</h2>
    <div>
      <ul class="nav nav-tabs">
        <li :class="{'active': selectedTab === 'assets'}" @click="selectedTab = 'assets'">Assets ({{totalRows}})</li>
        <li :class="{'active': selectedTab === 'assetTypes'}" @click="selectedTab = 'assetTypes'">Asset Types ({{assetTypeTotalRows}})</li>
      </ul>
    </div>
    <asset-list v-if="selectedTab === 'assets'" :assets="assets" @asset-pagination="assetPaginationChange" :totalRows="totalRows"></asset-list>
    <asset-type-list v-if="selectedTab === 'assetTypes'" :assetTypes="assetTypes" @asset-type-pagination="assetTypePaginationChange" :totalRows="assetTypeTotalRows"></asset-type-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import assetTypeService from '@/services/assetType.service'
import assetService from '@/services/asset.service'
import assetList from './assetList'
import assetTypeList from './assetTypeList'
import AssetEventBus from './assetEventBus'

export default {
  components: {
    assetList,
    assetTypeList
  },
  data () {
    return {
      selectedTab: 'assets',
      assets: [],
      assetTypes: [],
      currentPage: 1,
      perPage: 5,
      totalRows: null,
      assetTypeCurrentPage: 1,
      assetTypePerPage: 5,
      assetTypeTotalRows: null
    }
  },
  methods: {
    ...mapActions(['selectProject']),
    loadAssets () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      const params = {
        page_size: this.perPage,
        page_number: this.currentPage
      }
      assetService.read(config, params)
        .then((response) => {
          this.assets = response.assets
          this.totalRows = response.total_entries
        })
    },
    assetPaginationChange (paginationData) {
      this.currentPage = paginationData
    },
    assetTypePaginationChange (paginationData) {
      this.assetTypeCurrentPage = paginationData
    },
    loadAssetTypes () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      const params = {
        page_size: this.assetTypePerPage,
        page_number: this.assetTypeCurrentPage
      }
      assetTypeService.read(config, params)
        .then((response) => {
          this.assetTypes = response.asset_types
          this.assetTypeTotalRows = response.total_entries
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  },
  mounted () {
    this.loadAssets()
    this.loadAssetTypes()

    AssetEventBus.$on('reload-assets', () => {
      this.loadAssets()
    })

    AssetEventBus.$on('reload-asset-types', () => {
      this.loadAssetTypes()
    })
  },
  beforeDestroy () {
    this.selectProject(null)
    AssetEventBus.$off()
  }
}
</script>

<style lang="scss" scoped>
  .assets {
    .page-heading {
      color: #3e4956;
      margin-bottom: 20px;
    }
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
    width: 95%;
    margin: 0 auto;
    background-color: transparent;
    padding: 20px;
  }
</style>
