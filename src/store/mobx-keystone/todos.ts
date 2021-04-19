import { model, modelAction, Model, prop } from 'mobx-keystone'
import { iTodo } from 'types'

@model('todos')
export class TodosStore extends Model({
   todos: prop<iTodo[]>(),
   todoId: prop<string | null>(null)
}) {

   @modelAction
   addTodo(title: string) {
      const newTodo = {
        id: String(Date.now()),
        title,
      }
      this.todos.unshift(newTodo)
    }

   @modelAction
   removeTodo(id: string) {
      this.todoId = null
      this.todos = this.todos.filter(item => item.id !== id)
   }

   @modelAction
   editTodo(todo: iTodo) {
      const targetTodo = this.todos.find(item => item.id === todo.id)
      if (targetTodo) targetTodo.title = todo.title
      this.todos = [...this.todos]
   }
}

export const todosStore = new TodosStore({
   todos: []
})