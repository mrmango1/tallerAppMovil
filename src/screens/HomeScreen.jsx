import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Text, Image } from 'react-native'
import { useTheme, Portal, Modal } from 'react-native-paper'
import { Background, Button } from '../components'
import { useProducts } from '../hooks/storeApi'
import ProductDetailModal from './ProductDetailModal'

const ProductCard = ({ item, styles, onPress }) => {
  return (
      <View style={[styles.twoColumns, styles.card]}>
        <Text>{item.title}</Text>
        <Image style={styles.productImage} source={{ uri: item.images[0] }} />
        <View>
          <Text variant="bodyMedium">Precio: {item.price}</Text>
        </View>
        <Button mode="contained" onPress={() => onPress(item)}>Ver</Button>
      </View>
  )
}

const HomeScreen = () => {
  const [productDetail, setProductDetail] = useState({ visible: false })
  const showModal = (item) => setProductDetail({ ...item, visible: true })
  const hideModal = () => setProductDetail({ ...productDetail, visible: false })
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
        renderItem={({ item }) => <ProductCard item={item} styles={styles} onPress={showModal} />}
        keyExtractor={item => item.id}/>
      <Portal>
        <Modal visible={productDetail.visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <ProductDetailModal {...productDetail} hideModal={hideModal} />
        </Modal>
      </Portal>
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
  },
  modalContainer: {
    marginHorizontal: '7%',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20
  }
})

export default HomeScreen
