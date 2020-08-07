<template>
    <div class="alerts-rule">
        <div class="header">
            <button class="btn" @click="addAlertRules()">+ Add</button>
        </div>
        <vuetable
            ref="vuetable"
            :api-mode="false"
            :fields="fields"
            :data="data"
        >
        </vuetable>
        <add-edit-alert-rules ref="addEditAlertRules"></add-edit-alert-rules>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fields from './fieldsDef'
import { Vuetable } from 'vuetable-2'
import addEditAlertRules from './addEditAlertRules'

export default {
  components: {
    Vuetable,
    addEditAlertRules
  },
  data () {
    return {
        data:[],
        fields:fields
    }
  },
  methods: {
    addAlertRules(){
        this.$refs.addEditAlertRules.add()
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
    .alerts-rule{
        .header{
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }
    }
</style>
