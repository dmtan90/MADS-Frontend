<template>
  <div class="functions-container">
    <div class="category" v-for="(category, index) in categoryList" :key="index">
      <div class="category-name" @click="toggleCategory(category)">
        <svg class="icon">
          <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
        </svg>
        <span>{{category.name}}</span>
      </div>
      <div v-if="category.expanded">
        <div class="category-list" v-for="(catFN, fnIndex) in category.list" :key="fnIndex">
          <span class="fn-name" draggable="true" @dragstart="dragStart(catFN, $event)">
            <b-form-checkbox v-if="selectable"></b-form-checkbox>
            {{catFN.name}}
            </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectable: {
      default: false
    }
  },
  data () {
    return {
      categoryList: []
    }
  },
  methods: {
    getAllFunctions () {
      this.categoryList = [
        {
          name: 'Timeseries Univariate Functions',
          key: 'tsu',
          expanded: true,
          list: [
            {
              name: 'TSU Max',
              key: 'tsu_max'
            },
            {
              name: 'TSU Max_Timestamp',
              key: 'tsu_max'
            },
            {
              name: 'TSU Min',
              key: 'tsu_max'
            },
            {
              name: 'TSU Min_Timestamp',
              key: 'tsu_max'
            },
            {
              name: 'TSU Mean',
              key: 'tsu_max'
            },
            {
              name: 'TSU 5 Point Summary',
              key: 'tsu_max'
            },
            {
              name: 'TSU Interpolate',
              key: 'tsu_max'
            },
            {
              name: 'TSU Sample',
              key: 'tsu_max'
            },
            {
              name: 'TSU Offset',
              key: 'tsu_max'
            },
            {
              name: 'TSU Filter by Time',
              key: 'tsu_max'
            },
            {
              name: 'TSU Filter by Count',
              key: 'tsu_max'
            },
            {
              name: 'TSU Filter by Range',
              key: 'tsu_max'
            },
            {
              name: 'TSU TS Sort',
              key: 'tsu_ts_sort'
            }
          ]
        },
        {
          name: 'Timeseries Multivariate Functions',
          key: 'tsu',
          list: [
            {
              name: 'TSU TS Inner Join',
              key: 'tsu_max'
            },
            {
              name: 'TSU TS Left Join',
              key: 'tsu_max'
            },
            {
              name: 'TSU TS Right Join',
              key: 'tsu_max'
            },
            {
              name: 'TSU TS Outer Join',
              key: 'tsu_max'
            },
            {
              name: 'TSU TS Append',
              key: 'tsu_max'
            },
            {
              name: 'TSU TS Add',
              key: 'tsu_max'
            },
            {
              name: 'TSU TS Multiply',
              key: 'tsu_max'
            },
            {
              name: 'TSB Corelation',
              key: 'tsu_max'
            },
            {
              name: 'TSB Covariance',
              key: 'tsu_max'
            }
          ]
        },
        {
          name: 'Vector Univariate Functions',
          key: 'tsu',
          list: [
            {
              name: 'VU Max',
              key: 'tsu_max'
            },
            {
              name: 'VU Min',
              key: 'tsu_max'
            },
            {
              name: 'VU Mean',
              key: 'tsu_max'
            },
            {
              name: 'VU 5 Point Summary',
              key: 'tsu_max'
            },
            {
              name: 'VU Variance',
              key: 'tsu_max'
            },
            {
              name: 'VU Standard Deviation',
              key: 'tsu_max'
            },
            {
              name: 'VU Norm',
              key: 'tsu_max'
            },
            {
              name: 'VU Scale',
              key: 'tsu_max'
            }
          ]
        },
        {
          name: 'Vector Multivariate Functions',
          key: 'tsu',
          list: [
            {
              name: 'VM Dot Product',
              key: 'tsu_max'
            },
            {
              name: 'VM Cross Product',
              key: 'tsu_max'
            },
            {
              name: 'VM Add',
              key: 'tsu_ts_sort'
            },
            {
              name: 'VM Multiply',
              key: 'tsu_ts_sort'
            },
            {
              name: 'VM Subtract',
              key: 'tsu_ts_sort'
            }
          ]
        },
        {
          name: 'Scalar Univariate Functions',
          key: 'tsu',
          list: [
            {
              name: 'SU Sine',
              key: 'tsu_max'
            },
            {
              name: 'SU Cosine',
              key: 'tsu_max'
            },
            {
              name: 'SU Square',
              key: 'tsu_max'
            },
            {
              name: 'SU Log_e',
              key: 'tsu_max'
            },
            {
              name: 'SU Log_10',
              key: 'tsu_max'
            },
            {
              name: 'SU Exponential',
              key: 'tsu_max'
            }
          ]
        },
        {
          name: 'Scalar Multivariate Functions',
          key: 'tsu',
          list: [
            {
              name: 'SM Add',
              key: 'tsu_max'
            },
            {
              name: 'SM Multiply',
              key: 'tsu_max'
            },
            {
              name: 'SM Subtract',
              key: 'tsu_max'
            },
            {
              name: 'SM Divide',
              key: 'tsu_max'
            }
          ]
        },
        {
          name: 'Matrix Univariate Functions',
          key: 'tsu',
          list: [
            {
              name: 'MU Determinant',
              key: 'tsu_max'
            },
            {
              name: 'MU Inverse',
              key: 'tsu_max'
            },
            {
              name: 'MU Rank',
              key: 'tsu_max'
            },
            {
              name: 'MU Columns Picker',
              key: 'tsu_max'
            }
          ]
        },
        {
          name: 'Generic Functions',
          key: 'tsu',
          list: [
            {
              name: 'GNS VU SU Multiply',
              key: 'tsu_max'
            },
            {
              name: 'GNS MU SU Multiply',
              key: 'tsu_max'
            }
          ]
        }
      ]
    },
    toggleCategory (category) {
      this.$set(category, 'expanded', !category.expanded)
    },
    dragStart (catFn, event) {
      this.$emit('set-dragged-entity-text', { entity: catFn, settings: { 'background-color': '#dbedff' } })
    }
  },
  mounted () {
    this.getAllFunctions()
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
        .fn-name {
          background-color: #dbedff;
          padding: 7px 10px 7px 7px;
          border-radius: 2px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
        }
      }
    }
  }
</style>
