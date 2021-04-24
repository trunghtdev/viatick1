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
import Geolocation from '@react-native-community/geolocation';
import { StyleProvider } from 'native-base'

import { __appConstant } from './src/constants'
import AppContent from './src/pages/app'
import { Store } from './src/tools'
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