<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <piaf-breadcrumb :heading="$t('Factory Layout')"/>
      <div class="separator mb-5"></div>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('Factory Layout')" >
            <b-row>
                <b-colxx sm="3">
                    <div role="tablist">
                        <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block href="#" v-b-toggle.accordion-1 variant="info">Shapes</b-button>
                        </b-card-header>
                        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                                <ul>
                                    <li>Circle</li>
                                    <li>Rectancle</li>
                                    <li>Square</li>
                                    <li>Triangle</li>
                                    <li>Star</li>
                                    <li>Line</li>
                                    <li>Arrow</li>
                                </ul>
                            </b-card-body>
                        </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block href="#" v-b-toggle.accordion-2 variant="info">Properties</b-button>
                        </b-card-header>
                        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                                    <b-form-group id="input-group-1" label="Enter name:" label-for="input-1">
                                        <b-form-input
                                        id="input-1"
                                        v-model="form.email"
                                        type="text"
                                        required
                                        placeholder="Enter name"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="input-group-2" label="Background Color:" label-for="input-2">
                                        <b-form-input
                                        id="input-2"
                                        v-model="form.name"
                                        type="color"
                                        required
                                        placeholder="Background color"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="input-group-3" label="Stroke Color:" label-for="input-3">
                                        <b-form-input
                                        id="input-3"
                                        v-model="form.name"
                                        type="color"
                                        required
                                        placeholder="Stroke color"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="input-group-3" label="Stroke Width:" label-for="input-3">
                                        <b-form-input
                                        id="input-3"
                                        v-model="form.name"
                                        type="range"
                                        required
                                        placeholder="Stroke width"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="input-group-3" label="Connect:" label-for="input-3">
                                        <b-form-select
                                        id="input-3"
                                        v-model="form.food"
                                        :options="foods"
                                        required
                                        ></b-form-select>
                                    </b-form-group>

                                    <b-button type="submit" variant="primary">Submit</b-button>
                                    <b-button type="reset" variant="warning">Reset</b-button>
                                </b-form>
                            </b-card-body>
                        </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block href="#" v-b-toggle.accordion-3 variant="info">Connections</b-button>
                        </b-card-header>
                        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                            <b-card-body>
                                <ul>
                                    <li>Shape 1</li>
                                    <li>Shape 2</li>
                                    <li>Shape 3</li>
                                </ul>
                            </b-card-body>
                        </b-collapse>
                        </b-card>
                    </div>
                </b-colxx>
                <b-colxx sm="9" ref="factoryLayout" id="factoryLayout">
                    <v-stage :config="configKonva">
                        <v-layer>
                            <v-circle :config="configCircle"></v-circle>
                        </v-layer>
                    </v-stage>
                </b-colxx>
            </b-row>
        </b-card>
    </b-colxx>
  </b-row>
  </div>
</template>

<script>
const width = window.innerWidth
const height = window.innerHeight

export default {
  data () {
    return {
      configKonva: {
        width: width,
        height: height
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 30,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true
      },
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [{ text: 'Select One', value: null }, 'Shape 1', 'Shape 2', 'Shape 3'],
      show: true
    }
  }
}
</script>
