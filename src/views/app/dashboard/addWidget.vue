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
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode"></sections>
    </template>
  </mads-modal>
</template>

<script>
import madsModal from './../shared/madsModal'
import sections from './addWidgetSections'

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
      selectedSectionIndex: 1
    }
  },
  methods: {
    selectSection (index) {
      this.selectedSectionIndex = index
    },
    nextSection () {
      this.selectedSectionIndex++
      if (this.selectedSectionIndex === 3) {
        this.$refs.sections.setDataSeries()
      }
    },
    onCancel () {
      this.selectedSectionIndex = 1
    },
    saveWidget () {
      this.$refs.sections.saveWidgetInstance()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
