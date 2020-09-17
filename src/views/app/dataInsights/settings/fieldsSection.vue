<template>
  <div class="fields-container">
      <div class="fields-left-box">
        <div class="add-fields-box">
            <b-button class="add-fields-button" @click="addEntity()">+  Add Field</b-button>
        </div>
        <template v-if="fields.length > 0">
            <div class="fields-box" v-for="(field, index) in fields" :key="index">
                <div class="field-box">
                    <div class="fields-name-text">
                        {{field.name}}
                    </div>
                    <div class="more-icon-dropdown">
                        <b-button class="more-icon" @click="showDelete()"><img src="../../../../assets/img/icons/more.svg" /></b-button>
                        <div class="dropdown-box" v-if="isDelete && index === entityId">
                            <b-button @click="deleteItem(index)">Delete</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
      </div>
      <div class="fields-right-box">
          <field-form></field-form>
      </div>
  </div>
</template>

<script>
import fieldForm from './fieldForm'

export default {
  components: {
    fieldForm
  },
  data () {
    return {
      isDelete: false,
      fields: [],
      entityId: null
    }
  },
  computed: {

  },
  methods: {
    addEntity (id) {
      this.entities = this.$_.concat(this.entities, [{ id: '', name: '', desc: '', hide: false, entityType: '', type: '' }])
      this.entityId = id
    },
    showDelete () {
      this.isDelete = true
    },
    deleteItem () {
      this.isDelete = false
    }
  }
}
</script>

<style lang="scss" scoped>
    .fields-container{
        width:100%;
        display: flex;
        height: calc(100vh - 153px);
        .fields-left-box{
            width: 20%;
            border-right: 1px solid rgba(0,0,0,.2);
            .add-fields-box{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid rgba(0,0,0,.2);
                .add-fields-button{
                    border: 0 !important;
                    font-weight: bold;
                    font-size: 15px;
                }
            }
            .fields-box{
                display: flex;
                flex-direction: column;
                .field-box{
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    padding: 15px;
                    border-bottom: 1px solid rgba(0,0,0,.2);
                    align-items: center;
                    cursor: pointer;
                    .field-name-text{
                        font-size: 17px;
                        color: #1F1F1F;
                    }
                    .more-icon-dropdown{
                        position: relative;
                        .more-icon{
                            border: 0 !important;
                            padding: 0 !important;
                            img{
                                width: 22px;
                            }
                        }
                        .dropdown-box{
                            position: absolute;
                        }
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .fields-right-box{
            width: 80%;
            .tabs{
                .card-header{
                    padding: 0 !important;
                    .card-header-pills{
                        margin: 0 !important;
                        li{
                            width: 160px !important;
                            height: 48px !important;
                            .nav-link.active{
                                background-color: transparent !important;
                                border-bottom: 2px solid #2696f3 !important;
                                color: rgba(0,0,0,.87) !important;
                                font-size: 14px !important;
                                border-radius: 0px !important;
                                text-align: center !important;
                            }
                            .nav-link{
                                background-color: transparent !important;
                                border: 0px !important;
                                color: rgba(0,0,0,.87) !important;
                                font-size: 14px !important;
                                border-radius: 0px !important;
                                text-align: center !important;
                            }
                        }
                    }
                }
            }
        }
</style>
