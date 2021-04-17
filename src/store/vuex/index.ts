import Vue from 'vue'
import Vuex from 'vuex'
import { extractVuexModule, createProxy } from 'vuex-class-component'

import { TodosStore } from './todos.store'

Vue.use(Vuex)

export const store = new Vuex.Store({
   strict: process.env.NODE_ENV != 'production',
   modules: {
      ...extractVuexModule(TodosStore)
   }
})

export const vxm = {
   todos: createProxy(store, TodosStore)
}