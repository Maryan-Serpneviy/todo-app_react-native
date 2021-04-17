import React from 'react'
import { SafeAreaView } from 'react-native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'

import { TodosContextProvider } from './src/store/context/todos'
import MainLayout from './src/MainLayout'

export default function App() {
  const [fontsLoaded] = useFonts({
    'roboto-regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
    khand: require('./src/assets/fonts/khand.ttf')
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <TodosContextProvider>
      <SafeAreaView>
        <MainLayout />
      </SafeAreaView>
    </TodosContextProvider>
  )
}