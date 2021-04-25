import React, { memo, useState, useCallback, useEffect, useContext } from 'react'
import { View } from 'native-base'
import { useObserver } from 'mobx-react-lite'
import { StyleSheet, FlatList } from 'react-native'

import { useDeviceQuery } from '../../queries-hooks/useDeviceQuery'
import DeviceItem from './components/DeviceItem'
import { MobXProviderContext } from 'mobx-react'

const Home = memo(() => {
  return useObserver(() => {
    const { store } = useContext(MobXProviderContext)
    const { dataSensorsWithIOT, getSensorsWithIOT, getModel, dataModel } = useDeviceQuery()
    const [sizeDeviceItem, setSizeDeviceItem] = useState({
      height: 500,
      width: 200
    })

    const onLayoutContainer = useCallback((e) => {
      const { width, height } = e.nativeEvent.layout
      setSizeDeviceItem({
        height: (height / 2) - 10,
        width: (width / 2) - 10,
      })
    }, [sizeDeviceItem])

    useEffect(() => {
      if (!store?.global?.model) getModel({ modelId: 19 })
    }, [getModel, store?.global?.model])

    useEffect(() => {
      if (!!dataModel && !store?.global?.model) store?.global?.setModel(dataModel?.getModel)
    }, [dataModel, store?.global?.model])

    useEffect(() => {
      if (!store?.objects?.devices) getSensorsWithIOT({})
    }, [getSensorsWithIOT, store?.objects?.devices])

    useEffect(() => {
      if (!!dataSensorsWithIOT &&
        !store?.objects?.devices) {
        store?.objects?.setDevices(() => dataSensorsWithIOT?.getSensorsWithIOT?.reduce((obj, item) => {
          obj[item.deviceId] = item
          return obj
        }, {}))
      }
    }, [store?.objects?.devices, dataSensorsWithIOT])

    return (
      <View
        style={[styles.container]}
        onLayout={onLayoutContainer}
      >
        <FlatList
          numColumns={2}
          data={store?.objects?.devices ? Object.values(store?.objects?.devices) : []}
          extraData={[store?.objects?.devices, store?.global?.device]}
          renderItem={({ item, index }) => {
            return (<DeviceItem device={item} key={index} wrapperStyle={{ ...styles.device, ...sizeDeviceItem }} />)
          }}
        />
      </View>
    )
  })
})

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  device: {
    margin: 5
  },
})

export default Home