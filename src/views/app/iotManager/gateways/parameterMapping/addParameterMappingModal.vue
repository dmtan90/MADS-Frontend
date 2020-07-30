<template>
  <b-modal id="modalID" ref="modalRef" size="md" hide-footer @hidden="onCancel()">
    <div class="parameter-modal-container">
      <div class="select-type">
        <span>Key:</span>
        <b-input v-model="mappingKey"></b-input>
        <multiselect v-model="selectedType" :options="mappingTypes" @select="onSelectMappingType" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
      </div>
      <div class="type-sections" v-if="selectedType">
        <div v-if="selectedType === 'Object'">
        </div>
        <div v-if="selectedType === 'List'">

        </div>
        <div v-if="selectedType === 'Value'">
          <multiselect v-model="selectedEntity" :options="entityTypes" @select="onSelectEntityType" :select-label="''" :selected-label="''" :deselect-label="''"></multiselect>
        </div>
      </div>
      <div class="entity-sections" v-if="selectedEntity">
        <div v-if="selectedEntity === 'Gateway'">
          <b-form-group>
            <b-form-radio-group
              id="radio-group-1"
              v-model="selectedParam"
              :options="streamingParams"
              name="radio-options"
              value-field="name"
              text-field="name"
            ></b-form-radio-group>
          </b-form-group>
        </div>
        <div v-if="selectedEntity === 'Sensor'">
        </div>
      </div>

      <div class="footer">
        <b-button @click="onCancel()">Cancel</b-button>
        <b-button @click="onSave()" class="save-btn">Save</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      selectedType: null,
      selectedEntity: null,
      selectedParam: '',
      mappingTypes: ['Object', 'List', 'Value'],
      entityTypes: ['Gateway', 'Sensor'],
      mappingKey: '',
      mappingValue: ''
    }
  },
  props: {
    streamingParams: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    onCancel () {
    },
    onSave () {
      this.$emit('on-save-mapping', { key: this.mappingKey, value: this.selectedParam, type: this.selectedType })
      this.$refs.modalRef.hide()

      this.selectedType = null
      this.selectedEntity = null
      this.selectedParam = ''
      this.mappingKey = ''
      this.mappingValue = ''
    },
    onSelectMappingType () {
    },
    onSelectEntityType () {
    }
  }
}
</script>

<style lang="scss" scoped>
  .parameter-modal-container {
    padding: 40px 20px;
    .footer {
      text-align: right;
      margin-top: 30px;
      .save-btn {
        background-color: #4c92c3 !important;
        color: #ffffff !important;
      }
    }
  }
</style>
