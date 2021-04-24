import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import SplashScreen from 'react-native-splash-screen'
import { MobXProviderContext, useObserver } from 'mobx-react'
import { ApolloProvider } from '@apollo/react-hooks'
import { clientConnection } from '@tools'
import { StyleSheet } from 'react-native'
import { __appConstant } from '../../constants'
import RoutersNoConnection from './routersNoConnection'
import RoutersConnection from './routersConnection'
import Notification from '../../components2/Notification'

/**
 * @desc context app
 */

const AppContent = memo(() => {
  return useObserver(() => {
    const refNoti = useRef(null)
    const { store } = useContext(MobXProviderContext)

    const notify = useCallback(async (noti) => {
      await refNoti.current?.setState(noti)
      await refNoti.current?.open()
    }, [refNoti])

    useEffect(() => {
      SplashScreen.hide()
    }, [])

    if (!store.connection.server) {
      return (
        <AppContext.Provider value={{ notify }}>
          <>
            <Notification
              ref={refNoti}
            />
            <RoutersNoConnection />
          </>
        </AppContext.Provider>
      )
    }
    return (
      <ApolloProvider
        client={clientConnection(store.connection.server + '/graphq')}
      >
        <>
          <Notification
            ref={refNoti}
          />
          <RoutersConnection />
        </>
      </ApolloProvider>
    )
  })
})

export const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: '#e8e9eb',
    borderWidth: 0,
  },
  titleStyle: {
    width: '80%',
    color: '#4893bf',
    position: 'relative',
    textAlign: 'center',
    paddingRight: 35,
  },
  warpper: {
    display: 'flex',
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  loading: {
    height: '100%',
    width: '100%',
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AppContent
