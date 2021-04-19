import React, { FC } from 'react'
import { Alert } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { todosStore } from './store/mobx/todos.store'
import { withStore } from './store/mobx/withStore'

/* components */
import Navbar from './components/Navbar'

/* screens */
import DashboardScreen from './screens/Dashboard'
import TodoScreen from './screens/Todo'

import { Screen } from './core/config/constants'

const Stack = createStackNavigator()

const MainLayout: FC = () => {
   const { todos, removeTodo } = todosStore

   const onRemoveHandler = (id: string, afterRemoveCallback?: Function)=> {
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
                  afterRemoveCallback?.()
               }
            }
         ],
         { cancelable: false }
      )
   }

   return <>
      <Navbar title="Todo App" />

      <Stack.Navigator initialRouteName={Screen.Dashboard} mode="modal" headerMode="screen">
         <Stack.Screen name={Screen.Dashboard}>
            {props => <DashboardScreen {...props} onRemove={onRemoveHandler} />}
         </Stack.Screen>

         <Stack.Screen name={Screen.Todo}>
            {props =>
               <TodoScreen
                  {...props}
                  onRemove={(id: string) => {
                     onRemoveHandler(id, () => props.navigation.navigate(Screen.Dashboard))
                  }}
               />
            }
         </Stack.Screen>
      </Stack.Navigator>
   </>
}

export default withStore(MainLayout)