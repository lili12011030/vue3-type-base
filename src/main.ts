import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {ElMessage,ElAlert} from 'element-plus'

const app = createApp(App)
app.provide('$message', ElMessage)
app.provide('$alert', ElAlert)


app.use(ElementPlus).use(store).use(router).mount('#app')
