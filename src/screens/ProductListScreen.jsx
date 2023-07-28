import React from 'react'
import { Text, View } from 'react-native'
import Constants from 'expo-constants'

const ProductListScreen = () => {
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
      <Text>Productos</Text>
    </View>
  )
}

export default ProductListScreen
