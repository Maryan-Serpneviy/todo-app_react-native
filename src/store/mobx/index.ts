import { configure } from 'mobx'
import { TodosStore } from './todos.store'

configure({ enforceActions: 'observed' })
export class RootStore {
   todos = new TodosStore()
}

export const rootStore = new RootStore()