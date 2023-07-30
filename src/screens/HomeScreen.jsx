import React from 'react'
import { StyleSheet, View, FlatList, Text, Image } from 'react-native'
import { useTheme, FAB } from 'react-native-paper'
import { Background } from '../components'
import { useProducts } from '../hooks/storeApi'

const ProductCard = ({ item, styles }) => {
  return (
      <View style={[styles.twoColumns, styles.card]}>
        <Text>{item.title}</Text>
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <View>
          <Text variant="bodyMedium">Precio: {item.price}</Text>
        </View>
        <View>
          <FAB mode='flat' size='small' icon="cart-plus" label="Carrito" onPress={() => console.log('Pressed')}></FAB>
        </View>
      </View>
  )
}

const HomeScreen = () => {
  const { products } = useProducts()
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  return (
    <Background>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
        style={[styles.listContainer]}
        data={products}
        numColumns={2}
        renderItem={({ item }) => <ProductCard item={item} styles={styles} />}
        keyExtractor={item => item.id}/>
    </Background>
  )
}

const makeStyles = (colors) => StyleSheet.create({
  listContainer: {
    padding: 20,
    width: '130%'
  },
  twoColumns: {
    width: '47%'
  },
  card: {
    padding: 10,
    margin: 5,
    height: 250,
    backgroundColor: colors.elevation.level5,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productImage: {
    width: 100,
    height: 60
  }
})

export default HomeScreen
