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
          <div class="theme-container" @click="selectedTheme = theme.key; hideAppSidebar('Dashboards')">
            <div class="theme-image" :style="{background: getBackgroundUrl(theme.imageUrl)}">
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
      <shea-template v-if="selectedTheme === 'shea'" @show-all="selectedTheme = null; showAppSidebar('Dashboards')"></shea-template>
      <hevea-template v-if="selectedTheme === 'hevea'"  @show-all="selectedTheme = null; showAppSidebar('Dashboards')"></hevea-template>
      <smart-agriculture-template v-if="selectedTheme === 'smart_agriculture'"  @show-all="selectedTheme = null; showAppSidebar('Dashboards')"></smart-agriculture-template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import sheaTemplate from './../sheaTemplate'
import heveaTemplate from './../heveaTemplate'
import smartAgricultureTemplate from './../smartAgricultureTemplate'

export default {
  components: {
    sheaTemplate,
    heveaTemplate,
    smartAgricultureTemplate
  },
  data () {
    return {
      selectedTheme: null,
      dashboardThemes: [
        {
          name: 'Shea',
          key: 'shea',
          imageUrl: '/assets/img/shea.png'
        },
        {
          name: 'Hevea',
          key: 'hevea',
          imageUrl: '/assets/img/hevea.png'
        },
        {
          name: 'Smart Agriculture',
          key: 'smart_agriculture',
          imageUrl: '/assets/img/smart_agriculture.png'
        },
        {
          name: 'alone',
          imageUrl: '/assets/img/seascapes_1.jpeg'
        },
        {
          name: 'bloom',
          imageUrl: '/assets/img/seascapes_2.jpeg'
        },
        {
          name: 'economist',
          imageUrl: '/assets/img/seascapes_3.jpeg'
        },
        {
          name: 'elementary',
          imageUrl: '/assets/img/seascapes_4.jpeg'
        },
        {
          name: 'ffx',
          imageUrl: '/assets/img/seascapes_5.jpeg'
        },
        {
          name: 'flat',
          imageUrl: '/assets/img/seascapes_6.jpeg'
        },
        {
          name: 'flatdark',
          imageUrl: '/assets/img/seascapes_7.jpeg'
        },
        {
          name: 'ft',
          imageUrl: '/assets/img/seascapes_1.jpeg'
        },
        {
          name: 'ggplot2',
          imageUrl: '/assets/img/seascapes_2.jpeg'
        },
        {
          name: 'google',
          imageUrl: '/assets/img/seascapes_3.jpeg'
        },
        {
          name: 'monokai',
          imageUrl: '/assets/img/seascapes_4.jpeg'
        },
        {
          name: 'null',
          imageUrl: '/assets/img/seascapes_5.jpeg'
        },
        {
          name: 'superheroes',
          imageUrl: '/assets/img/seascapes_6.jpeg'
        },
        {
          name: 'tufte',
          imageUrl: '/assets/img/seascapes_7.jpeg'
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
