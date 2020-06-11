<template>
  <div class="new-section h-100">
    <div class="themes-section" v-if="!selectedTheme">
      <b-row>
        <b-colxx lg="3" md="3" sm="4" xs="12" xxs="12" class="theme-card">
          <div class="theme-container">
            <div class="theme-image"></div>
            <div class="theme-info">
              <h3>Blank</h3>
            </div>
          </div>
        </b-colxx>
        <b-colxx lg="3" md="3" sm="4" xs="12" xxs="12" class="theme-card" v-for="(theme, index) in dashboardThemes" :key="index">
          <div class="theme-container" @click="selectedTheme = theme.name; hideAppSidebar('Dashboards')">
            <div class="theme-image" :style="{background: getBackgroundUrl(theme.imageUrl)}">
              <!-- <img src="/assets/img/hevea.png" alt=""> -->
            </div>
            <div class="theme-info">
              <h3>
                {{theme.name}}
              </h3>
            </div>
          </div>
        </b-colxx>
      </b-row>
    </div>
    <div class="detail-section h-100" v-else>
      <shea-template v-if="selectedTheme === 'Shea'" @show-all="selectedTheme = null; showAppSidebar('Dashboards')"></shea-template>
      <hevea-template v-if="selectedTheme === 'Hevea'"  @show-all="selectedTheme = null; showAppSidebar('Dashboards')"></hevea-template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import sheaTemplate from './../sheaTemplate'
import heveaTemplate from './../heveaTemplate'

export default {
  components: {
    sheaTemplate,
    heveaTemplate
  },
  data () {
    return {
      selectedTheme: null,
      dashboardThemes: [
        {
          name: 'Shea',
          imageUrl: '/assets/img/shea.png'
        },
        {
          name: 'Hevea',
          imageUrl: '/assets/img/hevea.png'
        },
        {
          name: '538',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'alone',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'bloom',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'economist',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'elementary',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'ffx',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'flat',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'flatdark',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'ft',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'ggplot2',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'google',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'monokai',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'null',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'superheroes',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        },
        {
          name: 'tufte',
          imageUrl: 'https://picsum.photos/seed/picsum/200/300'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['hideAppSidebar', 'showAppSidebar']),
    getBackgroundUrl (url) {
      return 'url(' + url + ')'
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .themes-section {
    padding: 40px 0;
    max-width: 1200px;
    margin: 0 auto;
    .theme-container {
      background: #f9f9f9;
      box-shadow: 0 3px 4px #ddd;
      .theme-image {
        height: 180px;
        max-height: 180px;
        background-color: #fff;
        cursor: pointer;
        background-size: cover !important;
        background-position: center !important;
      }
      .theme-info {
        border-top: 1px solid #EDEDED;
        padding: 10px;
        text-align: center;
        h3 {
          text-transform: capitalize;
          margin: 0;
          color: #6B6FCE;
        }
      }
    }
    .theme-card {
      margin: 20px 0;
    }
  }
</style>
