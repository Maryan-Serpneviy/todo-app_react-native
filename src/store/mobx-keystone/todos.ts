import { model, modelAction, Model, prop } from 'mobx-keystone'

import { todosService } from '../../services/todos.service'
import { iTodo } from 'types'

@model('todos')
export class TodosStore extends Model({
   todos: prop<iTodo[]>(),
   todoId: prop<string | null>(null),
   error: prop<string>('')
}) {

   get selectedTodo(): iTodo | undefined {
      return this.todos.find(item => item.id === this.todoId)
   }

   @modelAction
   setSelectedTodo(value: string) {
      this.todoId = value
   }

   @modelAction
   async fetchTodos() {
      try {
         const data = await todosService.get()
         if (data) {
            this.todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
         }
      } catch (error) {
         console.error(error)
         this.error = 'Failed to get todos'
      }
   }

   @modelAction
   async addTodo(title: string) {
      try {
         const data = await todosService.post({ title })
         if (data) {
            const newTodo = {
               id: data.name,
               title
            }
            this.todos.unshift(newTodo)
         }
      } catch (error) {
         console.error(error)
         this.error = 'Failed to add todo'
      }
   }

   @modelAction
   async editTodo(todo: iTodo) {
      try {
         await todosService.patch(todo.id, { title: todo.title })
         const targetTodo = this.todos.find(item => item.id === todo.id)
         if (targetTodo) targetTodo.title = todo.title
         this.todos = [...this.todos]
      } catch (error) {
         console.error(error)
         this.error = 'Failed to update todo'
      }
   }

   @modelAction
   async removeTodo(id: string) {
      try {
         await todosService.delete(id)
         this.todoId = null
         this.todos = this.todos.filter(item => item.id !== id)
      } catch (error) {
         console.error(error)
         this.error = 'Failed to delete todo'
      }
   }
}

export const todosStore = new TodosStore({
   todos: []
})