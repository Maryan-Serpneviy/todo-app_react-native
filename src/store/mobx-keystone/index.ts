import {
   setGlobalConfig,
   ModelAutoTypeCheckingMode,
   registerRootStore,
   connectReduxDevTools
} from 'mobx-keystone'

import { TodosStore } from './todos'

setGlobalConfig({
  modelAutoTypeChecking: ModelAutoTypeCheckingMode.AlwaysOn
})

export function createRootStore(): TodosStore {
   const rootStore = new TodosStore({
      todos: []
   })
 
   // although not strictly required, it is always a good idea to register your root stores
   // as such, since this allows the model hook `onAttachedToRootStore` to work and other goodies
   registerRootStore(rootStore)
 
   const remotedev = require("remotedev")
   const connection = remotedev.connectViaExtension({
     name: "Todo List Example",
   })
 
   connectReduxDevTools(remotedev, connection, rootStore)
 
   return rootStore
}