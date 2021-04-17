import { iTodo } from 'types'

interface TodoProviderModel {
   todos: iTodo[]
   todoId?: null | string
   selectedTodo?: iTodo
   setSelectedTodo: (value: string | null) => void
   addTodo: (title: string) => void
   editTodo: (todo: iTodo) => void
   removeTodo: (id: string) => void
}

export const model: TodoProviderModel = {
   todos: [],
   todoId: null,
   selectedTodo: undefined,
   setSelectedTodo: (value: string | null) => undefined,
   addTodo: (title: string) => undefined,
   editTodo: (todo: iTodo) => undefined,
   removeTodo: (id: string) => undefined
}