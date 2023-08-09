import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useTheme, FAB } from 'react-native-paper'
import Counter from '../components/Counter'

const ProductDetailModal = (props) => {
  const colors = useTheme()
  const styles = makeStyles(colors)
  const [count, setCount] = useState(0)
  const onIncreaseCount = () => {
    if (count < props.stock) {
      setCount(count + 1)
    }
  }
  const onDecreaseCount = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }
  return (
  <View>
    <Text>{props.title}</Text>
    <Text>Marca: {props.brand}</Text>
    <Text>Precio: ${props.price}</Text>
    <Text>Stock: {props.stock} unidades</Text>
    <Image style={styles.productImage} source={{ uri: props.images[0] }} />
    <Text style={styles.spacing}>{props.description}</Text>
    <Counter value={count} increaseCount={onIncreaseCount} decreaseCount={onDecreaseCount} />
    <FAB style={styles.spacing} mode='flat' size='small' icon="cart-plus" label="Agregar al carrito" onPress={() => console.log('Pressed')}></FAB>
  </View>)
}

const makeStyles = (colors) => StyleSheet.create({
  productImage: {
    width: 200,
    height: 160,
    alignSelf: 'center'
  },
  spacing: {
    margin: 14
  }
})

export default ProductDetailModal
