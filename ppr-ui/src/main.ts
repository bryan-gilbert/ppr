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

const tk = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJUbWdtZUk0MnVsdUZ0N3FQbmUtcTEzdDUwa0JDbjF3bHF6dHN0UGdUM1dFIn0.eyJqdGkiOiJmY2M3YTU5MC00MDcwLTQzMDAtOTliNy0yMjg3M2RiMjg1NTEiLCJleHAiOjE1ODMyODMwNTEsIm5iZiI6MCwiaWF0IjoxNTgzMjU0MjUxLCJpc3MiOiJodHRwczovL3Nzby1kZXYucGF0aGZpbmRlci5nb3YuYmMuY2EvYXV0aC9yZWFsbXMvZmNmMGtwcXIiLCJhdWQiOlsic2JjLWF1dGgtd2ViIiwiYWNjb3VudCJdLCJzdWIiOiIwOTNkODNkZC02OTU2LTQ1Y2EtODg5Zi0xN2UzYjFiYmU2NmMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzYmMtYXV0aC13ZWIiLCJub25jZSI6IjgzODFhOWU3LThlOTgtNDM3Ny04ZmY4LWM4MDUyNjU0YzEwYyIsImF1dGhfdGltZSI6MTU4MzI1NDI0OSwic2Vzc2lvbl9zdGF0ZSI6IjZmOWFhYmU3LTU1ZGItNGE3MS1iYmU3LWE3MDIzNWRhOTU5NiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovLzE5Mi4xNjguMC4xMzo4MDgwLyIsImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8qIiwiMTkyLjE2OC4wLjEzIiwiaHR0cDovL2xvY2FsaG9zdDo0MjAwLyoiLCIqIiwiaHR0cDovLzE5Mi4xNjguMC4xMzo4MDgwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJwdWJsaWNfdXNlciIsImVkaXQiLCJhY2NvdW50X2hvbGRlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCIsImZpcnN0bmFtZSI6IkJDUkVHVEVTVCBEYWxpYSIsInJvbGVzIjpbInB1YmxpY191c2VyIiwiZWRpdCIsImFjY291bnRfaG9sZGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdLCJuYW1lIjoiQkNSRUdURVNUIERhbGlhIE9ORSIsInByZWZlcnJlZF91c2VybmFtZSI6ImJjc2MvYmhndjUyNWNhYW82dWpqdnF2YzdycWhzMmVlYTJvZDMiLCJsb2dpblNvdXJjZSI6IkJDU0MiLCJsYXN0bmFtZSI6Ik9ORSIsInVzZXJuYW1lIjoiYmNzYy9iaGd2NTI1Y2FhbzZ1amp2cXZjN3JxaHMyZWVhMm9kMyJ9.LgfyAzmblA-yzhtAGOwBpef8CKN29_pv0C2PuY96BhfuU9YWJIfFeZDKT6TJSyFyLLYODooxpSgYWllxAuIc4Q9tyFt_vs5MFsCuB9ZWW4C1whL_6EFy3OZjbLf3Zez72oKG6vR5QJrYIr4ssCTNZJ1icwkcb0JcVQrEcepbBghMIC3t4XIndh_TMR5hi0coXOIy3CSquAUTGUv2VBxIu2xcfGMalu3Z9ngVcX6_cHqx9v5XlU9BuWSpW0CTt0B-HapSXV1jPpZV_RH7tjIwDegTrFzLngnEdd4Kr8pTQ7xSANLouOSUWOPx3Bp5S6c3RlXtn7vzdcrqUEEo43kgtw'
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
