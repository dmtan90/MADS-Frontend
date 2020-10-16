<template>
  <mads-single-section-modal
    ref="madsSingleSectionModal"
    :modalID="'view-delete-user-modal'"
    :modalRef="'viewDeleteUserModal'"
    :deleteMode="isDelete"
    :viewMode="false"
    @on-delete="archiveProject()">
    <template v-slot:body-panel>
        <div class="delete-box">
          Are you sure you want to Archive?
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
      config: {},
      payload: {}
    }
  },
  methods: {
    archive (config, payload) {
      this.config = config
      this.payload = payload
      this.$refs.madsSingleSectionModal.$refs.viewDeleteUserModal.show()
    },
    archiveProject () {
      projectService.update(this.config, this.payload)
        .then((res) => {
          ProjectEventBus.$emit('reload-archived')
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
.main-panel{
    width: 100%;
}
</style>

<style lang="scss">
.row{
  justify-content: center;
}
</style>
