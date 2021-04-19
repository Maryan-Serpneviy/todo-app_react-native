import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, GestureResponderEvent } from 'react-native'
import { iTodo } from 'types'

interface Props {
   todo: iTodo
   onRemove: (id: string) => void
   onPress: (event: GestureResponderEvent) => void
}

export const Todo: FC<Props> = ({ todo, onRemove, onPress }) => {
   return (
      <TouchableOpacity
         activeOpacity={0.4}
         onPress={onPress}
         onLongPress={() => onRemove(todo.id)}
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