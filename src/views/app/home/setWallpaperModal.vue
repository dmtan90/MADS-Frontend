<template>
  <b-modal id="set-wallpaper-modal" ref="setWallpaperModal" size="lg" hide-footer>
    <b-row class="modal-container">
      <b-colxx xxs="3" class="left-panel">
        <ul class="categories">
          <li v-for="category in wallpaperCategories" :key="category.key" class="item" :class="{'active': category.key === selectedWallpaperCateogry.key}" @click="selectedWallpaperCateogry = category">
            {{category.name}}
          </li>
        </ul>
      </b-colxx>
      <b-colxx xxs="9" class="right-panel">
        <div class="current-wallpaper">
          <div class="wallpaper-img"><img :src="'/assets/img/' + selectedWallpaper" alt=""></div>
          <div class="text-info">
            <div class="currently">Currently set</div>
            <div class="category">{{selectedWallpaperCateogry.name}}</div>
          </div>
        </div>
        <b-row class="wallpaper-options">
          <b-colxx xxs="4" v-for="(wallpaper, index) in wallpapers[selectedWallpaperCateogry.key]" :key="index"
            class="wallpaper-img"
          >
            <img :src="'/assets/img/' + wallpaper" alt="" @click="changeWallpaper(wallpaper)">
            </b-colxx>
        </b-row>
      </b-colxx>
    </b-row>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EventBus from './event-bus'

export default {
  data () {
    return {
      wallpaperCategories: [
        { key: 'landscapes', name: 'Landscapes' }, { key: 'seascapes', name: 'Seascapes' }, { key: 'art', name: 'Art' },
        { key: 'cityscapes', name: 'Cityscapes' }, { key: 'life', name: 'Life' }, { key: 'textures', name: 'Textures' },
        { key: 'earth', name: 'Earth' }, { key: 'geometric_shapes', name: 'Geometric Shapes' }, { key: 'solid_colors', name: 'Solid Colors' }],
      wallpapers: {},
      selectedWallpaperCateogry: { key: 'landscapes', name: 'Landscapes' },
      selectedWallpaper: 'landspaces_4.jpeg'
    }
  },
  methods: {
    ...mapActions(['openApp', 'maximizeApp', 'setUserProfile', 'setUserSettings', 'setRecentVisitedApp', 'setDesktopWallpaper']),
    getAllWallpapers () {
      return {
        landscapes: ['landspaces_1.jpeg', 'landspaces_2.jpeg', 'landspaces_3.jpeg', 'landspaces_4.jpeg', 'landspaces_5.jpeg', 'landspaces_6.jpeg', 'landspaces_7.jpeg'],
        seascapes: ['seascapes_1.jpeg', 'seascapes_2.jpeg', 'seascapes_3.jpeg', 'seascapes_4.jpeg', 'seascapes_5.jpeg', 'seascapes_6.jpeg', 'seascapes_7.jpeg'],
        art: ['art_1.jpeg', 'art_2.jpeg', 'art_3.jpeg', 'art_4.jpeg', 'art_5.jpeg', 'art_6.jpeg', 'art_7.jpeg'],
        cityscapes: ['cityscapes_1.jpeg', 'cityscapes_2.jpeg', 'cityscapes_3.jpeg', 'cityscapes_4.jpeg', 'cityscapes_5.jpeg', 'cityscapes_6.jpeg', 'cityscapes_7.jpeg'],
        life: ['life_1.jpeg', 'life_2.jpeg', 'life_3.jpeg', 'life_4.jpeg', 'life_5.jpeg', 'life_6.jpeg', 'life_7.jpeg'],
        textures: ['textures_1.jpeg', 'textures_2.jpeg', 'textures_3.jpeg', 'textures_4.jpeg', 'textures_5.jpeg', 'textures_6.jpeg', 'textures_7.jpeg'],
        earth: ['earth_1.jpeg', 'earth_2.jpeg', 'earth_3.jpeg', 'earth_4.jpeg', 'earth_5.jpeg', 'earth_6.jpeg', 'earth_7.jpeg'],
        geometric_shapes: ['geometric_shapes_1.jpeg', 'geometric_shapes_2.jpeg', 'geometric_shapes_3.jpeg', 'geometric_shapes_4.jpeg', 'geometric_shapes_5.jpeg', 'geometric_shapes_6.jpeg', 'geometric_shapes_7.jpeg'],
        solid_colors: ['solid_colors_1.jpeg', 'solid_colors_2.jpeg', 'solid_colors_3.jpeg', 'solid_colors_4.jpeg', 'solid_colors_5.jpeg', 'solid_colors_6.jpeg', 'solid_colors_7.jpeg']
      }
    },
    changeWallpaper (wallpaper) {
      this.setDesktopWallpaper(wallpaper)
      EventBus.$emit('save-user-settings')
    }
  },
  mounted () {
    EventBus.$on('set-wallpaper', () => { this.$refs.setWallpaperModal.show() })
    this.wallpapers = this.getAllWallpapers()
  },
  computed: {
    ...mapGetters(['currentUser', 'openedApps', 'visualSettings', 'dataSettings', 'userSettingsId'])
  }
}
</script>

<style lang="scss" scoped>
  .modal-container {
    padding-top: 20px;
  }
</style>

<style lang="scss">
  #set-wallpaper-modal {
    button.close {
      background-color: transparent !important;
    }
  }
</style>
