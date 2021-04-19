import React, { FC, useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'

import { todosStore } from '../store/mobx/todos.store'
import { withStore } from '../store/mobx/withStore'

/* components */
import NewTodo from '../components/NewTodo'
import Todo from '../components/Todo'
import Loader from '../views/Loader'
import Error from '../views/Error'

/* constants */
import { Screen } from '../core/config/constants'

/* types */
import { StackNavigationProp } from '@react-navigation/stack'
import { ParamListBase } from '@react-navigation/native'

interface Props {
   navigation: StackNavigationProp<ParamListBase>
   onRemove: (id: string) => void
}

const DashboardScreen: FC<Props> = ({ navigation, onRemove }) => {
   const {
      fetchTodos,
      todos,
      error,
      setSelectedTodo,
      addTodo
   } = todosStore

   const [isLoading, setIsLoading] = useState<boolean>(false)

   const getTodos = useCallback(async () => {
      try {
         setIsLoading(true)
         await fetchTodos()
      } finally {
         setIsLoading(false)
      }
   }, [fetchTodos])

   useEffect(() => {
      getTodos()
   }, [])

   const onAddHandler = async (title: string) => {
      try {
         setIsLoading(true)
         await addTodo(title)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      isLoading ? <Loader /> :
      error ? <Error callback={() => navigation.navigate(Screen.Dashboard)}>{ error }</Error> : (
         <View style={styles.container}>
            <NewTodo onAdd={onAddHandler} />

            {todos.length ? (
               <FlatList
                  data={todos}
                  renderItem={({ item }) => (
                     <Todo
                        todo={item}
                        onRemove={onRemove}
                        onPress={() => {
                           setSelectedTodo(item.id)
                           navigation.navigate(Screen.Todo)
                        }}
                     />
                  )}
                  keyExtractor={item => item.id}
               />
            ) : (
               <View style={styles.image_container}>
                  <Image
                     style={styles.image}
                     source={require('../assets/nodata.png')}
                  />
               </View>
            )}
         </View>
      )
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: Dimensions.get('window').width,
      paddingHorizontal: 10,
      backgroundColor: 'white'
   },
   image_container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      height: 300
   },
   image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain'
   }
})

export default withStore(DashboardScreen)