import React from 'react'
import { Text, View, StyleSheet, SectionList } from 'react-native'
import { Card } from 'react-native-paper'
import { useProducts } from '../hooks/storeApi'
import { Background, Header, Button } from '../components'

const ProductCard = ({ item }) => {
  return (
      <Card>
        <Card.Title title={item.title} subtitle={`$${item.price}`}/>
        <Card.Cover source={{ uri: item.image }} />
        <Card.Content>
          <Text variant="titleLarge">Vendedor: {item.description}</Text>
          <Text variant="bodyMedium">Precio: {item.price}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode='contained' onPress={() => console.log('Pressed')}>Agregar al carrito</Button>
        </Card.Actions>
      </Card>
  )
}

const ProductListScreen = () => {
  const { products } = useProducts()
  const categories = products.map(product => product.category)
  const uniqueCategories = [...new Set(categories)]
  const data = uniqueCategories.map(category => {
    return {
      title: category,
      data: products.filter(product => product.category === category)
    }
  })

  return (
    <Background>
              <SectionList
              style={styles.listContainer}
              sections={data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <ProductCard item={item} />}
              ItemSeparatorComponent={() => <View style={{ height: 20 }}/>}
              renderSectionHeader={({ section: { title } }) => (
                <Header>{title}</Header>
              )}/>
    </Background>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    padding: 20,
    width: '130%'
  }
})

export default ProductListScreen
