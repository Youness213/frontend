/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import Vuex from 'vuex'
import store from './store'

const app = createApp(App).use(store)
app.use(Vuex)
app.component('VueDatePicker', VueDatePicker);

registerPlugins(app)

app.mount('#app')