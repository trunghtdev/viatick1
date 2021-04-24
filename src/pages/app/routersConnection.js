import React, { memo, useContext, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { MenuContext } from '../../components'
import { routersConnection } from '../../configs'
import { __appConstant } from '../../constants'
import { Router, Scene } from 'react-native-router-flux'
import { styles } from './index'
import { MobXProviderContext, useObserver } from 'mobx-react'

import Header from '../../components2/Header'
import Footer from '../../components2/Footer'

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