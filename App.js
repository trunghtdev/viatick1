/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { useEffect, useState, Suspense } from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Provider as MobxProvider } from 'mobx-react'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from '@react-native-community/geolocation';
import { StyleProvider } from 'native-base'
import moment from 'moment'

import { __appConstant } from './src/constants'
import AppContent from './src/pages/app'
import { Store, Auth, Connection } from './src/tools'
import { localStoragePropertiesName } from './src/constants'
import en from './src/configs/i18n/en.json'
import vi from './src/configs/i18n/vi.json'

import getTheme from './native-base-theme/components'
import material from './native-base-theme/variables/material'


const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('en'),
  init: () => { },
  cacheUserLanguage: () => { }
}

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // use en if detected lng is not available
    debug: true,
    resources: {
      en: {
        translation: en
      },
      vi: {
        translation: vi
      }
    }
  })

const configMaps = {
  skipPermissionRequests: true,
  authorizationLevel: 'whenInUse'
}
Geolocation.setRNConfiguration(configMaps)

const App = () => {
  const [store, setStore] = useState(null)

  const getAndStoreGlobalConfig = async () => {
    try {
      const server = await AsyncStorage.getItem(localStoragePropertiesName.server) || 'http://172.168.1.79:19021'

      const expireTokenViaTickBMSAt = await AsyncStorage.getItem(localStoragePropertiesName.expireTokenViaTickBMSAt)
      const tokenTypeViaTickBMS = await AsyncStorage.getItem(localStoragePropertiesName.tokenTypeViaTickBMS)
      const authorizationViatickBMS = await AsyncStorage.getItem(localStoragePropertiesName.authorizationViatickBMS)
      const authorization = await AsyncStorage.getItem(localStoragePropertiesName.authorization)

      const tStore = new Store()
      const auth = new Auth(tStore, authorization, authorizationViatickBMS, tokenTypeViaTickBMS, expireTokenViaTickBMSAt)
      const connection = new Connection(tStore, server)
      tStore.setAuth(auth)
      tStore.setConnection(connection)
      setStore(tStore)
    } catch (err) {
      console.log({ err })
    }
  }

  useEffect(() => {
    getAndStoreGlobalConfig()
  }, [])

  useEffect(() => {
    if (!!store) {
      const reLoginWhenTokenExpire = async () => {
        const expireAtSavedLocal = await AsyncStorage.getItem(localStoragePropertiesName.expireTokenViaTickBMSAt)
        if (!!expireAtSavedLocal) {
          const date = moment(parseFloat(expireAtSavedLocal))
          console.log({ 'date': moment(Date.now()).format() })
          if (Date.now() >= date.valueOf()) {
            store.auth.loginViaTickBMS()
            clearInterval(interval)
            interval = setInterval(() => reLoginWhenTokenExpire(), 1000)
          }
        } else {
          store.auth.login()
        }
      }
      const interval = setInterval(() => reLoginWhenTokenExpire(), 1000)
      return () => {
        if (interval) {
          clearInterval(interval)
        }
      }
    }
  }, [store])

  return (
    store && <Suspense fallback={null}>
      <MobxProvider {...{ store }}>
        <StyleProvider style={getTheme(material)}>
          <AppContent />
        </StyleProvider>
      </MobxProvider>
    </Suspense>
  )
}

export default App