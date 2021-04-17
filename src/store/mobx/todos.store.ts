import { configure, observable, computed, action } from 'mobx'

import { iTodo } from 'types'

configure({ enforceActions: 'observed' })
export class TodosStore {
   constructor() {
      this.setTodoId = this.setTodoId.bind(this)
      this.addTodo = this.addTodo.bind(this)
      this.editTodo = this.editTodo.bind(this)
      this.removeTodo = this.removeTodo.bind(this)
   }

   @observable todos: iTodo[] = []
   @observable todoId: string | null = null

   @computed get selectedTodo(): iTodo | undefined {
      return this.todos.find(item => item.id === this.todoId)
   }

   @action async setTodoId(value: string | null): Promise<void> {
      this.todoId = value
   }

   @action addTodo(title: string) {
      const newTodo = {
         id: String(Date.now()),
         title
      }
      this.todos.unshift(newTodo)
      console.log(this.todos.length)
   }

   @action async editTodo(todo: iTodo): Promise<void> {
      const targetTodo = this.todos.find(item => item.id === todo.id)
      if (targetTodo) targetTodo.title = todo.title
   }

   @action async removeTodo(id: string): Promise<void> {
      this.todoId = null
      this.todos = this.todos.filter(item => item.id !== id)
   }
}

export const todosStore = new TodosStore()