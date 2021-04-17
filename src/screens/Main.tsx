import React, { FC, useContext } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'

import { TodosContext } from '../store/context/todos'

/* components */
import NewTodo from '../components/NewTodo'
import Todo from '../components/Todo'

interface Props {
   onRemove: (id: string) => void
}

export const MainScreen: FC<Props> = ({ onRemove }) => {
   const {
      todos,
      setSelectedTodo,
      addTodo
   } = useContext(TodosContext)

   return (
      <View style={styles.container}>
         <NewTodo onAdd={addTodo} />

         {todos.length ? (
            <FlatList
               data={todos}
               renderItem={({ item }) => (
                  <Todo
                     todo={item}
                     onRemove={onRemove}
                     onOpen={setSelectedTodo}
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
}

const styles = StyleSheet.create({
   container: {
      width: Dimensions.get('window').width,
      paddingHorizontal: 10
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

export default MainScreen