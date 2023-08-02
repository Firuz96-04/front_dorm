import { createApp } from 'vue'

import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import '../src/assets/styles/style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faUsers, faGlobe, faBuilding, faDoorClosed,
     faCertificate, faLandmark, faHouse, faUserPlus } from '@fortawesome/free-solid-svg-icons'

library.add([faUserSecret, faUsers, faGlobe, faBuilding,
            faDoorClosed, faCertificate, faLandmark, faHouse, faUserPlus])

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(Antd)
app.component('font-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
