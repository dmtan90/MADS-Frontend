<template>
  <b-modal id="create-sensor-type-modal" ref="createSensorTypeModal" size="lg" hide-footer>
    <div class="create-sensor-type row">
      <div class="left-panel col col-3">
        <ul class="sections">
          <li @click="section = 1" class="item" :class="{'active': section === 1}">Details</li>
          <li @click="section = 2" class="item" :class="{'active': section === 2}">
            Metadata <br>
            (Fixed Data)
          </li>
          <li @click="section = 3" class="item" :class="{'active': section === 3}">
            Parameters <br>
            (Streaming Data)
          </li>
        </ul>
      </div>
      <div class="right-panel col col-9">
        <h3>{{edit ? 'Edit' : 'Add'}} Sensor Type</h3>
        <section v-if="section === 1" class="details">
          <b-form>
            <b-form-group label="Sensor Type Name" label-for="sensor-type-name">
              <b-form-input id="sensor-type-name" v-model="name" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group label="Sensor Type Description" label-for="sensor-type-description">
              <b-form-textarea id="sensor-type-description" v-model="description" rows="6" max-rows="6"></b-form-textarea>
            </b-form-group>
          </b-form>
        </section>
        <section v-if="section === 2" class="metadata">
          <div class="metadata-group">
            <b-form class="horizontal-form" v-for="index in newMetadataCount" :key="index">
              <b-form-group label="Metadata Name(key)" class="name">
                <b-form-input type="text"></b-form-input>
              </b-form-group>
              <b-form-group label="Data Type" class="data-type">
                <multiselect :options="[{name: 'Type 1'}, {name: 'Type 2'}, {name: 'Type 3'}, {name: 'Type 4'}, {name: 'Type 5'}]" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="id">
                </multiselect>
              </b-form-group>
              <b-form-group label="Unit" class="unit">
                <b-form-input></b-form-input>
              </b-form-group>
            </b-form>
            <b-button class="add-new-row" @click="addNewMetadata()">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-common-icons.svg#plus"></use>
              </svg>
              <span class="text">Add New</span>
            </b-button>
          </div>
        </section>
        <section v-if="section ===3" class="parameters">
          <div class="metadata-group">
            <b-form class="horizontal-form" v-for="index in newParameterCount" :key="index">
              <b-form-group label="Parameter Name(key)" class="name">
                <b-form-input type="text"></b-form-input>
              </b-form-group>
              <b-form-group label="Data Type" class="data-type">
                <multiselect :options="[{name: 'Type 1'}, {name: 'Type 2'}, {name: 'Type 3'}, {name: 'Type 4'}, {name: 'Type 5'}]" :select-label="''" :selected-label="''" :deselect-label="''" label="name" track-by="id">
                </multiselect>
              </b-form-group>
              <b-form-group label="Unit" class="unit">
                <b-form-input></b-form-input>
              </b-form-group>
            </b-form>
            <b-button class="add-new-row" @click="addNewParameter()">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-common-icons.svg#plus"></use>
              </svg>
              <span class="text">Add New</span>
            </b-button>
          </div>
        </section>
        <div class="footer">
          <b-button @click="$bvModal.hide('create-sensor-type-modal')">Cancel</b-button>
          <b-button>Save</b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      section: 1,
      name: '',
      description: '',
      newMetadataCount: 1,
      newParameterCount: 1
    }
  },
  methods: {
    addNewMetadata () {
      this.newMetadataCount++
    },
    addNewParameter () {
      this.newParameterCount++
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-sensor-type {
    margin: 0;
    min-height: 400px;
    .left-panel {
      padding: 20px;
      border-right: 1px solid #f3f3f3;
      .sections {
        padding-top: 30px;
        padding-left: 0;
        margin-bottom: 0;
        li.item {
          list-style: none;
          font-size: 18px;
          cursor: pointer;
          height: 60px;
          display: flex;
          align-items: center;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          margin-bottom: 20px;
          color: black;
          &.active {
            font-weight: 700;
          }
        }
      }
    }
    .right-panel {
      padding: 20px;
      h3 {
        font-weight: 600;
        margin-bottom: 30px;
      }
      .footer {
        position: absolute;
        text-align: right;
        right: 20px;
        bottom: 20px;
      }
      .metadata-group {
        margin-bottom: 45px;
        .horizontal-form {
          .name {
            width: 40%;
            margin-right: 5px;
          }
          .data-type {
            width: 30%;
            margin-right: 5px;
          }
          .unit {
            width: 20%;
          }
        }
        .add-new-row {
          display: flex;
          align-items: center;
          padding: 0;
          border: none;
          .icon {
            width: 24px;
            height: 24px;
            fill: #60C977;
          }
          .text {
            font-size: 15px;
            padding-left: 5px;
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  #create-sensor-type-modal {
    .modal-body {
      padding: 0;
      .right-panel {
        .horizontal-form {
          fieldset {
            display: inline-block;
          }
        }
      }
    }
  }
</style>
