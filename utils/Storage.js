// import AsyncStorage from '@react-native-community/async-storage'
import { AsyncStorage } from 'react-native'

export default {
  async get(key) {
    const v = await AsyncStorage.getItem(key)
    return JSON.parse(v)
  },
  async set(key, value) {
    return await AsyncStorage.setItem(key, JSON.stringify(value))
  },
  async update(key, value) {
    const prev = await this.get(key)
    const next = Object.assign({}, prev, value)

    return await this.set(key, prev)
  },
  async delete(key) {
    return await AsyncStorage.removeItem(key)
  }
}
