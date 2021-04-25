import { action, observable } from 'mobx'
import { localStoragePropertiesName } from '../../constants'
import AsyncStorage from '@react-native-community/async-storage'

class Global {
  constructor(
    Store
  ) {
    this.Store = Store
  }

  @observable
  Store = undefined

  @observable
  device = undefined

  @observable
  model = undefined

  @action.bound
  setDevice = async (device) => {
    try {
      this.device = device
    } catch (err) {
      throw err
    }
  }

  @action.bound
  setModel = async (model) => {
    try {
      this.model = model
    } catch (err) {
      throw err
    }
  }

}

export { Global }
