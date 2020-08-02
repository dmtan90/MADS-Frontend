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
    saveProject () {
      let config = { orgId: this.currentUser.org.id }
      let projectData = this.$refs.sections.getProjectData()
      debugger;
      let formData = new FormData();

      formData.append("image", projectData.image, projectData.image.name);
      formData.append("name", projectData.name);
      formData.append("creator_id", projectData.creator_id);
      formData.append("description", projectData.description);
      for (var i = 0; i < projectData.lead_ids.length; i++) {
          formData.append('lead_ids[]', projectData.lead_ids[i]);
      }
      formData.append("location[name]", projectData.location.name);
      formData.append("location[place_id]", projectData.location.place_id);
      formData.append("location[url]", projectData.location.url);
      // for (var i = 0; i < projectData.metadata.length; i++) {
      //     formData.append("metadata[][data_type]", projectData.metadata[i]["data_type"]);
      //     formData.append("metadata[][name]", projectData.metadata[i]["name"]);
      //     formData.append("metadata[][unit]", projectData.metadata[i]["unit"]);
      //     formData.append("metadata[][value]", projectData.metadata[i]["value"]);
      // }
      this.getFormData(formData, projectData.metadata, "metadata")
      for (var i = 0; i < projectData.user_ids.length; i++) {
          formData.set("user_ids[]", projectData.user_ids[i]);
      }

      if (this.editMode) {
        config = this.$_.assign(config, { id: this.project.id })
        projectService.update(config, formData)
          .then((response) => {
            ProjectEventBus.$emit('reload-projects')
          })
      } else {
        projectService.create(config, formData)
          .then((response) => {
            ProjectEventBus.$emit('reload-projects')
          })
      }
      this.selectedSectionIndex = 1
    },
    getFormData(formData, data, key) {
      if (data instanceof Object) {
        Object.keys(data).forEach(key => {
          const value = data[key];
          if (value instanceof Object && !Array.isArray(value)) {
            return this.getFormData(formData, value, key);
          }
          // if (previousKey) {
          //   key = `${previousKey}[${key}]`;
          // }
          if (Array.isArray(value)) {
            value.forEach(val => {
              formData.append(`${key}[]`, val);
            });
          } else {
            formData.append(key, value);
          }
        });
      }
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
