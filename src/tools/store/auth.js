import { action, observable } from 'mobx'
import { localStoragePropertiesName } from '../../constants'
import AsyncStorage from '@react-native-community/async-storage'

class Auth {
  constructor(
    Store,
    token,
    tokenViaTickBMS,
    expireTokenViaTickBMSAt,
    tokenTypeViaTickBMS
  ) {
    this.Store = Store
    // my server
    this.token = token
    this.isAuthenticated = !!token
    // viatick BMS
    this.tokenViaTickBMS = tokenViaTickBMS
    this.expireTokenViaTickBMSAt = expireTokenViaTickBMSAt
    this.tokenTypeViaTickBMS = tokenTypeViaTickBMS
  }

  @observable
  Store = undefined

  @observable
  tokenViaTickBMS = undefined

  @observable
  token = undefined

  @observable
  isAuthenticated = undefined

  @observable
  expireTokenViaTickBMSAt = undefined

  @observable
  tokenTypeViaTickBMS = undefined

  @action.bound
  loginViaTickBMS = async () => {
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
      this.tokenViaTickBMS = dataToken?.access_token
      this.tokenTypeViaTickBMS = dataToken?.token_type
      // expireAt
      const today = new Date()
      today.setHours(today.getHours() + (dataToken?.expires_in / 3600))
      this.expireTokenViaTickBMSAt = +today

      // save to localstoage
      await AsyncStorage.setItem(localStoragePropertiesName.authorizationViatickBMS, dataToken?.access_token)
      await AsyncStorage.setItem(localStoragePropertiesName.expireTokenViaTickBMSAt, `${+today}`)
      await AsyncStorage.setItem(localStoragePropertiesName.tokenTypeViaTickBMS, dataToken?.token_type || '')
    } catch (err) {
      console.log({ err })
    }
  }

  @action.bound
  login = async (token) => {
    this.token = token
    this.isAuthenticated = !!token
    await AsyncStorage.setItem(localStoragePropertiesName.authorization, token)
  }

  @action.bound
  logout = async () => {
    this.token = null
    this.isAuthenticated = false
    // viatick BMS
    this.tokenViaTickBMS = null
    this.expireTokenViaTickBMSAt = null
    this.tokenTypeViaTickBMS = null

    await AsyncStorage.clear()
  }
}

export { Auth }
