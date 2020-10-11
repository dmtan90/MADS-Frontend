<template>
  <div class="grid digital-twins">
      <h2 class="page-heading" v-if="!showDetail">Hello {{currentUser.first_name}}, you have 6 Digital Twins</h2>
      <div class="row" v-if="!showDetail">
        <div class="col-md-4 grid-item" @click="showDigitalTwin('elf')">
          <div class="item-wrap" :style="{background: getBackgroundUrl('elf')}">
          </div>
        </div>
        <div class="col-md-4 grid-item" @click="showDigitalTwin('dancing')">
          <div class="item-wrap" :style="{background: getBackgroundUrl('dancing')}">
          </div>
        </div>
        <div class="col-md-4 grid-item" @click="showDigitalTwin('male')">
          <div class="item-wrap" :style="{background: getBackgroundUrl('male')}">
          </div>
        </div>
        <div class="col-md-4 grid-item" @click="showDigitalTwin('generator')">
          <div class="item-wrap" :style="{background: getBackgroundUrl('generator')}">
          </div>
        </div>
        <div class="col-md-4 grid-item" @click="showDigitalTwin('street_cart')">
          <div class="item-wrap" :style="{background: getBackgroundUrl('street_cart')}">
          </div>
        </div>
        <div class="col-md-4 grid-item" @click="showDigitalTwin('handgun')">
          <div class="item-wrap" :style="{background: getBackgroundUrl('handgun')}">
          </div>
        </div>
      </div>
      <div class="digital-twin-detail" v-if="showDetail">
        <b-button @click="showDetail = false">Back</b-button>
        <div v-if="selectedDigitalTwin === 'elf'">
          <model-collada :backgroundAlpha="0" :rotation="rotation" src="static/models/collada/elf/elf.dae"></model-collada>
        </div>
        <div v-if="selectedDigitalTwin === 'dancing'">
          <model-fbx :backgroundAlpha="0" src="static/models/fbx/dancing.fbx"></model-fbx>
        </div>
        <div v-if="selectedDigitalTwin === 'male'">
          <model-obj
            :backgroundAlpha="0"
            src="static/models/obj/male02/male02.obj"
            mtl="static/models/obj/male02/male02.mtl"
          ></model-obj>
        </div>
        <div v-if="selectedDigitalTwin === 'generator'">
          <model-collada :backgroundAlpha="0" :rotation="rotation" src="static/models/1mw_generator.dae"></model-collada>
        </div>
        <div v-if="selectedDigitalTwin === 'street_cart'" style="background-color: #f2f2f2">
          <model-obj
            src="static/models/street_cart.obj"
            mtl="static/models/street_cart.mtl"
          ></model-obj>
        </div>
        <div v-if="selectedDigitalTwin === 'handgun'">
          <model-obj
            src="static/models/Handgun.obj"
          ></model-obj>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ModelCollada, ModelFbx, ModelObj } from 'vue-3d-model'

export default {
  data () {
    return {
      showDetail: false,
      selectedDigitalTwin: null,
      rotation: {
        x: -Math.PI / 2,
        y: 0,
        z: 0
      }
    }
  },
  components: {
    ModelCollada,
    ModelObj,
    ModelFbx
  },
  methods: {
    getBackgroundUrl (name) {
      return "url('/assets/img/" + name + ".png')"
    },
    showDigitalTwin (twin) {
      this.showDetail = true
      this.selectedDigitalTwin = twin
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
  .grid.digital-twins {
    padding: 20px;
    .row {
      margin: 0;
      margin-top: 20px;
    }
    .digital-twin-detail {
      position: relative;
      .btn {
        position: absolute;
        left: 0;
        top: 10px;
      }
    }
    .grid-item {
      display: flex;
      flex-direction: column;
      padding: 0;
      justify-content: space-between;
      flex: 0 0 30%;
      width: 30%;
      border-radius: 4px;
      margin-bottom: 30px;
      margin-right: 30px;
      .item-wrap {
        height: 258px;
        background-color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.14902);
        border-radius: 4px;
        position: relative;
        background-size: cover !important;
        background-position: top !important;
      }
    }
  }
</style>
