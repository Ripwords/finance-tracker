import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue'
import App from './App.vue'
import router from './router'
import 'virtual:windi.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyBmWNhyqv6NW3Vv09THGJ7EXjLw07OEUuU",
  authDomain: "finance-tracker-7450f.firebaseapp.com",
  projectId: "finance-tracker-7450f",
  storageBucket: "finance-tracker-7450f.appspot.com",
  messagingSenderId: "1076280977554",
  appId: "1:1076280977554:web:e1902fa6af962af2a59e4b",
  measurementId: "G-BLXE1RTZW2"
}

initializeApp(firebaseConfig)

const pinia = createPinia()
const app = createApp(App)
  .use(IonicVue)
  .use(pinia)
  .use(router)

router.isReady().then(() => {
  app.mount("#app")
})