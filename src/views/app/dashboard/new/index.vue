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
          <div class="theme-container">
            <div class="theme-image">
              <img src="https://picsum.photos/seed/picsum/200/300" alt="">
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
      <shea-template></shea-template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import sheaTemplate from './../sheaTemplate'

export default {
  components: {
    sheaTemplate
  },
  data () {
    return {
      selectedTheme: 'shea',
      dashboardThemes: [
        {
          name: 'smpl'
        },
        {
          name: 'db'
        },
        {
          name: '538'
        },
        {
          name: 'alone'
        },
        {
          name: 'bloom'
        },
        {
          name: 'economist'
        },
        {
          name: 'elementary'
        },
        {
          name: 'ffx'
        },
        {
          name: 'flat'
        },
        {
          name: 'flatdark'
        },
        {
          name: 'ft'
        },
        {
          name: 'ggplot2'
        },
        {
          name: 'google'
        },
        {
          name: 'monokai'
        },
        {
          name: 'null'
        },
        {
          name: 'superheroes'
        },
        {
          name: 'tufte'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['hideAppSidebar'])
  },
  mounted () {
    this.hideAppSidebar('Dashboards')
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
        img {
          width: 100%;
          height: 100%;
        }
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
