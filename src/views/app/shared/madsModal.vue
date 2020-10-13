<template>
  <b-modal :id="modalID" :ref="modalRef" size="lg" hide-footer @hidden="onCancel()">
    <div class="row">
      <div class="left-panel col col-3">
        <ul class="sections">
          <li v-for="section in modalSections"
            :key="section.index" @click="selectSection(section)"
            class="item"
            :class="{'active': section.index === selectedSectionIndex, 'visible': canSelectSection(section.index), 'd-none': section.hidden}">
              <span v-html="section.name"></span>
          </li>
        </ul>
      </div>
      <div class="right-panel col col-9">
        <slot name="right-panel"></slot>
        <div class="footer" v-if="!selectedSection.hideFooter">
          <b-button @click="onCancel()">Cancel</b-button>
          <b-button @click="nextSection()" v-if="!editMode && selectedSectionIndex < modalSections.length" class="next-btn">Next</b-button>
          <b-button @click="onSave()" v-if="editMode || selectedSectionIndex === modalSections.length" class="save-btn">Save</b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import EntityManagerBus from '../entityManager/entityManagerBus'
import SharedBus from './sharedBus'

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
    selectedSection: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectedSectionIndex: {
      type: Number,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visitedSections: {}
    }
  },
  methods: {
    canSelectSection (sectionIndex) {
      return this.editMode || this.visitedSections[sectionIndex]
    },
    selectSection (section) {
      if (this.canSelectSection(section.index)) {
        this.$emit('select-section', section.index)
      }
    },
    nextSection () {
      this.$emit('next-section')
    },
    onCancel () {
      this.visitedSections = {}
      this.$emit('on-cancel')
      this.$refs[this.modalRef].hide()
    },
    onSave () {
      this.$emit('on-save')
      this.$refs[this.modalRef].hide()
    }
  },
  watch: {
    selectedSectionIndex (index) {
      this.visitedSections[index] = true
    }
  },
  mounted () {
    this.visitedSections[this.selectedSectionIndex] = true

    EntityManagerBus.$on('open-mads-modal', (modalRef) => {
      this.$refs[modalRef] && this.$refs[modalRef].show()
    })

    SharedBus.$on('open-mads-modal', (modalRef) => {
      this.$refs[modalRef] && this.$refs[modalRef].show()
    })
  },
  beforeDestroy () {
    EntityManagerBus.$off()
    SharedBus.$off()
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
        height: 60px;
        display: flex;
        align-items: center;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        margin-bottom: 20px;
        color: #4d5156;
        &.active {
          font-weight: 700;
          color: black;
        }
        &.visible {
          cursor: pointer;
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
        min-width: 90px;
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
