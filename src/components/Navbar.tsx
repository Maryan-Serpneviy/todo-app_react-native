import React, { FC } from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import Text from '../views/Text'
import { THEME } from '../theme'

interface Props {
   title: string
}

export const Navbar: FC<Props> = ({ title }) => {
   // const platformStyles = Platform.OS === 'android' ? styles.navbar_android : styles.navbar_iOS
   const platformStyles = Platform.select({
      android: styles.navbar_android,
      ios: styles.navbar_iOS
   })

   return (
      <View style={[styles.navbar]}>
         <Text style={styles.text}>{ title }</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   navbar: {
      height: 70,
      paddingBottom: 10,
      alignItems: 'center',
      justifyContent: 'flex-end'
   },
   navbar_android: {
      borderBottomColor: THEME.MAIN_COLOR,
      borderBottomWidth: 1,
      backgroundColor: THEME.MAIN_COLOR,
      color: 'white'
   },
   navbar_iOS: {
      borderBottomColor: THEME.MAIN_COLOR,
      borderBottomWidth: 1,
      color: THEME.MAIN_COLOR
   },
   text: {
      fontSize: 20,
      fontFamily: 'khand'
   }
})

export default Navbar