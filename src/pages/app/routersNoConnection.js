import React, { memo, useContext } from 'react'
// import { MenuContext } from '../../components'
import { StatusBar } from 'react-native'
import { routersNoConnection } from '../../configs'
import { Router, Scene } from 'react-native-router-flux'
import { styles } from './index'
import Header from '../../components/Header'

StatusBar.setHidden(true)

const RoutersNoConnection = memo(() => {
  return (
    <>
      <Router>
        <Scene
          hideNavBar={true}
          titleStyle={styles.titleStyle}
          navigationBarStyle={styles.navigationBarStyle}
          key="app">
          {routersNoConnection
            .map(route => {
              return (
                <Scene
                  hideBackImage
                  // renderLeftButton={LeftButton}
                  key={route.key}
                  path={route.path}
                  component={route.Component}
                  title={route.title}
                  navBar={Header}
                  hideNavBar={route.hideNavBar}
                  initial={route.initial}
                />
              )
            })}
        </Scene>
      </Router>
    </>
  )
})

export default RoutersNoConnection