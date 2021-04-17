import React, { FC, useContext } from 'react'
import { Alert } from 'react-native'

import { TodosContext } from './store/context/todos'

/* components */
import Navbar from './components/Navbar'

/* screens */
import MainScreen from './screens/Main'
import TodoScreen from './screens/Todo'

export const MainLayout: FC = () => {
   const {
      todos,
      selectedTodo,
      removeTodo
   } = useContext(TodosContext)

   const onRemoveHandler = (id: string) => {
      const title = todos.find(item => item.id === id)?.title
  
      Alert.alert(
         'Item removal',
         `Are you sure you want to delete ${title}?`,
         [
            {
               text: 'Cancel',
               style: 'cancel'
            },
            {
               text: 'Delete',
               onPress: () => {
                  removeTodo(id)
               }
            }
         ],
         { cancelable: false }
      )
   }

   return <>
      <Navbar title="Todo App" />

      {!selectedTodo
         ? <MainScreen onRemove={onRemoveHandler} />
         : <TodoScreen onRemove={onRemoveHandler} />
      }
   </>
}

export default MainLayout