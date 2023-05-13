import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'
import { createStore } from 'vuex'
export default createStore({
  plugins: [createPersistedState()],
  modules: {
  auth
},
})/*
export default createStore({
   
  modules: {
  }
})*/
