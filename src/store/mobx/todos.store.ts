import { configure, makeAutoObservable } from 'mobx'
import { iTodo } from 'types'

configure({ enforceActions: 'observed' })
export class TodosStore {
   constructor() {
      makeAutoObservable(this)
   }

   todos: iTodo[] = []
   todoId: string | null = null

   get selectedTodo(): iTodo | undefined {
      return this.todos.find(item => item.id === this.todoId)
   }

   setSelectedTodo = (value: string | null) => {
      this.todoId = value
   }

   addTodo = (title: string) => {
      const newTodo = {
         id: String(Date.now()),
         title
      }
      this.todos.unshift(newTodo)
   }

   editTodo = (todo: iTodo) => {
      const targetTodo = this.todos.find(item => item.id === todo.id)
      if (targetTodo) targetTodo.title = todo.title
      this.todos = [...this.todos]
   }

   removeTodo = (id: string) => {
      this.todoId = null
      this.todos = this.todos.filter(item => item.id !== id)
   }
}

export const todosStore = new TodosStore()