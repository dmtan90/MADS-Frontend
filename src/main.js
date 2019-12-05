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

import BootstrapVue from 'bootstrap-vue'
import Notifications from '@/components/Common/Notification'
import Breadcrumb from '@/components/Common/Breadcrumb'
import RefreshButton from '@/components/Common/RefreshButton'
import Colxx from '@/components/Common/Colxx'
import vuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueKonva from 'vue-konva'

/* SERVICE -begin */
import ApiService from '@/services/api.service'
import TokenService from '@/services/token.service'
/* SERVICE -end */

/* OPTINAL -begin */
import contentmenu from 'v-contextmenu'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
/* OPTINAL -end */
import App from '@/App'

Vue.use(VueKonva)
Vue.use(BootstrapVue)
Vue.use(VueI18n)

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
Vue.use(contentmenu)
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
