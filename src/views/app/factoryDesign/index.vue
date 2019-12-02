<template>
<div>
  <!-- <b-row>
    <b-colxx xxs="12">
      <piaf-breadcrumb :heading="$t('menu.factory-layout')"/>
      <div class="separator mb-5"></div>
    </b-colxx>
  </b-row> -->
  <b-row>
    <b-colxx xxs="12">
        <b-card class="pchild-0">
            <b-row class="px-3">
                <b-colxx sm="1" class="p-0">
                    <div role="tablist">
                        <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-button block href="#" v-b-toggle.left-accordion-1 variant="info">Shapes</b-button>
                        </b-card-header>
                        <b-collapse id="left-accordion-1" visible accordion="left-accordion" role="tabpanel">
                            <b-card-body>
                                <ul class="shape-list">
                                    <li @click="rect++"><img src="/assets/img/icons/rectangle.svg"></li>
                                    <li @click="sq++"><img src="/assets/img/icons/square.svg"></li>
                                    <li @click="circle++"><img src="/assets/img/icons/circle.svg"></li>
                                    <li><img src="/assets/img/icons/triangle.svg"></li>
                                    <li><img src="/assets/img/icons/polygon.svg"></li>
                                    <li><img src="/assets/img/icons/hexagon.svg"></li>
                                    <li><img src="/assets/img/icons/rhomb.svg"></li>
                                    <li><img src="/assets/img/icons/arrow.svg"></li>
                                </ul>
                            </b-card-body>
                        </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-button block href="#" v-b-toggle.left-accordion-2 variant="info">3D Shapes</b-button>
                        </b-card-header>
                        <b-collapse id="left-accordion-2" accordion="left-accordion" role="tabpanel">
                            <b-card-body>
                                <ul class="shape-list">
                                    <li><img src="/assets/img/icons/rectangle.svg"></li>
                                    <li><img src="/assets/img/icons/square.svg"></li>
                                    <li><img src="/assets/img/icons/circle.svg"></li>
                                    <li><img src="/assets/img/icons/triangle.svg"></li>
                                    <li><img src="/assets/img/icons/polygon.svg"></li>
                                    <li><img src="/assets/img/icons/hexagon.svg"></li>
                                    <li><img src="/assets/img/icons/rhomb.svg"></li>
                                    <li><img src="/assets/img/icons/arrow.svg"></li>
                                </ul>
                            </b-card-body>
                        </b-collapse>
                        </b-card>
                    </div>
                </b-colxx>

                <b-colxx sm="8" class="p-0" ref="factoryLayout" id="factoryLayout">
                    <v-stage ref="stage" :config="stageSize">
                        <v-layer ref="layer">
                          <konva-circle v-for="c in circle" v-bind:key="c"/>
                          <konva-rect v-for="r in rect" v-bind:key="r"/>
                          <konva-sq v-for="s in sq" v-bind:key="s"/>
                        </v-layer>
                    </v-stage>
                </b-colxx>

                <b-colxx sm="3" class="p-0">
                    <div role="tablist">
                        <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-button block href="#" v-b-toggle.right-accordion-1 variant="info">Properties</b-button>
                        </b-card-header>
                        <b-collapse id="right-accordion-1" accordion="right-accordion" role="tabpanel">
                            <b-card-body>
                                <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
                                    <b-form-group id="input-group-1" label="Enter tooltip:" label-for="input-1">
                                        <b-form-input
                                        id="input-1"
                                        v-model="form.tooltip"
                                        type="text"
                                        placeholder="Enter name"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="input-group-2" label="Background Color:" label-for="input-2">
                                        <b-form-input
                                        id="input-2"
                                        v-model="form.bgcolor"
                                        type="color"
                                        placeholder="Background color"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="input-group-3" label="Stroke Color:" label-for="input-3">
                                        <b-form-input
                                        id="input-3"
                                        v-model="form.strokecolor"
                                        type="color"
                                        placeholder="Stroke color"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="input-group-3" label="Stroke Width:" label-for="input-3">
                                        <b-form-input
                                        id="input-3"
                                        v-model="form.strokewidth"
                                        type="range"
                                        placeholder="Stroke width"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="input-group-3" label="Connect:" label-for="input-3">
                                        <b-form-select
                                        id="input-3"
                                        v-model="form.shape"
                                        :options="[{ text: 'Select One', value: null }, ...shapes]"
                                        ></b-form-select>
                                    </b-form-group>

                                    <b-button type="submit" variant="primary">Submit</b-button>
                                    <b-button type="reset" variant="warning">Reset</b-button>
                                </b-form>
                            </b-card-body>
                        </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" role="tab">
                            <b-button block href="#" v-b-toggle.right-accordion-2 variant="info">Connections</b-button>
                        </b-card-header>
                        <b-collapse id="right-accordion-2" accordion="right-accordion" role="tabpanel">
                            <b-card-body>
                                <ul>
                                    <li v-for="(shape, index) in shapes" v-bind:key="index">{{ shape }}</li>
                                </ul>
                            </b-card-body>
                        </b-collapse>
                        </b-card>
                    </div>
                </b-colxx>
            </b-row>
        </b-card>
    </b-colxx>
  </b-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import konvaCircle from '@/components/Konva/Circle'
import konvaRect from '@/components/Konva/Rectangle'
import konvaSq from '@/components/Konva/Square'
const width = window.innerWidth
const height = window.innerHeight - 130 - 40

export default {
  components: {
    konvaCircle,
    konvaRect,
    konvaSq
  },
  data () {
    return {
      stageSize: {
        width: width,
        height: height
      },
      form: {
        tooltip: '',
        bgcolor: '',
        strokecolor: '',
        strokewidth: '',
        shape: null
      },
      shapes: ['Shape 1', 'Shape 2', 'Shape 3'],
      show: true,
      circle: 0,
      rect: 0,
      sq: 0
    }
  },
  computed: {
    ...mapGetters({
      menuClickCount: 'getMenuClickCount'
    })
  },
  methods: {
    ...mapMutations(['changeSideMenuStatus']),
    onSubmit () {},
    onReset () {}
  },
  created () {
    this.changeSideMenuStatus({ step: this.menuClickCount + 1, classNames: 'menu-hidden' })
  },
  mounted () {
    let stage = this.$refs.stage
    let layer = this.$refs.layer
  },
  beforeDestroy () {
    this.changeSideMenuStatus({ step: this.menuClickCount + 1, classNames: 'menu-default menu-sub-hidden' })
  }
}
</script>

<style scoped>
.pchild-0 > .card-body {
  padding: 0;
}
#factoryLayout {
  border: 1px solid #000;
  overflow: scroll;
  background: url('/assets/img/canvas-grid.png') repeat;
}
.card-header {
  padding: 0;
}
.card-header .btn {
  border-radius: 0;
}
.card-body {
  padding: 0.5rem;
}
.shape-list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: inline-flex;
  flex-wrap: wrap;
}
.shape-list li {
  padding: 0.25rem;
}
.shape-list li img {
  height: 25px;
}
</style>
