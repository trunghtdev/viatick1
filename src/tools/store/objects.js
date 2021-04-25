import { action, observable } from 'mobx'
import { localStoragePropertiesName } from '../../constants'
import AsyncStorage from '@react-native-community/async-storage'

class Objects {
  constructor(
    Store,
  ) {
    this.Store = Store
  }

  @observable
  Store = undefined

  @observable
  devices = undefined

  @observable
  deviceIds = undefined


  @action.bound
  setDevices = async (callback) => {
    try {
      this.devices = await callback(this.devices)
    } catch (err) {
      throw err
    }
  }

  @action.bound
  setDeviceIds = async (callback) => {
    try {
      this.deviceIds = await callback(this.deviceIds)
    } catch (err) {
      throw err
    }
  }

}

export { Objects }
