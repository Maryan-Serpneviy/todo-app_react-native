import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import Text from './Text'
import Button from './Button'

/* styles */
import commonStyles from '../styles/common'
import { THEME } from '../styles/theme'

interface Props {
   text?: string
   children?: string
   callback: () => void
}

export const Error: FC<Props> = ({ children, text, callback }) => (
   <View style={commonStyles.center}>
      <Text style={styles.error}>{ children || text || 'Oops! Something went wrong' }</Text>
      <Button style={styles.button} onPress={callback}>Back</Button>
   </View>
)

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   error: {
      fontSize: 20,
      color: THEME.DANGER_COLOR
   },
   button: {
      marginTop: 20
   }
})

export default Error
