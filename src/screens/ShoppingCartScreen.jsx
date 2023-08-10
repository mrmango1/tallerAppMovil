import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, Image, Text } from 'react-native'
import { Card, useTheme, Button, Portal, Modal, Dialog, Snackbar } from 'react-native-paper'
import { Background } from '../components'
import ProductDetailModal from './ProductDetailModal'
import { _removeShoppingCart, _retrieveShoppingCartByUser, _removeProductFromShoppingCart } from '../hooks/asynStorage'

const ShoppingCartCard = ({ item, onDelete, onDetails }) => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  return (
      <Card>
        <Card.Title
          title={item.title}
          subtitle={`Total: $${item.price * item.quantity}`}
          left={() => <Image style={styles.productImage} source={{ uri: item.images[0] }} />} />
        <Card.Content>
          <Text>Precio unitario: ${item.price}</Text>
          <Text>Cantidad: {item.quantity}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => onDelete(item.id)}>Quitar</Button>
          <Button onPress={() => onDetails(item)}>Ver</Button>
        </Card.Actions>
      </Card>
  )
}

const ShoppingCartScreen = ({ navigation }) => {
  const timerStart = 10
  const [shoppingCart, setShoppingCart] = useState([])
  const [productDetail, setProductDetail] = useState({ visible: false })
  const [buyDialog, setBuyDialog] = useState(false)
  const [cancelDialog, setCancelDialog] = useState(false)
  const [visible, setVisible] = useState(false)
  const [seconds, setSeconds] = useState(timerStart)
  const [timer, setTimer] = useState(false)

  const { colors } = useTheme()
  const styles = makeStyles(colors)

  useEffect(() => {
    let intervalo
    let counter = timerStart
    if (timer) {
      intervalo = setInterval(() => {
        counter = counter - 1
        setSeconds(prevSegundos => prevSegundos - 1)
        if (counter === 0) {
          hideBuyDialog()
        }
      }, 1000)
    } else {
      clearInterval(intervalo)
    }
    return () => {
      clearInterval(intervalo)
    }
  }, [timer])

  const restartTimer = () => {
    setSeconds(timerStart)
    setTimer(false)
  }

  const showBuyDialog = () => {
    setTimer(true)
    setBuyDialog(true)
  }
  const hideBuyDialog = () => {
    setBuyDialog(false)
    restartTimer()
  }
  const showCancelDialog = () => setCancelDialog(true)
  const hideCancelDialog = () => setCancelDialog(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  const showModal = (item) => setProductDetail({ ...item, visible: true })
  const hideModal = () => setProductDetail({ ...productDetail, visible: false })

  const deleteFromCart = async (id) => {
    await _removeProductFromShoppingCart(id)
    await getShoppingCart()
  }

  const getShoppingCart = async () => {
    const products = await _retrieveShoppingCartByUser()
    setShoppingCart(products)
    console.log('shopping cart updated')
  }

  const deleteShoppingCart = async (buy) => {
    await _removeShoppingCart()
    await getShoppingCart()
    if (buy) {
      hideBuyDialog()
      onToggleSnackBar()
    } else {
      hideCancelDialog()
    }
  }

  useEffect(() => {
    if (navigation.isFocused() || !productDetail.visible) {
      getShoppingCart()
    }
  }
  , [navigation.isFocused(), productDetail.visible])
  return (
    <Background>
      {!shoppingCart && <Text>No hay productos en el carrito</Text>}
      {shoppingCart && <Text>Total: {shoppingCart?.totalPrice?.toFixed(2) ?? 0}</Text>}
      <FlatList
      ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
      style={styles.listContainer}
      data={shoppingCart?.products ?? []}
      renderItem={({ item }) => <ShoppingCartCard item={item} onDelete={deleteFromCart} onDetails={showModal} />}
      keyExtractor={item => item.id}/>
      {shoppingCart && <View style={styles.twoColumns}>
        <Button onPress={showCancelDialog}>Eliminar</Button>
        <Button mode='contained' onPress={showBuyDialog}>Comprar</Button>
      </View>}
      <Portal>
        <Modal visible={productDetail.visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <ProductDetailModal {...productDetail} type='update' hideModal={hideModal} />
        </Modal>
        <Dialog visible={buyDialog} onDismiss={hideBuyDialog}>
            <Dialog.Title>Detalles de la compra</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Confirmar la compra de un total de: ${shoppingCart?.totalPrice?.toFixed(2) ?? 0}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Text>Se cerrará: {seconds ?? 0} seg.</Text>
              <Button onPress={hideBuyDialog}>Cancelar</Button>
              <Button onPress={() => deleteShoppingCart(true)}>Confirmar</Button>
            </Dialog.Actions>
          </Dialog>
          <Dialog visible={cancelDialog} onDismiss={hideCancelDialog}>
            <Dialog.Title>Eliminar carrito</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Esta seguro que desea eliminar el carrito?</Text>
            </Dialog.Content>
            <Dialog.Actions>
            <Button onPress={hideCancelDialog}>Cancelar</Button>
              <Button onPress={() => deleteShoppingCart(false)}>Confirmar</Button>
            </Dialog.Actions>
          </Dialog>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            >
            Compra realizada con éxito!
          </Snackbar>
      </Portal>
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
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleTimer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalContainer: {
    marginHorizontal: '7%',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20
  }
})

export default ShoppingCartScreen
