import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import baseinfoset from './modules/baseinfoset';
import user from './modules/user'
import permission  from './modules/permission';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    baseinfoset,
    permission
  },
  getters
})

export default store
