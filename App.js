import 'react-native-gesture-handler'
import React from 'react'
import { AppRegistry } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { name as appName } from './app.json'
import Main from './src/Main'

export default function App () {
  return (
    <PaperProvider>
      <Main />
    </PaperProvider>)
}

AppRegistry.registerComponent(appName, () => App)
