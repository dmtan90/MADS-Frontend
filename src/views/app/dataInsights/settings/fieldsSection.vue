<template>
  <div class="fields-container">
    <div class="fields-left-box">
      <div class="add-fields-box">
        <b-button class="add-fields-button" @click="addField()"
          >+ Add Field</b-button
        >
      </div>
      <template v-if="fields.length > 0">
        <div class="fields-box" v-for="(field, index) in fields" :key="index">
          <div
            class="field-box"
            @click="showFieldForm(field, index)"
            v-bind:class="{ active: index === selectedFieldIndex }"
          >
            <div class="field-name-text">
              {{ field.name }}
            </div>
            <div class="more-icon-dropdown">
              <b-button class="more-icon" @click="showDelete(index)"
                ><img src="../../../../assets/img/icons/more.svg"
              /></b-button>
              <div class="dropdown-box" v-if="isDelete && index === fieldId">
                <b-button @click="deleteItem(index)">Delete</b-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="fields-right-box">
      <template v-if="selectedField">
        <field-form :field="selectedField"></field-form>
      </template>
    </div>
  </div>
</template>

<script>
import fieldForm from './fieldForm'

export default {
  components: {
    fieldForm
  },
  props: {
    fields: {
      type: Array
    }
  },
  data () {
    return {
      isDelete: false,
      fieldId: null,
      selectedFieldIndex: null,
      selectedField: null
    }
  },
  computed: {},
  methods: {
    addField () {
      this.fields = this.$_.concat(this.fields, [
        {
          id: '',
          name: '',
          desc: '',
          ishidden: false,
          fieldType: '',
          queryType: '',
          scopeType: '',
          key: ''
        }
      ])
    },
    showDelete (id) {
      this.isDelete = true
      this.fieldId = id
    },
    deleteItem () {
      this.isDelete = false
    },
    showFieldForm (field, index) {
      this.selectedField = field
      this.selectedFieldIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.fields-container {
  width: 100%;
  display: flex;
  min-height: calc(100vh - 153px);
  .fields-left-box {
    width: 20%;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    .add-fields-box {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      .add-fields-button {
        border: 0 !important;
        font-weight: bold;
        font-size: 15px;
      }
    }
    .fields-box {
      display: flex;
      flex-direction: column;
      .field-box {
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 15px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        align-items: center;
        cursor: pointer;
        &.active {
          background-color: #2696f3;
          .field-name-text {
            font-size: 17px;
            color: #fff;
          }
          .more-icon-dropdown {
            .more-icon {
              background-color: transparent !important;
              img {
                width: 22px;
                filter: brightness(0) invert(1);
              }
            }
          }
        }
        .field-name-text {
          font-size: 17px;
          color: #1f1f1f;
        }
        .more-icon-dropdown {
          position: relative;
          .more-icon {
            border: 0 !important;
            padding: 0 !important;
            img {
              width: 22px;
            }
          }
          .dropdown-box {
            position: absolute;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.fields-right-box {
  width: 80%;
  .tabs {
    .card-header {
      padding: 0 !important;
      .card-header-pills {
        margin: 0 !important;
        li {
          width: 160px !important;
          height: 48px !important;
          .nav-link.active {
            background-color: transparent !important;
            border-bottom: 2px solid #2696f3 !important;
            color: rgba(0, 0, 0, 0.87) !important;
            font-size: 14px !important;
            border-radius: 0px !important;
            text-align: center !important;
          }
          .nav-link {
            background-color: transparent !important;
            border: 0px !important;
            color: rgba(0, 0, 0, 0.87) !important;
            font-size: 14px !important;
            border-radius: 0px !important;
            text-align: center !important;
          }
        }
      }
    }
  }
}
</style>
