import React, { useReducer, useRef, useEffect, useState } from 'react'
import { useDrawerProgress } from '@react-navigation/drawer'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import DrawerItemList from './DrawerItemList'
import { colors, constant } from './constants'
import Constants from 'expo-constants'
import Icon, { Icons } from '../Icons'
import { _retrieveUser } from '../../hooks/asynStorage'

const ProfileMenu = [
  { label: 'Mi Perfil', icon: 'person', iconType: Icons.MaterialIcons, screen: 'user' },
  { label: 'Historial', icon: 'history', iconType: Icons.MaterialIcons, screen: 'history' },
  { label: 'Cerrar Sesión', icon: 'logout', iconType: Icons.MaterialIcons, screen: 'Login' }
]

const ProfileItem = ({ label, onPress, type, name, navigation }) => {
  const navigate = () => {
    if (onPress === 'Login') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      })
    } else {
      navigation.navigate(onPress)
    }
  }
  return (
    <TouchableOpacity
      onPress={navigate}
      style={[styles.row, { margin: constant.SPACING / 4 }]}>
      <Icon type={type} name={name} color={colors.dark} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

const CustomDrawer = (props) => {
  const { navigation } = props
  const [user, setUser] = useState({ name: '', lastname: '', email: '' })
  const scrollRef = useRef(null)
  const [show, toggleProfile] = useReducer(s => !s, false)

  const fun = () => {
    show
      ? scrollRef.current.scrollTo({
        y: 100,
        animated: true
      })
      : scrollRef.current.scrollToEnd({
        y: 100,
        animated: true
      })
    toggleProfile()
  }
  const progress = useDerivedValue(() => {
    return show ? withTiming(1) : withTiming(0)
  })

  const menuStyles = useAnimatedStyle(() => {
    const scaleY = interpolate(
      progress.value,
      [0, 1],
      [0, 1]
    )
    return {
      transform: [{ scaleY }]
    }
  })

  const drawerProgress = useDrawerProgress()

  const viewStyles = useAnimatedStyle(() => {
    const translateX = interpolate(
      drawerProgress.value,
      [0, 1],
      [-200, 0]
    )
    return {
      transform: [{ translateX }]
    }
  })

  useEffect(() => {
    _retrieveUser().then(user => setUser(user))
  }, [])

  return (
  <View style={styles.container}>
    <TouchableOpacity onPress={fun}>
        <Animated.View style={[styles.marginTop, styles.view, styles.row]}>
          <Image style={styles.profile} source={require('../../assets/avatar.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.headerTitle}>{user.name} {user.lastname}</Text>
            <Text style={styles.text}>Administrador</Text>
          </View>
        </Animated.View>
    </TouchableOpacity>
    <Animated.ScrollView
      ref={scrollRef} {...props}
      showsVerticalScrollIndicator={false}
      style={[styles.marginVertical, viewStyles]}>
        {show &&
          <Animated.View style={[styles.view, styles.marginBottom,
            { backgroundColor: colors.primary },
            menuStyles
          ]}>
            <Text>{user.email}</Text>
            <View style={styles.separator} />
            {ProfileMenu.map((_, i) => (
              <ProfileItem key={i}
                label={_.label}
                type={_.iconType}
                name={_.icon}
                onPress={_.screen}
                navigation={navigation}
              />
            ))}
          </Animated.View>
        }
        <DrawerItemList {...props}/>
    </Animated.ScrollView>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  view: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 8,
    padding: 16 / 1.5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  marginTop: {
    marginTop: Constants.statusBarHeight + 10
  },
  marginBottom: {
    marginBottom: constant.SPACING / 2
  },
  marginVertical: {
    marginVertical: constant.SPACING / 2
  },
  profile: {
    width: 50,
    height: 50
  },
  headerTitle: {
    fontSize: 16,
    color: '#123',
    fontWeight: 'bold'
  },
  textContainer: {
    marginLeft: 16
  }
})

export default CustomDrawer
