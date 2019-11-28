<template>
  <b-colxx class="disable-text-selection">
    <b-row>
      <b-colxx xxs="12">
        <h1>{{ $t('menu.devices') }}</h1>
        <div class="float-sm-right">
          <b-button
            v-b-modal.addnew
            variant="primary"
            size="lg"
          >{{ $t('buttons.add-new') }}</b-button>
        </div>
        <piaf-breadcrumb/>
        <div class="mb-2 mt-2">
          <b-button
            variant="empty"
            class="pt-0 pl-0 d-inline-block d-md-none"
            v-b-toggle.displayOptions
          >
            {{ $t('buttons.more-options') }}
            <i class="simple-icon-arrow-down align-middle"/>
          </b-button>
        </div>
      </b-colxx>

      <b-colxx xxs="12">
        <b-collapse id="displayOptions" class="d-md-block">
          <div class="float-sm-right">
            <span class="text-muted text-small mr-1 mb-2">{{from}}-{{to}} of {{ total }}</span>
            <b-dropdown
              id="ddown2"
              right
              :text="`${perPage}`"
              variant="outline-dark"
              class="d-inline-block"
              size="xs"
            >
              <b-dropdown-item
                v-for="(size,index) in pageSizes"
                :key="index"
                @click="changePageSize(size)"
              >{{ size }}</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-collapse>
      </b-colxx>
    </b-row>
    <div class="separator mt-2 mb-5"/>

    <!-- LISTING -begin -->
    <template v-if="isLoad">
      <b-row v-if="displayMode==='image'" key="image">
        <b-colxx
          sm="6"
          lg="4"
          xl="3"
          class="mb-3"
          v-for="(item,index) in items"
          :key="index"
          :id="item.id"
        >
          <image-list-item
            :key="item.id"
            :data="item"
            :selected-items="selectedItems"
            @toggle-item="toggleItem"
            v-contextmenu:contextmenu
          />
        </b-colxx>
      </b-row>
      <b-row v-else-if="displayMode==='thumb'" key="thumb">
        <b-colxx xxs="12" class="mb-3" v-for="(item,index) in items" :key="index" :id="item.id">
          <thumb-list-item
            :key="item.id"
            :data="item"
            :selected-items="selectedItems"
            @toggle-item="toggleItem"
            v-contextmenu:contextmenu
          />
        </b-colxx>
      </b-row>
      <b-row v-else-if="displayMode==='list'" key="list">
        <b-colxx xxs="12" class="mb-3" v-for="(item,index) in items" :key="index" :id="item.id">
          <device-list-item
            :key="item.id"
            :data="item"
            :selected-items="selectedItems"
            @toggle-item="toggleItem"
            v-contextmenu:contextmenu
          />
        </b-colxx>
      </b-row>
      <b-row v-if="lastPage>1">
        <b-colxx xxs="12">
          <b-pagination
            v-model="page"
            :total-rows="total"
            :per-page="perPage"
            align="center"
          ></b-pagination>
        </b-colxx>
      </b-row>
    </template>
    <!-- LISTING -end -->

    <!-- LOADING -begin -->
    <template v-else>
      <div class="loading"></div>
    </template>
    <!-- LOADING -end -->

    <!-- RIGHTCLICK -begin -->
    <v-contextmenu ref="contextmenu" @contextmenu="handleContextmenu">
      <v-contextmenu-item @click="onContextEdit()">
        <i class="simple-icon-pencil"/>
        <span>Edit</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextDelete()">
        <i class="simple-icon-trash"/>
        <span>Delete</span>
      </v-contextmenu-item>
    </v-contextmenu>
    <!-- RIGHTCLICK -end -->

    <!-- MODAL -begin -->
    <b-modal id="addnew" ref="addnew" :title="$t('devices.add')" class="add-new" centered>
      <b-form>
        <b-form-group :label="$t('devices.name')">
          <b-form-input v-model="newItem.name" :placeholder="$t('devices.name')"/>
        </b-form-group>
        <b-form-group :label="$t('devices.access_token')">
          <b-form-input v-model="newItem.access_token" :placeholder="$t('devices.access_token')"/>
        </b-form-group>
        <b-form-group :label="$t('devices.description')">
          <b-form-input v-model="newItem.description" :placeholder="$t('devices.description')"/>
        </b-form-group>
      </b-form>

      <template slot="modal-footer">
        <b-button
          variant="outline-secondary"
          @click="hideModal('addnew')"
        >{{ $t('buttons.cancel') }}</b-button>
        <b-button
          variant="primary"
          @click="addNewItem()"
          class="mr-1"
        >{{ $t('buttons.submit') }}</b-button>
      </template>
    </b-modal>

    <b-modal id="delete" ref="delete" :title="'DELETE'" centered>
      <p class="my-4">You are about to delete an item. Are you sure?</p>
      <template slot="modal-footer">
        <b-button
          variant="outline-secondary"
          @click="hideModal('delete')"
        >{{ $t('buttons.cancel') }}</b-button>
        <b-button
          variant="danger"
          @click="deleteItem()"
          class="mr-1"
        >{{ $t('buttons.delete') }}</b-button>
      </template>
    </b-modal>

    <b-modal id="edit" ref="edit" :title="$t('devices.edit')" centered>
      <b-form>
        <b-form-group :label="$t('devices.name')">
          <b-form-input v-model="editItem.name" :placeholder="$t('devices.name')"/>
        </b-form-group>
        <b-form-group :label="$t('devices.access_token')">
          <b-form-input v-model="editItem.access_token" :placeholder="$t('devices.access_token')"/>
        </b-form-group>
        <b-form-group :label="$t('devices.description')">
          <b-form-input v-model="editItem.description" :placeholder="$t('devices.description')"/>
        </b-form-group>
      </b-form>

      <template slot="modal-footer">
        <b-button
          variant="outline-secondary"
          @click="hideModal('edit')"
        >{{ $t('Cancel') }}</b-button>
        <b-button
          variant="primary"
          @click="editAnItem()"
          class="mr-1"
        >{{ $t('Submit') }}</b-button>
      </template>
    </b-modal>
    <!-- MODAL -end -->
  </b-colxx>
