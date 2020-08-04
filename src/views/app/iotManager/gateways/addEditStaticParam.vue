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
            Static Parameter
        </div>
        <b-form class="main-panel">
            <b-form-group label="Key" label-for="static-key">
                <b-form-input v-model="staticParam.name" type="text" id="static-key"></b-form-input>
            </b-form-group>
            <b-form-group label="Value" label-for="static-value">
                <b-form-input v-model="staticParam.value" type="text" id="static-value"></b-form-input>
            </b-form-group>
            <b-form-group label="Type" label-for="static-type">
                <b-form-input v-model="staticParam.data_type" type="text" id="static-type"></b-form-input>
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
import gatewayService from '@/services/gateway.service'

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
      staticParam:{}
    }
  },
  methods: {
    add () {
      this.editMode = false
      this.$refs.madsSingleSectionModal.$refs.createEditStaticModal.show()
      this.gateway = null
    },
    edit (detail) {
      this.editMode = true
      this.$refs.madsSingleSectionModal.$refs.createEditStaticModal.show()
      this.staticParam = detail
    },
    saveGateway () {
      if(this.editMode){
        this.staticParam = {

        }
      }else{
       console.log("this.staticParam", this.staticParam)
        this.$emit('saveData', this.staticParam);
        this.staticParam = {
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
