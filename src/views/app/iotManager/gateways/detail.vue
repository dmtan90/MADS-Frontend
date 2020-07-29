<template>
  <div class="details">
    <h2>Gateway Setup</h2>
    <div>
    <div class="details-tab">
      <b-tabs pills card>
        <b-tab title="Parameter" active>
          <div class="params-wrap">
            <div class="static-params">
              <div class="static-head-box">
                <div class="heading">Static Parameters</div>
                <button class="btn" @click="saveStaticParam()">Save All</button>
                <button class="btn" @click="addStaticParam()">+ Add</button>
              </div>
              <vuetable
                  ref="vuetable"
                  :api-mode="false"
                  :fields="fields"
                  :data="staticParams"
                >
                <template v-slot:checkbox>
                  <b-form-checkbox></b-form-checkbox>
                </template>
                <template v-slot:actions="props">
                  <span class="edit-gateway" @click="editStaticParam(props.rowData)">Edit</span>
                  <span class="delete-gateway" @click="deleteStaticParam(props.rowData)">Delete</span>
                </template>
              </vuetable>
            </div>
            <div class="streaming-params">
              <div class="static-head-box">
                <div class="heading">Streaming Parameters</div>
                <button class="btn" @click="saveStreamingParam()">Save All</button>
                <button class="btn" @click="addStreamParam()">+ Add</button>
              </div>
              <vuetable
                  ref="vuetable"
                  :api-mode="false"
                  :fields="streamFields"
                  :data="streamingParams"
                >
                <template v-slot:checkbox>
                  <b-form-checkbox></b-form-checkbox>
                </template>
                <template v-slot:actions="props">
                  <span class="edit-gateway" @click="editStreamParam(props.rowData)">Edit</span>
                  <span class="delete-gateway" @click="deleteStreamParam(props.rowData)">Delete</span>
                </template>
              </vuetable>
            </div>
          </div>
        </b-tab>
        <b-tab title="Details">
          <div class="credentails-box">
            <div class="header">Credentails</div>
            <div class="body-box">
              <div class="edit-btn">
                <button @click="editCredentials(credentials)">
                  <svg class="icon">
                    <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
                  </svg>
                </button>
              </div>
              <div class="iteams-row">
                <div class="iteam-main">
                  Name:
                </div>
                <div class="iteam">
                  {{credentials.name}}
                </div>
              </div>
              <div class="iteams-row">
                <div class="iteam-main">
                  Channel:
                </div>
                <div class="iteam">
                  {{credentials.channel}}
                </div>
              </div>
              <div class="iteams-row">
                <div class="iteam-main">
                  Parent:
                </div>
                <div class="iteam">
                  {{credentials.parent_type}}
                </div>
              </div>
              <div class="iteams-row">
                <div class="iteam-main">
                  Description:
                </div>
                <div class="iteam">
                  {{credentials.description}}
                </div>
              </div>
              <div class="iteams-row">
                <div class="iteam-main">
                  UUID:
                </div>
                <div class="iteam">
                  {{credentials.uuid}}
                </div>
              </div>
              <div class="iteams-row">
                <div class="iteam-main">
                  Status:
                </div>
                <div class="iteam">
                  {{credentials.status}}
                </div>
              </div>
            </div>
          </div>

          <div class="security-box">
            <div class="header">Security</div>
            <div class="body-box">
              <div class="edit-btn">
                <button @click="editSecurity(security)">
                  <svg class="icon">
                    <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
                  </svg>
                </button>
              </div>
              <div class="iteams-row">
                <div class="iteam-main">
                  Access Token:
                </div>
                <div class="iteam">
                  {{security.access_token}}
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Latest Logs">
          <latest-logs-section></latest-logs-section>
        </b-tab>
        <b-tab title="Parameter-Mapping">
          <parameter-mapping-section></parameter-mapping-section>
        </b-tab>
        <b-tab title="Commands">
          <div class="commands-container">
            <b-form>
              <b-form-group label="Add Commands" label-for="add-commands" class="commands">
                <b-form-textarea v-model="commands.commands" id="add-commands" rows="15" max-rows="15"></b-form-textarea>
              </b-form-group>
              <b-button @click="addCommands()">Add</b-button>
            </b-form>
          </div>
        </b-tab>

      </b-tabs>
    </div>
</div>
    <add-edit-static-param @saveData="staticParamsData" ref="addEditStaticParam"></add-edit-static-param>
    <add-edit-streaming-param @saveData="streamingParamsData" ref="addEditStreamingParam"></add-edit-streaming-param>
    <add-edit-credentials ref="addEditCredentials"></add-edit-credentials>
    <add-edit-security ref="addEditSecurity"></add-edit-security>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import {Vuetable, VuetablePagination} from 'vuetable-2'
import paramFieldDefs from './parametersFieldDef'
import streamParamFieldDefs from './streamingParametersFieldDef'
import addEditStaticParam from './addEditStaticParam'
import addEditStreamingParam from './addEditStreamingParam'
import addEditCredentials from './details/addEditDetailsCred'
import addEditSecurity from './details/addEditSecurity'
import gatewayService from '@/services/gateway.service'
import GatewayEventBus from './gatewayEventBus'
import parameterMappingSection from './parameterMapping/parameterMappingSection'
import latestLogsSection from './latestLogs/latestLogsSection'

