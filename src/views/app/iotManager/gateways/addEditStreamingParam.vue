<template>
  <mads-single-section-modal
    ref="madsSingleSectionModal"
    :modalID="'add-edit-streaming-modal'"
    :modalRef="'createEditStreamingModal'"
    :editMode="editMode"
    @on-cancel="onCancel()"
    @on-save="saveGateway()">
    <template v-slot:body-panel>
        <div class="heading">
            Streaming Parameter
        </div>
        <b-form class="main-panel">
            <b-form-group label="Key" label-for="stream-key">
                <b-form-input v-model="streamParam.name" type="text" id="stream-key"></b-form-input>
            </b-form-group>
            <b-form-group label="Units" label-for="stream-unit">
                <b-form-input v-model="streamParam.unit" type="text" id="stream-unit"></b-form-input>
            </b-form-group>
            <b-form-group label="Type" label-for="stream-type">
                <b-form-input v-model="streamParam.data_type" type="text" id="stream-unit"></b-form-input>
            </b-form-group>
        </b-form>
    </template>
  </mads-single-section-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsSingleSectionModal from './../../shared/madsSingleSectionModal'
import GatewayEventBus from './gatewayEventBus'
import TreeEventBus from './../../shared/madsTree/treeEventBus'

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
      streamParam:{}
    }
  },
  methods: {
    add () {
      this.editMode = false
      this.$refs.madsSingleSectionModal.$refs.createEditStreamingModal.show()
      this.gateway = null
    },
    edit (detail) {
      this.editMode = true
      this.$refs.madsSingleSectionModal.$refs.createEditStreamingModal.show()
      this.streamParam = detail
    },
    saveGateway () {
      if(this.editMode){
        this.streamParam = {

        }
      }else{
        this.$emit('saveData', this.streamParam);
        this.streamParam = {
          name: '',
          value:'',
          data_type:'',
          unit:''
        };
      }
    },
    onCancel () {
    //   this.allSectionsVisited = false
    }
  },
  mounted(){
    if(this.editMode){
        this.staticParam = {
          name: '',
          value:'',
          data_type:'',
          unit:''
        }
      }else{
        this.staticParam = {
          name: '',
          value:'',
          data_type:'',
          unit:''
        }
      }
  }
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
