import React, { FC, useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { todosStore } from '../store/mobx/todos.store'
import { withStore } from '../store/mobx/withStore'

/* components */
import EditModal from '../components/EditModal'
import Card from '../views/Card'
import TextBold from '../views/TextBold'
import Button from '../views/Button'
import Loader from '../views/Loader'

/* constants */
import { THEME } from '../styles/theme'

/* types */
import { StackNavigationProp } from '@react-navigation/stack'
import { ParamListBase } from '@react-navigation/native'

interface Props {
   navigation: StackNavigationProp<ParamListBase>
   onRemove: (id: string) => void
}

const TodoScreen: FC<Props> = ({ onRemove }) => {
   const { selectedTodo, editTodo } = todosStore

   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const [isLoading, setIsLoading] = useState<boolean>(false)

   const onSaveHandler = async (title: string) => {
      if (selectedTodo) {
         try {
            setIsLoading(true)
            await editTodo({ id: selectedTodo.id, title })
         } finally {
            setIsLoading(false)
            setIsModalOpen(false)
         }
      }
   }

   return isLoading ? <Loader /> : (
      <View>
         <Card>
            <TextBold style={styles.title}>{ selectedTodo?.title }</TextBold>
         </Card>

         <View style={styles.buttons}>
            <View style={styles.button}>
               <Button
                  title="Edit"
                  onPress={() => setIsModalOpen(true)}
               >
                  <FontAwesome name="edit" size={20} />
               </Button>
            </View>
            
            <View style={styles.button}>
               <Button
                  title="Delete"
                  color={THEME.DANGER_COLOR}
                  onPress={() => {
                     if (selectedTodo) {
                        onRemove(selectedTodo.id)
                     }
                  }}
               >
                  <FontAwesome name="remove" size={20} color="white" />
               </Button>
            </View>
         </View>

         <EditModal
            value={selectedTodo?.title}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={onSaveHandler}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around'
   },
   button: {
      width: Dimensions.get('window').width / 2.5
   },
   title: {
      fontSize: 20,
      fontFamily: 'roboto-bold'
   }
})

export default withStore(TodoScreen)