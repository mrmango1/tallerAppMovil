import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { colors, constant } from './constants'
import Icon from '../Icons'

const DrawerItem = ({
  label, onPress, tabBarTestID, type, name, notification,
  activeItemColor, color
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      testID={tabBarTestID}
      accessibilityRole="button"
      style={[styles.drawerItem, { backgroundColor: activeItemColor }]}
    >
      <View style={styles.row}>
        <Icon type={type} name={name} {...{ color }} />
        <Text style={[styles.label, { color }]}>{label}</Text>
      </View>
      {notification > 0 && <View style={[styles.notificationBadge,
        { backgroundColor: notification > 5 ? colors.important : colors.normal }]}>
        <Text>{notification}</Text>
      </View>}
    </TouchableOpacity>
  )
}

const DrawerItemList = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.view}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const { options } = descriptors[route.key]

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }
        const drawerItem = options.item
        const visible = drawerItem.visible
        const color = isFocused ? colors.dark : colors.darkGray
        const activeItemColor = isFocused ? colors.primary : null

        if (visible) {
          return (
            <DrawerItem key={index} label={drawerItem.label}
             tabBarTestID={options.tabBarTestID}
             onPress={onPress}
             name={drawerItem.icon}
             type={drawerItem.type}
             notification={drawerItem.notification}
             color={color}
             activeItemColor={activeItemColor}
           />
          )
        }
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: constant.SPACING / 2,
    justifyContent: 'space-between',
    borderRadius: constant.borderRadius
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontSize: constant.textFontSize,
    color: colors.dark,
    paddingHorizontal: constant.SPACING
  },
  notificationBadge: {
    paddingVertical: constant.SPACING / 5,
    paddingHorizontal: constant.SPACING / 2,
    borderRadius: constant.borderRadius / 2
  },
  view: {
    backgroundColor: colors.white,
    borderRadius: constant.borderRadius,
    marginHorizontal: constant.SPACING / 2,
    paddingVertical: 100,
    padding: constant.SPACING / 1.5
  }
})

export default DrawerItemList
