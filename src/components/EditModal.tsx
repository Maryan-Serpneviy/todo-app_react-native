import React, { FC, useState } from 'react'
import { StyleSheet, Modal, Alert, View, TextInput } from 'react-native'

import Button from '../views/Button'

/* constants */
import { MIN_TODO_LENGTH } from '../core/config'
import { THEME } from '../styles/theme'

interface Props {
   value?: string
   isOpen: boolean
   onClose: () => void
   onSubmit: (title: string) => void
}

export const EditModal: FC<Props> = ({ value, isOpen, onClose, onSubmit }) => {
   const [title, setTitle] = useState<string>(value || '')

   const onSave = () => {
      if (title.trim().length < MIN_TODO_LENGTH) {
         Alert.alert(
            'Error!',
            `Minimal title width is 5 characters. Now ${title.length} characters`
         )
      } else {
         onSubmit(title)
      }
   }
   
   return (
      <Modal visible={isOpen} animationType="slide">
         <View style={styles.container}>
            <TextInput
               style={styles.input}
               placeholder="Enter title"
               autoFocus
               autoCapitalize="none"
               autoCorrect={false}
               maxLength={20}
               value={title}
               onChangeText={setTitle}
            />

            <View style={styles.buttons}>
               <Button
                  title="Cancel"
                  color={styles.button_cancel.color}
                  onPress={onClose}
               />
               <Button title ="Save" onPress={onSave} />
            </View>
         </View>
      </Modal>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   input: {
      padding: 10,
      borderBottomColor: THEME.MAIN_COLOR,
      borderBottomWidth: 2,
      width: '80%'
   },
   buttons: {
      width: '100%',
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around'
   },
   button_cancel: {
      color: THEME.DANGER_COLOR
   }
})

export default EditModal