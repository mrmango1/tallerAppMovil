import React, { useState } from 'react'
import { Text, View, StyleSheet, SectionList } from 'react-native'
import { Card, Portal, Modal } from 'react-native-paper'
import { useProducts } from '../hooks/storeApi'
import { Background, Header, Button } from '../components'
import ProductDetailModal from './ProductDetailModal'

const ProductCard = ({ item, onPress }) => {
  return (
      <Card>
        <Card.Title title={item.title} subtitle={`$${item.price}`}/>
        <Card.Cover source={{ uri: item.images[0] }} />
        <Card.Content>
          <Text variant="titleLarge">{item.description}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode='contained' onPress={() => onPress(item)}>Ver</Button>
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

  const [productDetail, setProductDetail] = useState({ visible: false })

  const showModal = (item) => setProductDetail({ ...item, visible: true })
  const hideModal = () => setProductDetail({ ...productDetail, visible: false })

  return (
    <Background>
              <SectionList
              style={styles.listContainer}
              sections={data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <ProductCard item={item} onPress={showModal} />}
              ItemSeparatorComponent={() => <View style={{ height: 20 }}/>}
              renderSectionHeader={({ section: { title } }) => (
                <Header>{title}</Header>
              )}/>
      <Portal>
        <Modal visible={productDetail.visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <ProductDetailModal {...productDetail} />
        </Modal>
      </Portal>
    </Background>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    padding: 20,
    width: '130%'
  },
  modalContainer: {
    marginHorizontal: '7%',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20
  }
})

export default ProductListScreen
