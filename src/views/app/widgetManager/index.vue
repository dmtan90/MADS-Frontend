<template>
  <app-window :appName="'widgetManager'">
    <template v-slot:content>
      <widget-manager></widget-manager>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import widgetManager from './widgetManager'

export default {
  components: {
    appWindow,
    widgetManager
  }
}
</script>
