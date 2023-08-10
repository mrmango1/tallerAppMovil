import AsyncStorage from '@react-native-async-storage/async-storage'

export const _storeUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user))
  } catch (error) {
    console.log(error, 'error')
  }
}

export const _retrieveUser = async () => {
  try {
    const value = await AsyncStorage.getItem('user')
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (error) {
    console.log(error, 'error')
  }
}

export const _removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user')
  } catch (error) {
    console.log(error, 'error')
  }
}

export const _storeShoppingCart = async (shoppingCart) => {
  try {
    const user = await _retrieveUser()
    const previusShoppingCart = await _retrieveShoppingCart()
    if (previusShoppingCart) {
      const userHasShoppingCart = previusShoppingCart.find(item => item.userId === user.id)
      if (userHasShoppingCart) {
        const productAlreadyInShoppingCart = userHasShoppingCart.products.find(item => item.id === shoppingCart.id)
        if (productAlreadyInShoppingCart) {
          const newShoppingCart = {
            userId: user.id,
            totalItems: userHasShoppingCart.totalItems,
            totalPrice: userHasShoppingCart.totalPrice + (shoppingCart.price * shoppingCart.quantity) - (productAlreadyInShoppingCart.price * productAlreadyInShoppingCart.quantity),
            products: userHasShoppingCart.products.map(item => item.id === shoppingCart.id ? shoppingCart : item)
          }
          const newShoppingCartArray = previusShoppingCart.map(item => item.userId === user.id ? newShoppingCart : item)
          await AsyncStorage.setItem('shoppingCart', JSON.stringify(newShoppingCartArray))
        } else {
          const newShoppingCart = {
            userId: user.id,
            totalItems: userHasShoppingCart.totalItems + 1,
            totalPrice: userHasShoppingCart.totalPrice + (shoppingCart.price * shoppingCart.quantity),
            products: [...userHasShoppingCart.products, shoppingCart]
          }
          const newShoppingCartArray = previusShoppingCart.map(item => item.userId === user.id ? newShoppingCart : item)
          await AsyncStorage.setItem('shoppingCart', JSON.stringify(newShoppingCartArray))
        }
      } else {
        const newShoppingCart = {
          userId: user.id,
          totalItems: 1,
          totalPrice: shoppingCart.price * shoppingCart.quantity,
          products: [shoppingCart]
        }
        const newShoppingCartArray = [...previusShoppingCart, newShoppingCart]
        await AsyncStorage.setItem('shoppingCart', JSON.stringify(newShoppingCartArray))
      }
    } else {
      const newShoppingCart = [{
        userId: user.id,
        totalItems: 1,
        totalPrice: shoppingCart.price * shoppingCart.quantity,
        products: [shoppingCart]
      }]
      await AsyncStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart))
    }
  } catch (error) {
    console.log(error, 'error')
  }
}

export const _retrieveShoppingCart = async () => {
  try {
    const value = await AsyncStorage.getItem('shoppingCart')
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (error) {
    console.log(error, 'error')
  }
}

export const _retrieveShoppingCartByUser = async () => {
  const { id } = await _retrieveUser()
  try {
    const shoppingCart = await _retrieveShoppingCart()
    if (shoppingCart) {
      return shoppingCart.find(item => item.userId === id)
    }
  } catch (error) {
    console.log(error, 'error')
  }
}

export const _removeShoppingCart = async () => {
  try {
    await AsyncStorage.removeItem('shoppingCart')
  } catch (error) {
    console.log(error, 'error')
  }
}

export const _removeProductFromShoppingCart = async (productId) => {
  try {
    const user = await _retrieveUser()
    const shoppingCart = await _retrieveShoppingCart()
    const userHasShoppingCart = shoppingCart.find(item => item.userId === user.id)
    const productToRemove = userHasShoppingCart.products.find(item => item.id === productId)
    const newShoppingCart = {
      userId: user.id,
      totalItems: userHasShoppingCart.totalItems - 1,
      totalPrice: userHasShoppingCart.totalPrice - (productToRemove.price * productToRemove.quantity),
      products: userHasShoppingCart.products.filter(item => item.id !== productId)
    }
    const newShoppingCartArray = shoppingCart.map(item => item.userId === user.id ? newShoppingCart : item)
    await AsyncStorage.setItem('shoppingCart', JSON.stringify(newShoppingCartArray))
  } catch (error) {
    console.log(error, 'error')
  }
}

export const _updateProductFromShoppingCart = async (product) => {
  try {
    const user = await _retrieveUser()
    const shoppingCart = await _retrieveShoppingCart()
    const userHasShoppingCart = shoppingCart.find(item => item.userId === user.id)
    const productToUpdate = userHasShoppingCart.products.find(item => item.id === product.id)
    const newShoppingCart = {
      userId: user.id,
      totalItems: userHasShoppingCart.totalItems,
      totalPrice: userHasShoppingCart.totalPrice - (productToUpdate.price * productToUpdate.quantity) + (product.price * product.quantity),
      products: userHasShoppingCart.products.map(item => item.id === product.id ? product : item)
    }
    const newShoppingCartArray = shoppingCart.map(item => item.userId === user.id ? newShoppingCart : item)
    await AsyncStorage.setItem('shoppingCart', JSON.stringify(newShoppingCartArray))
  } catch (error) {
    console.log(error, 'error')
  }
}
