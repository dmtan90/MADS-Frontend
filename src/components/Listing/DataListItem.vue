<template>
    <b-card @click.prevent="toggleItem($event,data.id)" :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.id)}" no-body>
        <div class="pl-2 d-flex flex-grow-1 min-width-zero">
            <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <router-link :to="`/app/device-configuration/devices/${data.id}`" class="w-20 w-sm-100">
                    <p class="list-item-heading mb-1 truncate">{{data.title}}</p>
                </router-link>
                <p class="mb-1 text-muted text-small w-15 w-sm-100">{{data.category}}</p>
                <p class="mb-1 text-muted text-small w-15 w-sm-100">{{data.date}}</p>
                <div class="w-35 w-sm-100">
                   <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge> <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge> <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge>
                </div>
            </div>
            <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <!-- <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0"/> -->
                <b-button v-b-modal.modaledit class="mb-2" size="xs" variant="outline-primary">{{ $t('Edit') }}</b-button>
                <b-button class="mb-2" size="xs" variant="outline-secondary">{{ $t('Delete') }}</b-button>

                <b-modal
                  id="`modaledit-${data.id}`"
                  ref="`modaledit-${data.id}`"
                  :title="$t('Edit Sensor Type')"
                  class="modal-right"
                >
                  <b-form>
                    <b-form-group :label="$t('Name')">
                      <b-form-input v-model="newItem.name" :placeholder="$t('Name')"/>
                    </b-form-group>
                    <b-form-group :label="$t('Description')">
                      <b-textarea v-model="newItem.description" :rows="2" :max-rows="2" :placeholder="$t('Description')"/>
                    </b-form-group>
                    <b-form-group :label="$t('Identifier')">
                      <b-form-input v-model="newItem.identifies" :placeholder="$t('Identifier')"/>
                      <!-- <v-select :options="categories" v-model="newItem.category"/> -->
                    </b-form-group>
                    <b-form-group :label="$t('Value Keys')">
                      <input-tag v-model="newItem.valueKeys" :placeholder="$t('Value Keys')"></input-tag>
                    </b-form-group>
                  </b-form>

                  <template slot="modal-footer">
                    <b-button
                      variant="outline-secondary"
                      @click="hideModal('modalright')"
                    >{{ $t('Cancel') }}</b-button>
                    <b-button
                      variant="primary"
                      @click="addNewItem()"
                      class="mr-1"
                    >{{ $t('Submit') }}</b-button>
                  </template>
                </b-modal>
            </div>
        </div>
    </b-card>
</template>
<script>
export default {
  props: ['data', 'selectedItems'],
  data () {
    return {
      newItem: {
        title: '',
        category: '',
        description: '',
        status: ''
      }
    }
  },
  methods: {
    toggleItem (event, itemId) {
      this.$emit('toggle-item', event, itemId)
    }
  }
}
</script>
