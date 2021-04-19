import { configure, makeAutoObservable } from 'mobx'

import { todosService } from '../../services/todos.service'
import { iTodo } from 'types'

configure({ enforceActions: 'observed' })
export class TodosStore {
   constructor() {
      makeAutoObservable(this)
   }

   todos: iTodo[] = []
   todoId: string | null = null
   error = ''

   get selectedTodo(): iTodo | undefined {
      return this.todos.find(item => item.id === this.todoId)
   }

   setSelectedTodo = (value: string | null) => {
      this.todoId = value
   }

   fetchTodos = async () => {
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

   addTodo = async (title: string) => {
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

   editTodo = async (todo: iTodo) => {
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

   removeTodo = async (id: string) => {
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

export const todosStore = new TodosStore()