import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'

import { Provider } from 'mobx-react'
import { todosStore as store } from './src/store/mobx/todos.store'

import MainLayout from './src/MainLayout'

export default function App() {
  const [fontsLoaded] = useFonts({
    'roboto-regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
    khand: require('./src/assets/fonts/khand.ttf')
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainLayout />
      </NavigationContainer>
    </Provider>
  )
}