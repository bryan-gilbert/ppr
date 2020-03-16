import Vue, { VNode } from 'vue'
import VueRouter from 'vue-router'
import VueCompositionApi from '@vue/composition-api'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from '@/App.vue'
import router from '@/router/router'
import store from './store'
import layoutPublic from '@/layouts/LayoutPublic.vue'
import layoutUser from '@/layouts/LayoutUser.vue'
import SentryHelper from '@/utils/sentry-helper'
import './assets/styles/styles.scss'
import Config from '@/utils/config'
import { initializeVueLdClient } from '@/flags/ld-client'
import { getJwtValue } from './utils/auth-helper'

const opts = { iconfont: 'mdi' }

Vue.use(VueCompositionApi)
Vue.use(Vuetify)
Vue.use(VueRouter)

Vue.config.productionTip = false
Vue.component('public-layout', layoutPublic)
Vue.component('user-layout', layoutUser)

const tk = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJUbWdtZUk0MnVsdUZ0N3FQbmUtcTEzdDUwa0JDbjF3bHF6dHN0UGdUM1dFIn0.eyJqdGkiOiIxNzgzMmVkYS05MWIxLTRhZDQtYWE2OC05ZDZlZjFjYWM3MzMiLCJleHAiOjE1ODQxNjgyNDAsIm5iZiI6MCwiaWF0IjoxNTg0MTM5NDQwLCJpc3MiOiJodHRwczovL3Nzby1kZXYucGF0aGZpbmRlci5nb3YuYmMuY2EvYXV0aC9yZWFsbXMvZmNmMGtwcXIiLCJhdWQiOlsic2JjLWF1dGgtd2ViIiwiYWNjb3VudCJdLCJzdWIiOiIwOTNkODNkZC02OTU2LTQ1Y2EtODg5Zi0xN2UzYjFiYmU2NmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzYmMtYXV0aC13ZWIiLCJub25jZSI6IjRiMjM3NjY0LWVjM2UtNDI4MS04NjNjLTg3YzhkYWY2ODg3MyIsImF1dGhfdGltZSI6MTU4NDEzOTQzOCwic2Vzc2lvbl9zdGF0ZSI6IjI4NzdhNWI1LTE4MTItNGVmMC04MjFhLTJlNGRkNjI3NDlmNiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovLzE5Mi4xNjguMC4xMzo4MDgwLyIsImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8qIiwiMTkyLjE2OC4wLjEzIiwiaHR0cDovL2xvY2FsaG9zdDo0MjAwLyoiLCIqIiwiaHR0cDovLzE5Mi4xNjguMC4xMzo4MDgwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJwdWJsaWNfdXNlciIsImVkaXQiLCJhY2NvdW50X2hvbGRlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCIsImZpcnN0bmFtZSI6IkJDUkVHVEVTVCBEYWxpYSIsInJvbGVzIjpbInB1YmxpY191c2VyIiwiZWRpdCIsImFjY291bnRfaG9sZGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdLCJuYW1lIjoiQkNSRUdURVNUIERhbGlhIE9ORSIsInByZWZlcnJlZF91c2VybmFtZSI6ImJjc2MvYmhndjUyNWNhYW82dWpqdnF2YzdycWhzMmVlYTJvZDMiLCJsb2dpblNvdXJjZSI6IkJDU0MiLCJsYXN0bmFtZSI6Ik9ORSIsInVzZXJuYW1lIjoiYmNzYy9iaGd2NTI1Y2FhbzZ1amp2cXZjN3JxaHMyZWVhMm9kMyJ9.fft_zFq-0eDDNX2GwbCnFavsBbL_yvUYnOMnDBRWoode2r6VJ_g-Q6jjP_H7bQbwQTJCKklReuw1euRoaS0ESo_43tvkccKszWD1Mq0K-JSACrTqFuDLzAKMpRdi82AmKHLwYqo6IMHiO--FzsTjkQ4WrKl2IaljvkAdbyPm9wbF6dbfDktkCptXoYukibjGncxET_W2L3dazOxWjPjh-5kszHEvRVqUisDQTgmeLlujfB-jFxtgZ06FJ4XuYzBteKqVEJvtcL3o2yvd8dMgn_sB_5rOK6uNlS7C4wDarDC1eTHzIHHZZQVKYyHfk-5lPqs-i4WSPMUKaDQIbnnW_g'
sessionStorage.setItem('KEYCLOAK_TOKEN', tk)
console.log('tk', tk)


Config.setup()
  .then((): void => {
    return SentryHelper.setup(Config.sentryDSN, Config.sentryEnvironment)
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  }).then(() => {
    return initializeVueLdClient(Config.launchDarklyClientKey, getJwtValue('username'))
  })
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  .then(() => {
    new Vue({
      vuetify: new Vuetify(opts),
      router,
      store,
      render: (h): VNode => h(App)
    }).$mount('#app')
  })
  .catch((error): void => {
    console.error('error fetching config -', error)
    alert('Fatal error loading app')
  })
