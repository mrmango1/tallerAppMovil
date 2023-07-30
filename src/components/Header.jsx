import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

export default function Header (props) {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  return <Text style={styles.header} {...props} />
}

const makeStyles = (colors) => StyleSheet.create({
  header: {
    fontSize: 21,
    color: colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12
  }
})
