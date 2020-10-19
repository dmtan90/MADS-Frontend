<template>
  <b-modal :id="modalID" :ref="modalRef" size="md" hide-footer @hidden="onCancel()">
    <div class="row">
        <slot name="body-panel"></slot>
        <div class="footer">
            <b-button v-if="!deleteMode" @click="onCancel()">Cancel</b-button>
            <b-button v-if="viewMode" @click="onSave()" class="save-btn">Save</b-button>
            <b-button v-if="deleteMode" @click="onCancel()">No</b-button>
            <b-button v-if="deleteMode" @click="onDelete()" class="save-btn">Yes</b-button>
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
    editMode: {
      type: Boolean,
      default: false
    },
    viewMode: {
      type: Boolean,
      default: true
    },
    deleteMode: {
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
    onCancel () {
      this.visitedSections = {}
      this.$emit('on-cancel')
      this.$refs[this.modalRef].hide()
    },
    onSave () {
      this.$emit('on-save')
      this.$refs[this.modalRef].hide()
    },
    onDelete () {
      this.$emit('on-delete')
      this.$refs[this.modalRef].hide()
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
    // min-height: 450px;
    flex-wrap: wrap;
    padding: 20px;
  }
.footer {
    width: 100%;
    text-align: right;
    margin-top: 30px;
    .next-btn, .save-btn {
    background-color: #4c92c3 !important;
    color: #ffffff !important;
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
