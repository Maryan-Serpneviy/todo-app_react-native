import { createModule, getter, mutation, action } from 'vuex-class-component'

import { todosService } from '../../services/todos.service'
import { iTodo } from 'types'

const VuexModule = createModule({
   strict: true
})

export class TodosStore extends VuexModule {
   /* DATA */
   todos: iTodo[] = []
   todoId: string | null = null
   error = ''

   /* GETTERS */
   @getter selectedTodo(): iTodo | undefined {
      return this.todos.find(item => item.id === this.todoId)
   }

   /* MUTATIONS */
   @mutation SET_TODOS(payload: Array<{[key: string]: { title: string }}>)  {
      this.todos = Object.keys(payload).map(key => ({ ...payload[key], id: key }))
   }

   @mutation SET_ERROR(error: string) {
      this.error = error
   }

   @mutation SET_SELECTED_TODO(value: string | null) {
      this.todoId = value
   }

   @mutation ADD_TODO(payload: { id: string, title: string }) {
      this.todos.unshift(payload)
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
   @action async fetchTodos() {
      try {
         const data = await todosService.get()
         if (data) {
            this.SET_TODOS(data)
         }
      } catch (error) {
         console.error(error)
         this.SET_ERROR('Failed to get todos')
      }
   }

   @action async addTodo(payload: string) {
      try {
         const data = await todosService.post({ title: payload })
         if (data) {
            this.ADD_TODO({
               id: data.name,
               title: payload   
            })
         }
      } catch (error) {
         console.error(error)
         this.SET_ERROR('Failed to add todo')
      }
   }

   @action async editTodo(payload: iTodo) {
      try {
         await todosService.patch(payload.id, { title: payload.title })
         this.EDIT_TODO(payload)
      } catch (error) {
         console.error(error)
         this.SET_ERROR('Failed to update todo')
      }
   }

   @action async removeTodo(payload: string) {
      try {
         await todosService.delete(payload)
         this.REMOVE_TODO(payload)
      } catch (error) {
         console.error(error)
         this.SET_ERROR('Failed to delete todo')
      }
   }
}