<template>
    <v-rect :config="config"></v-rect>
</template>

<script>
export default {
  data () {
    return {
      config: {
        x: 100,
        y: 100,
        width: 140,
        height: 100,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      }
    }
  }
}
</script>
