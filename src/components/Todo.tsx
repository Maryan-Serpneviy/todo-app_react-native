import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { iTodo } from 'types'

interface Props {
   todo: iTodo
   onRemove: (id: string) => void
   onOpen: (id: string) => void
}

export const Todo: FC<Props> = ({ todo, onRemove, onOpen }) => {
   return (
      <TouchableOpacity
         activeOpacity={0.4}
         onPress={onOpen.bind(null, todo.id)}
         onLongPress={onRemove.bind(null, todo.id)}
      >
         <View style={styles.todo}>
            <Text>{ todo.title }</Text>
         </View>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   todo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginHorizontal: 10,
      padding: 15,
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 5
   }
})

export default Todo