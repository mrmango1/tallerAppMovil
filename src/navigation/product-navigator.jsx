import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ProductListScreen, HomeScreen, ShoppingCartScreen } from '../screens'

const Tab = createBottomTabNavigator()

const ProductNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Inicio' screenOptions={{
      tabBarActiveTintColor: '#e91e63'
    }}>
      <Tab.Screen name="Inicio" component={HomeScreen} options={{
        tabBarLabel: 'Inicio',
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
        )
      }} />
      <Tab.Screen name="Categoria" component={ProductListScreen} options={{
        tabBarLabel: 'Categoria',
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shape-plus" color={color} size={size} />
        )
      }}/>
      <Tab.Screen name="Carrito" component={ShoppingCartScreen} options={{
        tabBarLabel: 'Carrito',
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
        )
      }}/>
    </Tab.Navigator>
  )
}

export default ProductNavigator
