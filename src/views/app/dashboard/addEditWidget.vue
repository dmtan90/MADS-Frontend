<template>
  <mads-modal
    ref="madsModal"
    :modalID="'add-widget-modal'"
    :modalRef="'addWidgetModal'"
    :modalSections="modalSections"
    :selectedSectionIndex="selectedSectionIndex"
    :editMode="editMode"
    @select-section="selectSection($event)"
    @next-section="nextSection()"
    @on-cancel="onCancel()"
    @on-save="saveWidget()">
    <template v-slot:right-panel>
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :widgetData="widget" @hide-section="hideSection" @show-section="showSection"></sections>
    </template>
  </mads-modal>
</template>

<script>
import madsModal from './../shared/madsModal'
import sections from './addEditWidgetSections'

export default {
  components: {
    madsModal,
    sections
  },
  data () {
    return {
      editMode: false,
      modalSections: [{
        index: 1,
        name: 'Widget'
      }, {
        index: 2,
        name: 'Data'
      }, {
        index: 3,
        name: 'Settings'
      }],
      selectedSectionIndex: 1,
      widget: null
    }
  },
  methods: {
    add () {
      this.editMode = false
      this.$refs.madsModal.$refs.addWidgetModal.show()
      this.widget = null
    },
    edit (widget) {
      this.editMode = true
      this.$refs.madsModal.$refs.addWidgetModal.show()
      this.widget = widget
    },
    selectSection (index) {
      this.selectedSectionIndex = index
      if (this.selectedSectionIndex === 3) {
        this.$refs.sections.setDataSeries()
      }
    },
    nextSection () {
      this.selectedSectionIndex++
      if (this.modalSections[this.selectedSectionIndex - 1].hidden) {
        this.nextSection()
      } else {
        if (this.selectedSectionIndex === 3) {
          this.$refs.sections.setDataSeries()
        }
      }
    },
    hideSection (index) {
      let section = this.$_.merge(this.modalSections[index], { hidden: true })
      this.$set(this.modalSections, index, section)
    },
    showSection (index) {
      let section = this.$_.merge(this.modalSections[index], { hidden: false })
      this.$set(this.modalSections, index, section)
    },
    onCancel () {
      this.selectedSectionIndex = 1
    },
    saveWidget () {
      if (this.editMode) {
        this.$refs.sections.updateWidgetInstance()
      } else {
        this.$refs.sections.saveWidgetInstance()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
