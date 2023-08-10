import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useTheme, FAB } from 'react-native-paper'
import Counter from '../components/Counter'
import { _storeShoppingCart, _updateProductFromShoppingCart } from '../hooks/asynStorage'

const ProductDetailModal = (props) => {
  const colors = useTheme()
  const styles = makeStyles(colors)
  const label = props.type === 'update' ? 'Actualizar' : 'Agregar al carrito'
  const [count, setCount] = useState(props.type === 'update' ? props.quantity : 1)
  const onIncreaseCount = () => {
    if (count < props.stock) {
      setCount(count + 1)
    }
  }
  const onDecreaseCount = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const addToCart = async () => {
    const product = {
      id: props.id,
      title: props.title,
      brand: props.brand,
      price: props.price,
      quantity: count,
      images: props.images,
      description: props.description,
      stock: props.stock
    }
    await _storeShoppingCart(product)
    props.hideModal()
  }

  const updateCart = async () => {
    const product = {
      id: props.id,
      title: props.title,
      brand: props.brand,
      price: props.price,
      quantity: count,
      images: props.images,
      description: props.description,
      stock: props.stock
    }
    await _updateProductFromShoppingCart(product)
    props.hideModal()
  }

  const onPress = props.type === 'update' ? updateCart : addToCart

  return (
  <View>
    <Text>{props.title}</Text>
    <Text>Marca: {props.brand}</Text>
    <Text>Precio: ${props.price}</Text>
    <Text>Stock: {props.stock} unidades</Text>
    <Image style={styles.productImage} source={{ uri: props.images[0] }} />
    <Text style={styles.spacing}>{props.description}</Text>
    <Counter value={count} increaseCount={onIncreaseCount} decreaseCount={onDecreaseCount} />
    <FAB style={styles.spacing} mode='flat' size='small' icon="cart-plus" label={label} onPress={onPress}></FAB>
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
