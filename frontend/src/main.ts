import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import ja from 'element-plus/dist/locale/ja.mjs'
import '@/../node_modules/element-plus/dist/index.css'

const app = createApp(App)

app.use(router)

app.use(ElementPlus, {
  locale: ja
})

app.mount('#app')
