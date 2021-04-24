import { action, observable } from 'mobx'
import { localStoragePropertiesName } from '../../constants'
import AsyncStorage from '@react-native-community/async-storage'

class Connection {
  constructor(
    Store,
    server
  ) {
    this.server = server
    this.Store = Store
  }

  @observable
  Store = undefined

  @observable
  server = undefined


  @action.bound
  setServer = async (server) => {
    try {
      this.server = server
      await AsyncStorage.setItem(localStoragePropertiesName.server, server)
    } catch (err) {
      throw err
    }
  }

}

export { Connection }
