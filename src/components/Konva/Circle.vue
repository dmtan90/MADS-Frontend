<template>
    <v-circle :config="config"></v-circle>
</template>

<script>
export default {
  data () {
    return {
      config: {
        x: 100,
        y: 100,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      }
    }
  }
}
</script>
