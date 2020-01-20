<template>
  <div draggable="true" @dragstart="drag" id="bar"></div>
</template>

<script>
import c3 from 'c3'

export default {
  name: 'Bar',
  mounted () {
    c3.generate({
      size: {
        height: 240,
        width: 300
      },
      bindto: '#bar',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 80, 50, 200, 300, 400]
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5
        }
      }
    })
  }
}
</script>

<style scoped></style>
