import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { Avatar, Card, useTheme } from 'react-native-paper'
import { Header, Background } from '../components'
import { employees } from '../core/data'
import Constants from 'expo-constants'

const LeftContent = props => <Avatar.Icon {...props} icon="account" />

const HistoryCard = ({ item }) => {
  return (
      <Card>
        <Card.Title title={item.cliente} subtitle={item.fecha} left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">Vendedor: {item.vendedor}</Text>
          <Text variant="bodyMedium">Precio: ${item.precio}</Text>
          <Text variant="bodyMedium">Auto: {item.auto}</Text>
        </Card.Content>
      </Card>
  )
}

const HistoryScreen = () => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  return (
    <Background>
      <View style={{ height: Constants.statusBarHeight }} />
      <Header>Historial de ventas</Header>
      <FlatList
      ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
      style={styles.listContainer}
      data={employees.ventas}
      renderItem={({ item }) => <HistoryCard item={item} />}
      keyExtractor={item => item.id}/>
    </Background>
  )
}

const makeStyles = (colors) => StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    padding: 20,
    width: '130%'
  }
})

export default HistoryScreen
