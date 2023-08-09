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
