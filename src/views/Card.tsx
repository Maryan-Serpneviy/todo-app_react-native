import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
   children: JSX.Element | JSX.Element[]
}

export const Card: FC<Props> = ({ children }) => (
   <View style={styles.default}>
      { children }
   </View>
)

const styles = StyleSheet.create({
   default: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 20,
      padding: 20,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowRadius: 2,
      shadowOpacity: 0.3,
      shadowOffset: {
         width: 2,
         height: 2
      },
      elevation: 8,
   }
})

export default Card