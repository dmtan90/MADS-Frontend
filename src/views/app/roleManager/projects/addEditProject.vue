<template>
  <mads-modal
    ref="madsModal"
    :modalID="'add-edit-project-modal'"
    :modalRef="'createProjectModal'"
    :modalSections="modalSections"
    :selectedSectionIndex="selectedSectionIndex"
    :editMode="editMode"
    @select-section="selectSection($event)"
    @next-section="nextSection()"
    @on-cancel="onCancel()"
    @on-save="saveProject()">
    <template v-slot:right-panel>
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :projectData="project"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from './../../shared/madsModal'
import sections from './addEditProjectSections'
import projectService from '@/services/project.service'
import ProjectEventBus from './projectEventBus'

export default {
  props: {
  },
  components: {
    madsModal,
    sections
  },
  data () {
    return {
      editMode: false,
      modalSections: [{
        index: 1,
        name: 'Details'
      }, {
        index: 2,
        name: 'People'
      }, {
        index: 3,
        name: 'Metadata <br> (Fixed Data)'
      }],
      selectedSectionIndex: 1,
      project: null
    }
  },
  methods: {
    add (project) {
      this.editMode = false
      this.$refs.madsModal.$refs.createProjectModal.show()
      this.project = null
    },
    edit (project) {
      this.editMode = true
      this.$refs.madsModal.$refs.createProjectModal.show()
      this.project = project
    },
    selectSection (index) {
      this.selectedSectionIndex = index
    },
    nextSection () {
      this.selectedSectionIndex++
    },
    uploadProjectImage (projectId, projectImage) {
      let config = { orgId: this.currentUser.org.id, id: projectId }

      let formData = new FormData()
      formData.append('image', projectImage, projectImage.name)

      projectService.update(config, formData)
        .then((response) => {
        })
    },
    saveProject () {
      let config = { orgId: this.currentUser.org.id }
      let projectData = this.$refs.sections.getProjectData()

      let projectImage = projectData.image

      delete projectData.image

      if (this.editMode) {
        config = this.$_.assign(config, { id: this.project.id })
        projectService.update(config, projectData)
          .then((response) => {
            ProjectEventBus.$emit('reload-projects')
            if (projectImage && projectImage.name) {
              this.uploadProjectImage(this.project.id, projectImage)
            }
          })
      } else {
        projectService.create(config, projectData)
          .then((response) => {
            ProjectEventBus.$emit('reload-projects')
            if (projectImage && projectImage.name) {
              this.uploadProjectImage(response.id, projectImage)
            }
          })
      }
      this.selectedSectionIndex = 1
    },
    onCancel () {
      this.selectedSectionIndex = 1
      this.allSectionsVisited = false
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>

</style>
