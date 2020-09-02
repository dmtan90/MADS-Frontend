<template>
  <div class="functions-container">
    <div class="category" v-for="(component, index) in components" :key="index">
      <span class="fn-name" draggable="true" @dragstart="dragStart(component, $event)" :class="component.category">
        {{component.display_name}}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import componentService from '@/services/component.service'
import dummyFunctions from './dummyFunctions'

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
          this.components = this.$_.concat(response.components, dummyFunctions)
        })
    },
    toggleCategory (category) {
      this.$set(category, 'expanded', !category.expanded)
    },
    dragStart (catFn, event) {
      let backgroundColor = ''
      if (catFn.category === 'function') {
        backgroundColor = '#ffa07a'
      } else if (catFn.category === 'output') {
        backgroundColor = '#ff034b'
      } else {
        backgroundColor = catFn.backgroundColor
      }
      this.$emit('set-dragged-function', { entity: catFn, settings: { 'background-color': backgroundColor } })
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
    padding: 20px 10px 20px 20px;
    height: calc(100% - 40px);
    overflow: auto;
    .category {
      margin-bottom: 10px;
        .fn-name, .output-name {
          color: white;
          padding: 7px 10px 7px 7px;
          border-radius: 5px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 90px;
          height: 35px;
          font-size: 13px;
          color: #000000;
        }
        .output {
          background-color: #ff034b;
        }
        .function {
          background-color: #ffa07a;
        }
        .filter_function {
          background-color: #C5E0B4;
        }
        .loop_function {
          background-color: #BAD5ED;
        }
        .arima {
          background-color: #C9B0DB;
        }
        .send_function {
          background-color: #FF9E9E;
        }
        .condition_function {
          background-color: #FEECB2;
        }
        .do_nothing_function {
          background-color: #A5A5A5;
        }
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
      }
    }
  }
</style>
