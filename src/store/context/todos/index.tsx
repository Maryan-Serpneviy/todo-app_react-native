import React, { FC, createContext, useState } from 'react'
import { model } from './model'

/* types */
import { iTodo } from 'types'

interface Props {
   children: JSX.Element | JSX.Element[]
}

export const TodosContext = createContext(model)

export const TodosContextProvider: FC<Props> = ({ children }) => {
   const [todos, setTodos] = useState<iTodo[]>([])
   const [todoId, setTodoId] = useState<string | null>(null)

   function setSelectedTodo(value: string | null) {
      setTodoId(value)
   }

   function addTodo(title: string) {
      const newTodo = {
         id: String(Date.now()),
         title
      }
      setTodos(prevState => [newTodo, ...prevState])
   }

   function editTodo(todo: iTodo) {
      setTodos(prevState => prevState.map(item => {
         if (item.id === todo.id) {
            item.title = todo.title
         }
         return todo
      }))
   }

   function removeTodo(id: string) {
      setTodoId(null)
      setTodos(prevState => prevState.filter(todo => todo.id !== id))
   }

   const providerData = {
      todos,
      selectedTodo: todos.find(item => item.id === todoId),
      setSelectedTodo,
      addTodo,
      editTodo,
      removeTodo
   }

   return (
      <TodosContext.Provider value={providerData}>
         { children }
      </TodosContext.Provider>
   )
}