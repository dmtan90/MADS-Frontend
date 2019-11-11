<template>
  <b-colxx class="disable-text-selection">
    <b-row>
      <b-colxx xxs="12">
        <h1>{{ $t('menu.sensor-type') }}</h1>
        <div class="float-sm-right">
          <b-button
            v-b-modal.modalright
            variant="primary"
            size="lg"
          >{{ $t('pages.add-new') }}</b-button>

          <b-modal
            id="modalright"
            ref="modalright"
            :title="$t('New Sensor Type')"
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
        <piaf-breadcrumb/>
        <div class="mb-2 mt-2">
          <b-button
            variant="empty"
            class="pt-0 pl-0 d-inline-block d-md-none"
            v-b-toggle.displayOptions
          >
            {{ $t('More Options') }}
            <i class="simple-icon-arrow-down align-middle"/>
          </b-button>
          <b-collapse id="displayOptions" class="d-md-block">
            <!-- <span class="mr-3 mb-2 d-inline-block float-md-left">
              <a
                :class="{'mr-2 view-icon':true,'active': displayMode==='list'}"
                @click="changeDisplayMode('list')"
              >
                <data-list-icon/>
              </a>
              <a
                :class="{'mr-2 view-icon':true,'active': displayMode==='thumb'}"
                @click="changeDisplayMode('thumb')"
              >
                <thumb-list-icon/>
              </a>
              <a
                :class="{'mr-2 view-icon':true,'active': displayMode==='image'}"
                @click="changeDisplayMode('image')"
              >
                <image-list-icon/>
              </a>
            </span> -->
            <div class="d-block d-sm-inline-block mb-2">
              <b-dropdown
                id="ddown1"
                :text="`${$t('pages.orderby')} ${sort.label}`"
                variant="outline-dark"
                class="mr-1 float-md-left btn-group"
                size="xs"
              >
                <b-dropdown-item
                  v-for="(order,index) in sortOptions"
                  :key="index"
                  @click="changeOrderBy(order)"
                >{{ order.label }}</b-dropdown-item>
              </b-dropdown>

              <div class="search-sm d-inline-block float-md-left mr-1 align-top">
                <b-input :placeholder="$t('menu.search')" v-model="search"/>
              </div>
            </div>
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
        </div>
        <div class="separator mb-5"/>
      </b-colxx>
    </b-row>
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
          <data-list-item
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
          <b-pagination-nav
            :number-of-pages="lastPage"
            :link-gen="linkGen"
            v-model="page"
            :per-page="perPage"
            align="center"
          >
            <template v-slot:next-text>
              <i class="simple-icon-arrow-right"/>
            </template>
            <template v-slot:prev-text>
              <i class="simple-icon-arrow-left"/>
            </template>
            <template v-slot:first-text>
              <i class="simple-icon-control-start"/>
            </template>
            <template v-slot:last-text>
              <i class="simple-icon-control-end"/>
            </template>
          </b-pagination-nav>
        </b-colxx>
      </b-row>
    </template>
    <template v-else>
      <div class="loading"></div>
    </template>
    <v-contextmenu ref="contextmenu" @contextmenu="handleContextmenu">
      <v-contextmenu-item @click="onContextCopy()">
        <i class="simple-icon-docs"/>
        <span>Copy</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextArchive()">
        <i class="simple-icon-drawer"/>
        <span>Move to archive</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextDelete()">
        <i class="simple-icon-trash"/>
        <span>Delete</span>
      </v-contextmenu-item>
    </v-contextmenu>
  </b-colxx>
</template>
<script>
import { DataListIcon, ThumbListIcon, ImageListIcon } from '@/components/Svg'
import vSelect from 'vue-select'
import InputTag from '@/components/Form/InputTag'
import axios from 'axios'

import ImageListItem from '@/components/Listing/ImageListItem'
import ThumbListItem from '@/components/Listing/ThumbListItem'
import DataListItem from '@/components/Listing/DataListItem'
import { apiUrl } from '@/constants/config'

export default {
  components: {
    DataListIcon,
    ThumbListIcon,
    ImageListIcon,
    vSelect,
    InputTag,
    ImageListItem,
    ThumbListItem,
    DataListItem
  },
  data () {
    return {
      isLoad: false,
      apiBase: apiUrl + '/cakes/fordatatable',
      displayMode: 'list',
      sort: { column: 'title', label: 'Date' },
      sortOptions: [
        { column: 'title', label: 'Name' },
        { column: 'category', label: 'Identifier' }
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
      categories: [
        { label: 'Cakes', value: 'Cakes' },
        { label: 'Cupcakes', value: 'Cupcakes' },
        { label: 'Desserts', value: 'Desserts' }
      ],
      statuses: [
        { text: 'ON HOLD', value: 'ON HOLD' },
        { text: 'PROCESSED', value: 'PROCESSED' }
      ],
      newItem: {
        title: '',
        category: '',
        description: '',
        status: ''
      }
    }
  },
  methods: {
    loadItems () {
      this.isLoad = false

      axios
        .get('http://5dad77e9c7e88c0014aa2a45.mockapi.io/sensortype')
        .then(response => {
          console.log(response.data[0])
          return response.data[0]
        })
        .then(res => {
          this.total = res.total
          this.from = res.from
          this.to = res.to
          this.items = res.data
          this.perPage = res.per_page
          this.selectedItems = []
          this.lastPage = res.last_page
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
    },
    changeOrderBy (sort) {
      this.sort = sort
    },
    addNewItem () {
      console.log('adding item : ', this.newItem)
      axios
        .post('http://5dad77e9c7e88c0014aa2a45.mockapi.io/users/1/sensors', this.newItem)
        .then(response => {
          console.log(response)
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
    onContextCopy () {
      console.log(
        'context menu item clicked - Copy Items: ',
        this.selectedItems
      )
    },
    onContextArchive () {
      console.log(
        'context menu item clicked - Move to Archive Items: ',
        this.selectedItems
      )
    },
    onContextDelete () {
      console.log(
        'context menu item clicked - Delete Items: ',
        this.selectedItems
      )
    },
    linkGen (pageNum) {
      return '#page-' + pageNum
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
    },
    apiUrl () {
      return `${this.apiBase}?sort=${this.sort.column}&page=${
        this.page
      }&per_page=${this.perPage}&search=${this.search}`
    }
  },
  watch: {
    search () {
      this.page = 1
    },
    apiUrl () {
      this.loadItems()
    }
  },
  mounted () {
    this.loadItems()
  }
}
</script>