</template>

<script>
import devices from '@/services/devices.service'

import ImageListItem from '@/components/Listing/ImageListItem'
import ThumbListItem from '@/components/Listing/ThumbListItem'
import DeviceListItem from '@/components/Listing/DeviceListItem'

export default {
  components: {
    ImageListItem,
    ThumbListItem,
    DeviceListItem
  },
  data () {
    return {
      isLoad: false,
      displayMode: 'list',
      sort: { column: 'name', label: 'Name' },
      sortOptions: [
        { column: 'name', label: 'Name' },
        { column: 'identifier', label: 'Identifier' }
      ],
      page: 1,
      perPage: 4,
      search: '',
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      pageSizes: [4, 8, 12],
      selectedItems: [],
      newItem: {},
      editItem: {}
    }
  },
  methods: {
    loadItems (pageNum) {
      this.isLoad = false
      let params = {
        page_size: this.perPage,
        page_number: pageNum
      }

      devices.read(params).then(response => {
        this.total = response.total_entries
        this.lastPage = response.total_pages
        this.from = response.page_size * response.page_number - (response.page_size - 1)
        this.to = response.page_size * response.page_number
        this.perPage = response.page_size
        this.items = response.devices
        this.selectedItems = []
        this.isLoad = true
      })
    },
    hideModal (refname) {
      this.$refs[refname].hide()
    },
    changeDisplayMode (displayType) {
      this.displayMode = displayType
    },
    changePageSize (perPage) {
      this.perPage = perPage
      this.loadItems()
    },
    changeOrderBy (sort) {
      this.sort = sort
    },
    addNewItem () {
      devices.create(this.newItem).then(response => {
        this.items.push(response)
        this.newItem = {}
        this.$refs['addnew'].hide()
      })
    },
    deleteItem () {
      let id = this.selectedItems[0]
      devices.delete(id).then(response => {
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].id === id) {
            this.items.splice(i, 1)
            i--
            this.$refs['delete'].hide()
            return
          }
        }
      })
    },
    editAnItem () {
      let id = this.selectedItems[0]
      devices.update(id, this.editItem).then(response => {
        this.loadItems(this.page)
        this.editItem = {}
        this.$refs['edit'].hide()
      })
    },
    selectAll (isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = []
      } else {
        this.selectedItems = this.items.map(x => x.id)
      }
    },
    keymap (event) {
      switch (event.srcKey) {
        case 'select':
          this.selectAll(false)
          break
        case 'undo':
          this.selectedItems = []
          break
      }
    },
    getIndex (value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i
        }
      }
      return -1
    },
    toggleItem (event, itemId) {
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.items
        var start = this.getIndex(itemId, itemsForToggle, 'id')
        var end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          'id'
        )
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        )
        this.selectedItems.push(
          ...itemsForToggle.map(item => {
            return item.id
          })
        )
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter(x => x !== itemId)
        } else this.selectedItems.push(itemId)
      }
    },
    handleContextmenu (vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key]
      }
    },
    onContextEdit () {
      this.$refs['edit'].show()
      let id = this.selectedItems[0]
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
          this.editItem = {
            name: this.items[i].name,
            access_token: this.items[i].access_token,
            description: this.items[i].description
          }
          i--
          return
        }
      }
    },
    onContextDelete () {
      this.$refs['delete'].show()
    }
  },
  computed: {
    isSelectedAll () {
      return this.selectedItems.length >= this.items.length
    },
    isAnyItemSelected () {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      )
    }
  },
  watch: {
    search () {
      this.page = 1
    },
    page (value) {
      this.loadItems(value)
    }
  },
  mounted () {
    this.loadItems()
  }
}
</script>
