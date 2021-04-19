import React, { FC, createContext, useState } from 'react'
import { model } from './model'

import { todosService } from '../../../services/todos.service'
import { iTodo } from 'types'

interface Props {
   children: JSX.Element | JSX.Element[]
}

export const TodosContext = createContext(model)

export const TodosContextProvider: FC<Props> = ({ children }) => {
   const [todos, setTodos] = useState<iTodo[]>([])
   const [todoId, setTodoId] = useState<string | null>(null)
   const [error, setError] = useState<string>('')

   function setSelectedTodo(value: string | null) {
      setTodoId(value)
   }

   async function fetchTodos() {
      try {
         const data = await todosService.get()
         if (data) {
            const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
            setTodos(todos)
         }
      } catch (error) {
         console.error(error)
         setError('Failed to get todos')
      }
   }

   async function addTodo(title: string) {
      try {
         const data = await todosService.post({ title })
         if (data) {
            const newTodo = {
               id: data.name,
               title
            }
            setTodos(prevState => [newTodo, ...prevState])
         }
      } catch (error) {
         console.error(error)
         setError('Failed to add todo')
      }
   }

   async function editTodo(todo: iTodo) {
      try {
         await todosService.patch(todo.id, { title: todo.title })
         setTodos(prevState => prevState.map(item => {
            if (item.id === todo.id) {
               item.title = todo.title
            }
            return todo
         }))
      } catch (error) {
         console.error(error)
         setError('Failed to update todo')
      }
   }

   function removeTodo(id: string) {
      try {
         setTodoId(null)
         setTodos(prevState => prevState.filter(todo => todo.id !== id))
      } catch (error) {
         console.error(error)
         setError('Failed to delete todo')
      }
   }

   const providerData = {
      fetchTodos,
      error,
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