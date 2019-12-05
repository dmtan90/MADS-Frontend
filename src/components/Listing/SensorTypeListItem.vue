<template>
    <b-card @click.prevent="toggleItem($event,data.id)" :class="{'d-flex flex-row':true,'active' : selectedItems.includes(data.id)}" no-body>
        <div class="pl-2 d-flex flex-grow-1 min-width-zero">
            <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <p class="list-item-heading mb-1 truncate w-10 w-sm-100">{{data.name}}</p>
                <p class="mb-1 text-muted text-small w-15 w-sm-100">{{data.make}}</p>
                <p class="mb-1 text-muted text-small w-15 w-sm-100">{{data.identifier}}</p>
                <!-- <div class="w-35 w-sm-100">
                   <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge> <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge> <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge>
                </div> -->
            </div>
        </div>
    </b-card>
</template>
<script>
export default {
  props: ['data', 'selectedItems'],
  data () {
    return {}
  },
  methods: {
    toggleItem (event, itemId) {
      this.$emit('toggle-item', event, itemId)
    }
  }
}
</script>
