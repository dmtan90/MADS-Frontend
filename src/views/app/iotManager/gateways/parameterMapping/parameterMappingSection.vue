<template>
    <div v-if="data">
        <vue-tree @on-add-sibling-node="onAddSiblingNode"
                  @on-add-child-node="onAddChildNode"
                  :treeData="data" 
                  :treeOptions="treeOptions" 
                  :treeView="treeView">
        </vue-tree>
    </div>     
</template>

<script>
import { mapGetters } from 'vuex'
import gatewayService from '@/services/gateway.service'
import GatewayEventBus from '../gatewayEventBus'
import VueTree from 'vanyan-tree'

export default {
  components: {
    VueTree
  },
  data () {
    return {
      data: null,
      treeView: 'outline',
      treeOptions: {
        childrenKey: 'children',
        selectable: false,
        showHoverOptions: true
      }
    }
  },
  methods:{
    initTreeData () {
      this.data = {
        id: 1,
        options: {
          label: 'Add Key',
          classes: [],
          icon: '',
          hoverOptions: {
            sibling: false,
            child: true
          },
          expanded: true,
          selected: false,
          visible: true,
          selectable: false,
          draggable: true
        },
        children:[]
        // children: [
        //   {
        //     id: 11,
        //     options: {
        //       label: 'First First',
        //       classes: [],
        //       icon: '',
        //       hoverOptions: [],
        //       expanded: true,
        //       selected: false,
        //       visible: true,
        //       selectable: false,
        //       draggable: true
        //     },
        //     children: [
        //       {
        //         id: 11,
        //         options: {
        //           label: 'First First',
        //           classes: [],
        //           icon: '',
        //           hoverOptions: [],
        //           expanded: true,
        //           selected: false,
        //           visible: true,
        //           selectable: false,
        //           draggable: true
        //         }
        //       },
        //       {
        //         id: 12,
        //         options: {
        //           label: 'First Second',
        //           classes: [],
        //           icon: '',
        //           hoverOptions: [],
        //           expanded: true,
        //           selected: false,
        //           visible: true,
        //           selectable: false,
        //           draggable: true
        //         }
        //       }
        //     ]
        //   },
        //   {
        //     id: 12,
        //     options: {
        //       label: 'First Second',
        //       classes: [],
        //       icon: '',
        //       hoverOptions: [],
        //       expanded: true,
        //       selected: false,
        //       visible: true,
        //       selectable: false,
        //       draggable: true
        //     },
        //     children: [
        //       {
        //         id: 11,
        //         options: {
        //           label: 'First First',
        //           classes: [],
        //           icon: '',
        //           hoverOptions: [],
        //           expanded: true,
        //           selected: false,
        //           visible: true,
        //           selectable: false,
        //           draggable: true
        //         }
        //       },
        //       {
        //         id: 12,
        //         options: {
        //           label: 'First Second',
        //           classes: [],
        //           icon: '',
        //           hoverOptions: [],
        //           expanded: true,
        //           selected: false,
        //           visible: true,
        //           selectable: false,
        //           draggable: true
        //         }
        //       }
        //     ]
        //   }
        // ]
      }
    },
    onAddSiblingNode(e,data){
        debugger
    },
    onAddChildNode(e,data){
      let parentNode = data.parentNode || this.data
      let children = this.$_.concat(data.node.children,{
            id: 11,
            options: {
              label: 'First First',
              classes: [],
              icon: '',
              hoverOptions: [],
              expanded: true,
              selected: false,
              visible: true,
              selectable: false,
              draggable: true
            }})
        data.node.children = children;
        this.$set(parentNode, 'children', children)
            debugger;
    }
  },
  computed: {
    ...mapGetters(['currentUser','selectedGateway'])
  },
  mounted () {
     this.initTreeData()
  }
}
</script>

<style lang="scss" scoped>
 
</style>
