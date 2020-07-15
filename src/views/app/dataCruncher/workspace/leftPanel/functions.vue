<template>
  <div class="functions-container">
    <div class="category" v-for="(categoryComponents, category) in components" :key="category">
      <div class="category-name" @click="toggleCategory(category)">
        <svg class="icon">
          <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
        </svg>
        <span>{{$_.startCase(category)}}</span>
      </div>
      <div>
        <div class="category-list" v-for="(component, index) in categoryComponents" :key="index">
          <span class="fn-name" draggable="true" @dragstart="dragStart(component, $event)">
            <b-form-checkbox v-if="selectable"></b-form-checkbox>
            {{component.display_name}}
            </span>
        </div>
      </div>
    </div>
    <div class="category">
      <div class="category-name">
        <svg class="icon">
          <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
        </svg>
        <span>Ouput</span>
      </div>
      <div>
        <div class="category-list">
          <span class="output-name" draggable="true" @dragstart="dragOutput()">
              Print
            </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import componentService from '@/services/component.service'

export default {
  props: {
    selectable: {
      default: false
    }
  },
  data () {
    return {
      components: []
    }
  },
  methods: {
    getAllFunctions () {
      let config = { orgId: this.currentUser.org.id }
      componentService.read(config)
        .then((response) => {
          this.components = response.components
        })
    },
    toggleCategory (category) {
      this.$set(category, 'expanded', !category.expanded)
    },
    dragStart (catFn, event) {
      this.$emit('set-dragged-function', { entity: catFn, settings: { 'background-color': '#ffa07a' } })
    },
    dragOutput () {
      this.$emit('set-dragged-output', { entity: { 'module': 'Print', 'inports': ['output'], 'outports': ['print'], 'name': 'Print' }, settings: { 'background-color': '#C70039' } })
    }
  },
  mounted () {
    this.getAllFunctions()
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
  .functions-container {
    .category {
      margin-bottom: 10px;
      .category-name {
        background-color: #e2e2e2;
        padding: 7px;
        font-size: 15px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .icon {
          width: 13px;
          height: 13px;
          margin-right: 10px;
        }
      }
      .category-list {
        padding: 7px 7px 7px 20px;
        margin: 5px 0;
        .fn-name, .output-name {
          color: white;
          padding: 7px 10px 7px 7px;
          border-radius: 5px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 90px;
          height: 40px;
          font-size: 13px;
        }
        .fn-name {
          background-color: #ffa07a;
        }
        .output-name {
          background-color: #C70039;
        }
      }
    }
  }
</style>