export default {
  components: {
    Vuetable,
    addEditStaticParam,
    addEditStreamingParam,
    addEditCredentials,
    addEditSecurity,
    VuetablePagination,
    parameterMappingSection,
    latestLogsSection
  },
  data () {
    return {
      fields: paramFieldDefs,
      streamFields: streamParamFieldDefs,
      staticParams: [],
      streamingParams: [],
      gatewayData: [],
      credentials:{},
      security:{},
      commands:{},
    }
  },
  methods:{
    async loadGatewayData(){
      const config = {
        orgId: this.currentUser.org.id,
        projectId: 1,
        id: this.selectedGateway.id
      }

      const params = {
        page_size: 20,
        page_number: 1
      }
      let gatewayId = this.selectedGateway.id

      gatewayService.readId(config, params)
        .then((res) => {
          let filterData = res;

          this.credentials = {
            name: filterData ? filterData.name : null,
            channel: filterData ? filterData.channel : null,
            parent_type: filterData ? filterData.parent_type : null,
            parent_id: filterData ? filterData.parent_id : null,
            description: filterData ? filterData.description : null,
            uuid: filterData ? filterData.uuid : null,
            id: filterData ? filterData.id : null,
            status: 'Active'
          }

          this.security = {
            id: filterData ? filterData.id : null,
            access_token: filterData? filterData.access_token : null
          }

          this.staticParams = filterData.static_data.map((data, index) => {
            return {
              name: data.data.name,
              data_type: data.data.data_type,
              unit: data.data.unit,
              value: data.data.value
            }
          });

          this.streamingParams = filterData.streaming_data.map((data, index) => {
            return {
              name: data.name,
              data_type: data.data_type,
              unit: data.unit,
              value: data.value
            }
          });
        })

        
    },
    editStaticParam(detail){
      this.$refs.addEditStaticParam.edit(detail)
    },
    deleteStaticParam(detail){
      
    },
    addStaticParam() {
      this.$refs.addEditStaticParam.add()
    },
    addStreamParam(){
      this.$refs.addEditStreamingParam.add()
    },
    editStreamParam(detail){
      this.$refs.addEditStreamingParam.edit(detail)
    },
    deleteStreamParam(detail){
      
    },
    editCredentials(credentials){
      this.$refs.addEditCredentials.edit(credentials)
    },
    editSecurity(security){
      this.$refs.addEditSecurity.edit(security)
    },
    staticParamsData(data){
       let staticParamData = [...this.staticParams];
       staticParamData.push(data);
       this.staticParams = staticParamData;
    },
    streamingParamsData(data){
       let streamingParamData = [...this.streamingParams];
       streamingParamData.push(data);
       this.streamingParams = streamingParamData;
    },
    saveStaticParam(){
       let config = { orgId: this.currentUser.org.id, projectId: 1, id: this.selectedGateway.id };
       let payload = {
         'static_data': this.staticParams
       }
       gatewayService.update(config, payload)
        .then((res)=> console.log("res",res))
    },
    saveStreamingParam(){
       let config = { orgId: this.currentUser.org.id, projectId: 1, id: this.selectedGateway.id };
       let payload = {
         'streaming_data': this.streamingParams
       }
       gatewayService.update(config, payload)
        .then((res)=> console.log("res",res))
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    addCommands(){
      let config = { orgId: this.currentUser.org.id, projectId: 1,id: this.selectedGateway.id }
      let data = {
        commands: JSON.parse(this.commands.commands)
      }
      gatewayService.storeCommandCreate(config, data)
          .then((res)=>{
              GatewayEventBus.$emit('reload-gateways');
          })
    }
  },
  computed: {
    ...mapGetters(['currentUser','selectedGateway'])
  },
  mounted () {
    this.loadGatewayData()
  }
}
</script>

<style lang="scss" scoped>
  .details {
    .details-tab {
      margin-top: 20px;
      .params-wrap {
        display: flex;
        justify-content: space-between;
        .static-params, .streaming-params {
          width: 45%;
        }
      }
    }
    .static-head-box{
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      .heading{
        font-size: 20px;
        font-weight: 500;
        color: #000;
      }
      button{
        padding: 5px 10px;
        margin-bottom: 10px;
      }
    }
    .edit-gateway, .delete-gateway {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }

  .credentails-box{
    width: 60%;
    border: 1px solid #000;
    border-radius: 10px;
    .header{
      width: 100%;
      padding: 10px;
      border-bottom: 1px solid #000;
      font-size: 16px;
      color: #000;
      font-weight: bold;
    }
    .body-box{
      width: 100%;
      padding: 10px;
      position: relative;
      .edit-btn{
        position: absolute;
        bottom: 10px;
        right: 10px;
        button{
          // background-color:transparent !important;
          // border: 0 !important;
          border-radius: 50% !important;
          width: 70px;
          height: 65px;
          svg{
            width: 30px;
            height: 30px;
          }
        }
      }
      .iteams-row{
        width: 100%;
        display: flex;
        padding-bottom:10px ;
        .iteam-main{

        }
        .iteam{

        }
      }
    }
  }

  .security-box{
    width: 60%;
    border: 1px solid #000;
    border-radius: 10px;
    margin-top: 30px;
    .header{
      width: 100%;
      padding: 10px;
      border-bottom: 1px solid #000;
      font-size: 16px;
      color: #000;
      font-weight: bold;
    }
    .body-box{
      width: 100%;
      padding: 10px 10px 50px 10px;
      position: relative;
      .edit-btn{
        position: absolute;
        bottom: 10px;
        right: 10px;
        button{
          // background-color:transparent !important;
          // border: 0 !important;
          border-radius: 50% !important;
          width: 70px;
          height: 65px;
          svg{
            width: 30px;
            height: 30px;
          }
        }
      }
      .iteams-row{
        width: 100%;
        display: flex;
        padding-bottom:10px ;
        .iteam-main{

        }
        .iteam{

        }
      }
    }
  }

  .commands-container{
    width: 70%;
  }
</style>
