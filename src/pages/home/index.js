import React, { memo, useState, useCallback, useEffect } from 'react'
import { View } from 'native-base'
import { useObserver } from 'mobx-react-lite'
import { StyleSheet, FlatList } from 'react-native'

import { useDeviceQuery } from '../../queries-hooks/useDeviceQuery'
import DeviceItem from './components/DeviceItem'

const Home = memo(() => {
  return useObserver(() => {
    const { dataSensorsWithIOT, getSensorsWithIOT } = useDeviceQuery()
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
      console.log({ dataSensorsWithIOT })
    }, [dataSensorsWithIOT])

    useEffect(() => {
      getSensorsWithIOT()
    }, [getSensorsWithIOT])

    return (
      <View
        style={[styles.container]}
        onLayout={onLayoutContainer}
      >
        <FlatList
          numColumns={2}
          data={[1, 2, 3, 4, 5, 6]}
          // extraData={sizeDeviceItem}
          renderItem={({ item, index }) => {
            return (<DeviceItem key={index} wrapperStyle={{ ...styles.device, ...sizeDeviceItem }} />)
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