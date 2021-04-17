import React, { FC } from 'react'
import {
   StyleSheet,
   View,
   TouchableOpacity,
   TouchableNativeFeedback,
   Platform
} from 'react-native'

import TextBold from '../views/TextBold'

import { THEME } from '../theme'

interface Props {
   onPress: () => void
   style?: Object
   color?: string
   title?: string
   children?: JSX.Element
}

export const Button: FC<Props> = ({ title, children, onPress, color = THEME.MAIN_COLOR }) => {
   const TouchableFeedback = (props: any) => {
      return Platform.OS === 'android'
         ? <TouchableNativeFeedback {...props}>{ props.children }</TouchableNativeFeedback>
         : <TouchableOpacity {...props}>{ props.children }</TouchableOpacity>
   }

   return (
      <TouchableFeedback onPress={onPress} activeOpacity={0.7}>
         <View style={[styles.button, { backgroundColor: color }]}>
            <TextBold style={styles.text}>{ children || title }</TextBold>
         </View>
      </TouchableFeedback>
   )
}

const styles = StyleSheet.create({
   button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
   },
   text: {
      color: 'white'
   }
})

export default Button