import React, { FC, useState, useContext } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'

import { TodosContext } from '../store/context/todos'

/* components */
import EditModal from '../components/EditModal'
import Card from '../views/Card'
import TextBold from '../views/TextBold'
import Button from '../views/Button'

/* constants */
import { THEME } from '../theme'

/* types */
interface Props {
   onRemove: (id: string) => void
}

export const TodoScreen: FC<Props> = ({ onRemove }) => {
   const {
      selectedTodo,
      setSelectedTodo,
      editTodo
   } = useContext(TodosContext)

   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

   const onSaveHandler = (title: string) => {
      if (selectedTodo) {
         editTodo({ id: selectedTodo.id, title })
         setIsModalOpen(false)
      }
   }

   return (
      <View>
         <Card>
            <TextBold style={styles.title}>{ selectedTodo?.title }</TextBold>
            <Button title="Edit" onPress={() => setIsModalOpen(true)}>
               <FontAwesome name="edit" size={20} />
            </Button>
         </Card>

         <View style={styles.buttons}>
            <View style={styles.button}>
               <Button
                  title="Back"
                  color={THEME.GRAY_COLOR}
                  onPress={() => setSelectedTodo(null)}
               >
                  <AntDesign name="back" size={20} color="white" />
               </Button>
            </View>
            
            <View style={styles.button}>
               <Button
                  title="Delete"
                  color={THEME.DANGER_COLOR}
                  onPress={() => selectedTodo && onRemove(selectedTodo.id)}
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

export default TodoScreen