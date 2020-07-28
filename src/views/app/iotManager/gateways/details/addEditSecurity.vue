<template>
  <mads-single-section-modal
    ref="madsSingleSectionModal"
    :modalID="'add-edit-static-modal'"
    :modalRef="'createEditStaticModal'"
    :editMode="editMode"
    @on-cancel="onCancel()"
    @on-save="saveGateway()">
    <template v-slot:body-panel>
        <div class="heading">
            Security
        </div>
        <b-form class="main-panel">
            <button>Genrate Access Token</button>
        </b-form>
    </template>
  </mads-single-section-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsSingleSectionModal from '../../../shared/madsSingleSectionModal'
import GatewayEventBus from '../gatewayEventBus'
import TreeEventBus from '../../../shared/madsTree/treeEventBus'

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
      editMode: false,
      gateway: null,
      staicParam:{}
    }
  },
  methods: {
    add () {
      this.editMode = false
      this.$refs.madsSingleSectionModal.$refs.createEditStaticModal.show()
      this.gateway = null
    },
    edit (gateway) {
      this.editMode = true
      this.$refs.madsSingleSectionModal.$refs.createEditStaticModal.show()
      this.gateway = gateway
    },
    saveGateway () {
    
    },
    onCancel () {
    //   this.allSectionsVisited = false
    }
  },
//   computed: {
//     ...mapGetters(['currentUser', 'selectedProject'])
//   }
}
</script>

<style lang="scss" scoped>
.heading{
    font-size: 25px;
    color: #000;
    font-weight: bold;
    width: 100%;
}
.main-panel{
    width: 100%;
}
</style>
