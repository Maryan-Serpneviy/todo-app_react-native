import React, { FC, ReactNode } from 'react'
import { StyleSheet, Text } from 'react-native'

interface Props {
   children: ReactNode | JSX.Element
   style?: Object
}

export const AppText: FC<Props> = ({ style, children }) => (
   <Text style={[styles.default, style]}>
      { children }
   </Text>
)

const styles = StyleSheet.create({
   default: {
      fontFamily: 'roboto-regular'
   }
})

export default AppText