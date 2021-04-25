import React, { memo, useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { routersConnection } from '../../configs'
import { __appConstant } from '../../constants'
import { Router, Scene } from 'react-native-router-flux'
import { styles } from './index'
import { MobXProviderContext, useObserver } from 'mobx-react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

StatusBar.setHidden(true)
const RoutersConnetcion = memo(() => {
  return useObserver(() => {
    const { store } = useContext(MobXProviderContext)

    return (
      <Router>
        <Scene
          // hideNavBar={true}
          tabs
          tabBarComponent={Footer}
          titleStyle={styles.titleStyle}
          navigationBarStyle={styles.navigationBarStyle}
          key="app"
        >

          {/**
          * @desc define screens app
          */}
          {routersConnection
            .map(route => {
              let initial = false
              switch (route.key) {
                case 'auth':
                  console.log({ 'store.auth.isAuthenticated': store.auth.isAuthenticated })
                  if (!store.auth.isAuthenticated) {
                    initial = true
                  }
                  break;
                case 'home':
                  console.log({ 'store.auth.isAuthenticated': store.auth.isAuthenticated })
                  if (store.auth.isAuthenticated) {
                    initial = true
                  }
                  break;

                default:
                  break;
              }
              return {
                ...route,
                initial
              }
            })
            .map(route => {
              return (
                <Scene
                  hideBackImage
                  key={route.key}
                  path={route.path}
                  component={route.Component}
                  title={route.title}
                  navBar={Header}
                  hideTabBar={route.hideTabBar}
                  hideNavBar={route.hideNavBar}
                  initial={route.initial}
                />
              )
            })}
        </Scene>
      </Router>
    )
  })
})

export default RoutersConnetcion