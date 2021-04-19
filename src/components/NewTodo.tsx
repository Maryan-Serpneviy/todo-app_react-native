import React, { FC, useState } from 'react'
import { StyleSheet, View, TextInput, Alert, Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { THEME } from '../theme'

interface Props {
   onAdd: (title: string) => void
}

export const NewTodo: FC<Props> = ({ onAdd }) => {
   const [value, setValue] = useState<string>('')

   const textInputProps = {
      style: styles.input,
      placeholder: "To do...",
      value,
      onChangeText: setValue,
      autoCorrect: false
   }

   const onPressHandler = () => {
      if (value.trim()) {
         onAdd(value)
         setValue('')
         Keyboard.dismiss()
      } else {
         Alert.alert('Todo cannot be empty')
      }
   }

   return (
      <View style={styles.container}>
         <TextInput {...textInputProps} autoCapitalize="none" />
         <AntDesign.Button name="pluscircleo" onPress={onPressHandler}>Add</AntDesign.Button>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      marginVertical: 15
   },
   input: {
      flexGrow: 1,
      marginRight: 10,
      paddingHorizontal: 10,
      borderBottomWidth: 2,
      borderStyle: 'solid',
      borderBottomColor: THEME.MAIN_COLOR
   }
})

export default NewTodo