<template>
  <app-window :appName="'roleManager'">
    <template v-slot:content>
      <role-manager></role-manager>
    </template>
  </app-window>
</template>

<script>
import appWindow from './../appWindow'
import roleManager from './roleManager'

export default {
  components: {
    appWindow,
    roleManager
  }
}
</script>
