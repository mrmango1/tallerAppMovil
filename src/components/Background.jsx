import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function Background ({ children }) {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const makeStyles = (colors) => StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.surface
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
