<template>
  <mads-modal
    ref="madsModal"
    :modalID="'edit-settings-modal'"
    :modalRef="'editSettingsModal'"
    :modalSections="modalSections"
    :selectedSection="selectedSection"
    :selectedSectionIndex="selectedSectionIndex"
    :editMode="editMode"
    @select-section="selectSection($event)"
    @next-section="nextSection()"
    @on-cancel="onCancel()"
    @on-save="saveSettings()">
    <template v-slot:right-panel>
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from './../../shared/madsModal'
import sections from './editSettingsSections'
import dashboardService from '@/services/dashboard.service'
import dasbhoardEventBus from './../dashboardBus'

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
        name: 'Visual'
      }, {
        index: 2,
        name: 'Client'
      }, {
        index: 3,
        name: 'Tabs'
      }],
      selectedSection: {},
      selectedSectionIndex: 1
    }
  },
  methods: {
    edit () {
      this.editMode = true
      this.$refs.madsModal.$refs.editSettingsModal.show()
    },
    selectSection (index) {
      this.selectedSection = this.modalSections[index - 1]
      this.selectedSectionIndex = index
    },
    nextSection () {
      this.selectedSectionIndex++
    },
    onCancel () {
      this.selectedSectionIndex = 1
    },
    saveSettings () {
      let loader = this.$loading.show()
      let params = {}
      if (this.selectedSectionIndex === 1) {
        params = this.$refs.sections.getVisualSettings()
      }
      if (this.selectedSectionIndex === 2) {
        params = this.$refs.sections.getClientSettings()
      }
      if (this.selectedSectionIndex === 3) {
        params = this.$refs.sections.getTabSettings()
      }
      let config = { orgId: this.currentUser.org.id, id: this.selectedDashboard.id }

      dashboardService.update(config, params)
        .then((response) => {
          dasbhoardEventBus.$emit('reload-dashboard')
          dasbhoardEventBus.$emit('reload-dashboards')
          loader.hide()
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedDashboard'])
  },
  mounted () {
    this.selectedSection = this.$_.merge({}, this.selectedSection)
  }
}
</script>

<style lang="scss" scoped>
</style>
