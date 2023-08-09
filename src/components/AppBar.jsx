import React from 'react'
import { Appbar } from 'react-native-paper'
import { getHeaderTitle } from '@react-navigation/elements'

const CustomAppBar = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name)

  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}

export default CustomAppBar
