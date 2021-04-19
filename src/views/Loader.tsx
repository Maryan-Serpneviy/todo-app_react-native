import React, { FC } from 'react'
import { View, ActivityIndicator } from 'react-native'

/* styles */
import commonStyles from '../styles/common'
import { THEME } from '../styles/theme'

export const Loader: FC = () => (
   <View style={commonStyles.center}>
      <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
   </View>
)

export default Loader