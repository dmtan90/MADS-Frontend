<template>
  <b-modal :id="modalID" :ref="modalRef" size="lg" hide-footer @hidden="onCancel()">
    <div class="row">
      <div class="left-panel col col-3">
        <ul class="sections">
          <li v-for="section in modalSections" :key="section.index" @click="selectSection(section)" class="item" :class="{'active': section.index === selectedSectionIndex}">
            <span v-html="section.name"></span>
          </li>
        </ul>
      </div>
      <div class="right-panel col col-9">
        <slot name="right-panel"></slot>
        <div class="footer">
          <b-button @click="onCancel()">Cancel</b-button>
          <b-button @click="nextSection()" v-if="selectedSectionIndex < modalSections.length" class="next-btn">Next</b-button>
          <b-button @click="onSave()" v-if="selectedSectionIndex === modalSections.length" class="save-btn">Save</b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import EntityManagerBus from '../entityManager/entityManagerBus'

export default {
  props: {
    modalID: {
      type: String,
      required: true
    },
    modalRef: {
      type: String,
      required: true
    },
    modalSections: {
      type: Array,
      required: true
    },
    selectedSectionIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    selectSection (section) {
      this.$emit('select-section', section.index)
    },
    nextSection () {
      this.$emit('next-section')
    },
    onCancel () {
      this.$emit('on-cancel')
      this.$refs[this.modalRef].hide()
    },
    onSave () {
      this.$emit('on-save')
      this.$refs[this.modalRef].hide()
    }
  },
  mounted () {
    EntityManagerBus.$on('open-mads-modal', (modalRef) => {
      this.$refs[modalRef] && this.$refs[modalRef].show()
    })
  }
}
</script>

<style lang="scss" scoped>
  .row {
    margin: 0;
    min-height: 400px;
  }
  .left-panel {
    padding: 20px;
    border-right: 1px solid #f3f3f3;
    .sections {
      padding-top: 30px;
      padding-left: 0;
      margin-bottom: 0;
      li.item {
        list-style: none;
        font-size: 18px;
        cursor: pointer;
        height: 60px;
        display: flex;
        align-items: center;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        margin-bottom: 20px;
        color: black;
        &.active {
          font-weight: 700;
        }
      }
    }
  }
  .right-panel {
    padding: 20px;
    .footer {
      position: absolute;
      text-align: right;
      right: 20px;
      bottom: 20px;
      .next-btn, .save-btn {
        background-color: #4c92c3 !important;
        color: #ffffff !important;
      }
    }
  }
</style>

<style lang="scss">
  .modal {
    .modal-content {
      .modal-body {
        padding: 0;
      }
    }
  }
</style>
