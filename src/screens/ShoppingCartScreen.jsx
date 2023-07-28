import React from 'react'
import { Text, View } from 'react-native'
import Constants from 'expo-constants'

const HomeScreen = () => {
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
      <Text>Carrito</Text>
    </View>
  )
}

export default HomeScreen
