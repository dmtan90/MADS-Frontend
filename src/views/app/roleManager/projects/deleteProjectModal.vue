<template>
  <mads-single-section-modal
    ref="madsSingleSectionModal"
    :modalID="'delete-project-modal'"
    :modalRef="'deleteProjectModal'"
    :deleteMode="isDelete"
    :viewMode="false"
    @on-delete="deleteProject()">
    <template v-slot:body-panel>
        <div class="delete-box">
          Are you sure you want to Delete?
        </div>
    </template>
  </mads-single-section-modal>
</template>

<script>
import madsSingleSectionModal from './../../shared/madsSingleSectionModal'
import projectService from '@/services/project.service'
import ProjectEventBus from './projectEventBus'

export default {
  props: {
    entityMapParentNode: {
      default: null
    }
  },
  components: {
    madsSingleSectionModal
  },
  data () {
    return {
      userId: null,
      isDelete: true,
      config: {}
    }
  },
  methods: {
    delete (config) {
      this.config = config
      this.$refs.madsSingleSectionModal.$refs.deleteProjectModal.show()
    },
    deleteProject () {
      projectService.delete(this.config)
        .then((response) => {
          ProjectEventBus.$emit('reload-projects')
        })
    }
  },
  beforeDestroy () {
    ProjectEventBus.$off()
  }
}
</script>

<style lang="scss" scoped>
.delete-box{
    font-size: 20px;
    margin-top: 40px;
    font-weight: bold;
}
</style>

<style lang="scss">
.row{
  justify-content: center;
}
</style>
