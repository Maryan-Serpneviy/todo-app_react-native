import { createModule, mutation, action } from 'vuex-class-component'

import { iTodo } from 'types'

const VuexModule = createModule({
   strict: true
})

export class TodosStore extends VuexModule {
   todos: iTodo[] = []
   todoId: string | null = null

   /* MUTATIONS */
   @mutation ADD_TODO(title: string) {
      const newTodo = {
         id: String(Date.now()),
         title
      }
      this.todos.unshift(newTodo)
   }

   @mutation EDIT_TODO(todo: iTodo) {
      const targetTodo = this.todos.find(item => item.id === todo.id)
      if (targetTodo) targetTodo.title = todo.title
      this.todos = [...this.todos]
   }
   
   @mutation REMOVE_TODO(id: string) {
      this.todoId = null
      this.todos = this.todos.filter(item => item.id !== id)
   }

   /* ACTIONS */
   @action async addTodo(payload: string): Promise<iTodo[]> {
      this.ADD_TODO(payload)
      return this.todos
   }

   @action async editTodo(payload: iTodo): Promise<iTodo[]> {
      this.EDIT_TODO(payload)
      return this.todos
   }

   @action async removeTodo(payload: string): Promise<iTodo[]> {
      this.REMOVE_TODO(payload)
      return this.todos
   }
}