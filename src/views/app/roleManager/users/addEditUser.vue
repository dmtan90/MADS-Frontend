<template>
  <mads-modal
    ref="madsModal"
    :modalID="'add-edit-user-modal'"
    :modalRef="'createUserModal'"
    :modalSections="modalSections"
    :selectedSectionIndex="selectedSectionIndex"
    :editMode="editMode"
    @select-section="selectSection($event)"
    @next-section="nextSection()"
    @on-cancel="onCancel()"
    @on-save="saveUser()">
    <template v-slot:right-panel>
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :userData="user" :roles="roles"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from './../../shared/madsModal'
import sections from './addEditUserSections'
import userService from '@/services/user.service'
import UserEventBus from './userEventBus'

export default {
  props: {
    roles: {
      type: Array,
      required: true
    }
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
        name: 'Assets'
      }, {
        index: 3,
        name: 'Apps'
      }],
      selectedSectionIndex: 1,
      user: null
    }
  },
  methods: {
    add (user) {
      this.editMode = false
      this.$refs.madsModal.$refs.createUserModal.show()
      this.user = null
    },
    edit (user) {
      this.editMode = true
      this.$refs.madsModal.$refs.createUserModal.show()
      this.user = user
    },
    selectSection (index) {
      this.selectedSectionIndex = index
    },
    nextSection () {
      this.selectedSectionIndex++
    },
    saveUser () {
      let config = { orgId: this.currentUser.org.id }
      let userData = this.$refs.sections.getUserData()

      if (this.editMode) {
        config = this.$_.assign(config, { id: this.user.id })
        userService.update(config, userData)
          .then((response) => {
            UserEventBus.$emit('reload-users')
          })
      } else {
        userService.create(config, userData)
          .then((response) => {
            UserEventBus.$emit('reload-users')
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
