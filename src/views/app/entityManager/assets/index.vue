<template>
  <div class="assets">
    <h2 class="page-heading">Assets</h2>
    <div>
      <ul class="nav nav-tabs">
        <li :class="{'active': selectedTab === 'assets'}" @click="selectedTab = 'assets'">Assets ({{assets.length}})</li>
        <li :class="{'active': selectedTab === 'assetTypes'}" @click="selectedTab = 'assetTypes'">Asset Types ({{assetTypes.length}})</li>
      </ul>
    </div>
    <asset-list v-if="selectedTab === 'assets'" :assets="assets"></asset-list>
    <asset-type-list v-if="selectedTab === 'assetTypes'" :assetTypes="assetTypes"></asset-type-list>
  </div>
</template>

<script>
import assetList from './assetList'
import assetTypeList from './assetTypeList'

export default {
  components: {
    assetList,
    assetTypeList
  },
  data () {
    return {
      selectedTab: 'assets',
      assets: [],
      assetTypes: []
    }
  },
  methods: {
    loadAsets () {
      this.assets = [
        {
          name: 'Asset 1',
          metadata: 'metadata1, metadata2, metadata3',
          parent: '',
          creator: 'creator name'
        },
        {
          name: 'Asset 2',
          metadata: 'metadata1, metadata2, metadata3',
          parent: '',
          creator: 'creator name'
        },
        {
          name: 'Asset 3',
          metadata: 'metadata1, metadata2, metadata3',
          parent: '',
          creator: 'creator name'
        },
        {
          name: 'Asset 4',
          metadata: 'metadata1, metadata2, metadata3',
          parent: '',
          creator: 'creator name'
        }
      ]
    },
    loadAssetTypes () {
      this.assetTypes = [
        {
          name: 'Asset Type 1',
          metadata: 'metadata1, metadata2, metadata3',
          parent: '',
          creator: 'creator name'
        },
        {
          name: 'Asset Type 2',
          metadata: 'metadata1, metadata2, metadata3',
          parent: '',
          creator: 'creator name'
        },
        {
          name: 'Asset Type 3',
          metadata: 'metadata1, metadata2, metadata3',
          parent: '',
          creator: 'creator name'
        },
        {
          name: 'Assset Type 4',
          metadata: 'metadata1, metadata2, metadata3',
          parent: '',
          creator: 'creator name'
        }

      ]
    }
  },
  mounted () {
    this.loadAsets()
    this.loadAssetTypes()
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
    width: 90%;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
  }
</style>
