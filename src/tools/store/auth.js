import { action, observable } from 'mobx'
import { localStoragePropertiesName } from '../../constants'
import AsyncStorage from '@react-native-community/async-storage'

class Auth {
  constructor(
    Store,
    token,
    expireAt,
    tokenType
  ) {
    this.token = token
    this.expireAt = expireAt
    this.tokenType = tokenType
    this.isAuthenticated = !!token
    this.Store = Store
  }

  @observable
  Store = undefined

  @observable
  token = undefined

  @observable
  isAuthenticated = undefined

  @observable
  expireAt = undefined

  @observable
  tokenType = undefined

  @action.bound
  login = async () => {
    try {
      console.log("login called")
      const dataToken = await fetch('https://bms-api.viatick.com/main/api/oauth2/token', {
        method: 'POST',
        headers: {
          grant_type: "client_credentials",
          scope: "7c62db1cfb47550927b11191b7995f6cd482b7481fd0d98f1d8b403937b909f9"
        }
      }).then(data => data.json())
      // token
      this.token = dataToken?.access_token
      this.isAuthenticated = !!dataToken?.access_token
      this.tokenType = dataToken?.token_type
      // expireAt
      const today = new Date()
      today.setHours(today.getHours() + (dataToken?.expires_in / 3600))
      this.expireAt = +today

      // save to localstoage
      await AsyncStorage.setItem(localStoragePropertiesName.authorization, dataToken?.access_token)
      await AsyncStorage.setItem(localStoragePropertiesName.expireAt, `${+today}`)
      await AsyncStorage.setItem(localStoragePropertiesName.tokenType, dataToken?.token_type || '')
    } catch (err) {
      console.log({ err })
    }
  }

  @action.bound
  logout = async () => {
    this.isAuthenticated = false
    this.token = null
    this.expireAt = 0
  }
}

export { Auth }
