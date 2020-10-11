<template>
  <div style="background-color: #e2e2e2">
    <model-collada :backgroundAlpha="0" :rotation="rotation" src="static/models/collada/elf/elf.dae"></model-collada>
    <!-- <model-gltf src="static/models/gltf/Duck/glTF/Duck.gltf"></model-gltf> -->
    <!-- <model-ply src="static/models/ply/binary/Lucy100k.ply"></model-ply> -->
    <!-- <model-obj
        :backgroundAlpha="0"
        src="static/models/obj/male02/male02.obj"
        mtl="static/models/obj/male02/male02.mtl"
      ></model-obj> -->
  </div>
</template>

<script>
import { ModelCollada, ModelGltf, ModelPly, ModelObj } from 'vue-3d-model'

export default {
  data () {
    return {
      rotation: {
        x: -Math.PI / 2,
        y: 0,
        z: 0
      }
    }
  },
  components: {
    ModelCollada,
    ModelGltf,
    ModelPly,
    ModelObj
  }
}
</script>

<style lang="scss" scoped>

</style>
