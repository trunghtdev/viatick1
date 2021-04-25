import { View, Text } from 'native-base'
import React, { forwardRef, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { StyleSheet } from 'react-native'
import Orientation from 'react-native-orientation-locker'

import { __appConstant } from '../../../constants'
import { useDeviceQuery } from '../../../queries-hooks/useDeviceQuery'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { MobXProviderContext, useObserver } from 'mobx-react'
import { Actions } from 'react-native-router-flux'

const { TYPE_INPUT } = __appConstant
const fields = {
  name: 'name'
}

const UpdateDeviceContent = forwardRef(({ toggle }) => {
  return useObserver(() => {
    const refs = {
      name: useRef(null)
    }

    const inputName = useMemo(() => ({
      type: TYPE_INPUT.Input,
      field: fields.name,
      label: 'Name',
      placeholder: 'Name device',
      ref: refs.name
    }), [store?.global?.device])

    const { store } = useContext(MobXProviderContext)

    const { updateDevices } = useDeviceQuery()

    const updateHandler = useCallback(async () => {
      try {
        console.log({
          'store?.global?.device': store?.global?.device
        })
        if (!store?.global?.device || !refs.name.current) {
          return
        }
        console.log({
          deviceId: store?.global?.device?.deviceId,
          name: refs.name.current?.value
        })
        const { data } = await updateDevices({
          input: {
            deviceId: store?.global?.device?.deviceId,
            name: refs.name.current?.value
          }
        })

        await store?.global?.setDevice(data?.updateDevice)

        await store?.objects?.setDevices(p => {
          p[store?.global?.device?.deviceId][fields.name] = data?.updateDevice[fields.name]
          return p
        })
        toggle && await toggle()
      } catch (err) {
        console.log({ err })
      }
    }, [updateDevices, , store?.global?.device, refs.name.current, toggle])

    return (
      <View
        style={[styles.container]}
      >
        <Input
          {...inputName}
          defaultValue={store?.global?.device?.name}
        />
        <View
          style={[styles.actions]}
        >
          <Button onPress={updateHandler} text='Update' />
        </View>
      </View>
    )
  })
})
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: 330,
    alignSelf: 'center'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20
  },
  input: {

  }
})

export default UpdateDeviceContent