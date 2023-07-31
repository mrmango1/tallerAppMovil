import React from 'react'
import { View, FlatList, StyleSheet, Image, Text } from 'react-native'
import { Card, useTheme, Button } from 'react-native-paper'
import { Background, BackButton } from '../components'
import { useProducts } from '../hooks/storeApi'

const ShoppingCartCard = ({ item }) => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  return (
      <Card>
        <Card.Title
          title={item.title}
          subtitle={`$${item.price}`}
          left={() => <Image style={styles.productImage} source={{ uri: item.image }} />} />
        <Card.Actions>
          <Button onPress={() => console.log('Pressed')}>Quitar</Button>
        </Card.Actions>
      </Card>
  )
}

const ShoppingCartScreen = () => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const { products } = useProducts()
  const shoppingCart = products.filter(product => product.price < 100)
  const totalPrice = shoppingCart.reduce((acc, product) => acc + product.price, 0)
  return (
    <Background>
      <Text>Total: {totalPrice.toFixed(2)}</Text>
      <FlatList
      ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
      style={styles.listContainer}
      data={shoppingCart}
      renderItem={({ item }) => <ShoppingCartCard item={item} />}
      keyExtractor={item => item.id}/>
      <View style={styles.twoColumns}>
      <Button onPress={() => console.log('Pressed')}>Cancelar</Button>
      <Button mode='contained' onPress={() => console.log('Pressed')}>Comprar</Button>
      </View>
  </Background>
  )
}

const makeStyles = (colors) => StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    padding: 20,
    width: '130%'
  },
  productImage: {
    width: 50,
    height: 60
  },
  twoColumns: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default ShoppingCartScreen
