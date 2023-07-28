import React from 'react'
import { View } from 'react-native'
import Constants from 'expo-constants'
import Button from '../components/Button'

const HomeScreen = ({ navigation }) => {
  const onLogoutPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    })
  }
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
      <Button mode="contained" onPress={onLogoutPressed}>
        Cerrar sesión
      </Button>
    </View>
  )
}

export default HomeScreen
