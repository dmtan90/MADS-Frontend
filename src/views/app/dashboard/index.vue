<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.dashboard')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <div class="layout-container">
          <menubar></menubar>
          <div class="draw-container"></div>
        </div>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import Menubar from './Menubar'

export default {
  components: {
    Menubar
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .layout-container {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: auto auto;
  }

  .draw-container {
    display: flex;
    flex-wrap: wrap;
    min-height: 800px;
    background: #eee;
  }
</style>
