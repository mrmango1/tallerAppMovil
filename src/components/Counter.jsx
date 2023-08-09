import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput, useTheme } from 'react-native-paper'

const Counter = ({ value, increaseCount, decreaseCount }) => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  return (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={decreaseCount}>
      <Text>-</Text>
    </TouchableOpacity>
    <TextInput style={styles.counterText} value={value.toString()} />
    <TouchableOpacity style={styles.button} onPress={increaseCount}>
      <Text>+</Text>
    </TouchableOpacity>
  </View>
  )
}

const makeStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18
  },
  button: {
    width: 55,
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary
  },
  counterText: {
    width: 100,
    fontWeight: 'bold',
    alignItems: 'center'
  }
})

export default Counter
