import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { ScreensArray } from '../core/array'
import CustomDrawer from '../components/drawer/CustomDrawer'
import { StyleSheet } from 'react-native'

const Drawer = createDrawerNavigator()

const RootNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{
      drawerStyle: styles.drawerStyles,
      drawerType: 'front',
      headerShown: false
    }} drawerContent={(props) => <CustomDrawer {...props} />}>
      {ScreensArray.map((_, i) => (
        <Drawer.Screen key={i} name={_.route} component={_.component}
          options={{
            item: _
          }}
        />
      ))}
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerStyles: {
    width: 260,
    backgroundColor: 'transparent'
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  }
})

export default RootNavigator
