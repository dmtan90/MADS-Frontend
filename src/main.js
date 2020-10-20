import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/locales/en.json'
import es from '@/locales/es.json'

import router from '@/router'
import store from '@/store'
import { defaultLocale, localeOptions, apiUrl } from '@/constants/config'

/* ASSETS -begin */
import '@/assets/css/vendor/dropzone.min.css'
import '@/assets/css/vendor/bootstrap.min.css'
import '@/assets/css/sass/themes/piaf.light.green.scss'
/* ASSETS -end */

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Notifications from '@/components/Common/Notification'
import Breadcrumb from '@/components/Common/Breadcrumb'
import RefreshButton from '@/components/Common/RefreshButton'
import Colxx from '@/components/Common/Colxx'
import vuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueKonva from 'vue-konva'
import VTooltip from 'v-tooltip'
import ToggleButton from 'vue-js-toggle-button'
import VueEasyCm from 'vue-easycm'
import _ from 'lodash'
import Multiselect from 'vue-multiselect'
import * as moment from 'moment-timezone'
import Vue2OrgTree from 'vue2-org-tree'
import HighchartsVue from 'highcharts-vue'
import VueCarousel from 'vue-carousel'
import VueToast from 'vue-toast-notification'
import Loading from 'vue-loading-overlay'
import VueClipboard from 'vue-clipboard2'

// import 'vue-tree-halower/dist/halower-tree.min.css' // you can customize the style of the tree
// import VTree from 'vue-tree-halower'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import 'vue-loading-overlay/dist/vue-loading.css'

/* SERVICE -begin */
import ApiService from '@/services/api.service'
import TokenService from '@/services/token.service'
/* SERVICE -end */

/* OPTINAL -begin */
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import 'c3/c3.min.css'
/* OPTINAL -end */
import App from '@/App'

Vue.use(VueKonva)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueI18n)
Vue.use(VTooltip)
Vue.use(VueEasyCm)
Vue.use(ToggleButton)
Vue.component('multiselect', Multiselect)
// Vue.use(VTree)
Vue.use(Vue2OrgTree)
Vue.use(HighchartsVue)
Vue.use(VueCarousel)
Vue.use(VueToast, {
  position: 'top-right'
})
Vue.use(Loading, {
  loader: 'bars',
  color: '#ffffff',
  backgroundColor: '#000000'
})
Vue.use(VueClipboard)

Object.defineProperty(Vue.prototype, '$_', { value: _ })
Object.defineProperty(Vue.prototype, '$moment', { value: moment })

// This is required so highcharts will be able to find moment object
window.moment = moment

// Set the base URL of the API
// process.env.VUE_APP_ROOT_API
ApiService.init(apiUrl)

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

const messages = { en: en, es: es }
const locale = (localStorage.getItem('currentLanguage') && localeOptions.filter(x => x.id === localStorage.getItem('currentLanguage')).length > 0) ? localStorage.getItem('currentLanguage') : defaultLocale
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'en',
  messages
})

Vue.use(Notifications)
Vue.component('piaf-breadcrumb', Breadcrumb)
Vue.component('b-refresh-button', RefreshButton)
Vue.component('b-colxx', Colxx)
Vue.component('vue-perfect-scrollbar', vuePerfectScrollbar)

/* OPTINAL -begin */
Vue.use(require('vue-shortkey'))
Vue.use(VCalendar, {
  firstDayOfWeek: 2, // ...other defaults,
  formats: {
    title: 'MMM YY',
    weekdays: 'WW',
    navMonths: 'MMMM',
    input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    dayPopover: 'L'
  },
  datePickerShowDayPopover: false,
  popoverExpanded: true,
  popoverDirection: 'bottom'
})
/* OPTINAL -end  */

export default new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
