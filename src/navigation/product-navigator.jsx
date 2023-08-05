import React, { lazy, Suspense } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomNavigationBar from '../components/AppBar'
import { Text } from 'react-native-paper'

const Tab = createBottomTabNavigator()

const HomeComponent = lazy(() => import('../screens/HomeScreen'))
const CategoryComponent = lazy(() => import('../screens/ProductListScreen'))
const ShoppingCartComponent = lazy(() => import('../screens/ShoppingCartScreen'))

const ProductNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Inicio'
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        header: (props) => <CustomNavigationBar {...props} />
      }}>
      <Tab.Screen name="Inicio" options={{
        tabBarLabel: 'Inicio',
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
        )
      }} >
        {(props) => (
          <Suspense fallback={<Text>Cargando ....</Text>}>
            <HomeComponent {...props} />
          </Suspense>
        )}
      </Tab.Screen>
      <Tab.Screen name="Categoria" options={{
        tabBarLabel: 'Categoria',
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shape-plus" color={color} size={size} />
        )
      }}>
        {(props) => (
          <Suspense fallback={<Text>Cargando ....</Text>}>
            <CategoryComponent {...props} />
          </Suspense>
        )}
      </Tab.Screen>
      <Tab.Screen name="Carrito" options={{
        tabBarLabel: 'Carrito',
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
        )
      }}>
        {(props) => (
          <Suspense fallback={<Text>Cargando ....</Text>}>
            <ShoppingCartComponent {...props} />
          </Suspense>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export default ProductNavigator
