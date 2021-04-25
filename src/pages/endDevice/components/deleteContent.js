import { View } from 'native-base'
import React, { forwardRef, useCallback, useContext } from 'react'
import { StyleSheet, Text } from 'react-native'
import { useObserver } from 'mobx-react-lite'
import { MobXProviderContext } from 'mobx-react'
import Orientation from 'react-native-orientation-locker'

import { AppContext } from '../../app'
import { useDeviceQuery } from '../../../queries-hooks/useDeviceQuery'
import Button from '../../../components/Button'
import { Actions } from 'react-native-router-flux'

const DeleteDeviceContent = forwardRef(({ toggle }, ref) => {
  return useObserver(() => {
    const { store } = useContext(MobXProviderContext)
    const { deleteDevices } = useDeviceQuery()
    const { notify } = useContext(AppContext)
    const onDelete = useCallback(async () => {
      try {
        if (!!store?.global?.device) {
          const { data } = await deleteDevices({
            deviceIds: [store?.global?.device?.deviceId]
          })

          if (data.deleteDevices?.rows_deleted > 0) {
            await store?.objects?.setDevices(p => {
              if (!p) {
                return p
              }
              delete p[store?.global?.device?.deviceId]
              return p
            })
            await store?.global?.setDevice(undefined)
            toggle && await toggle()
            await Orientation.lockToPortrait()
            Actions.pop()
          }
        }
      } catch (err) {
        notify({
          title: "Error",
          message: err.message,
          error: true
        })
      }
    }, [deleteDevices, store?.global?.device, toggle])
    return (
      <View
        style={[styles.container]}
      >
        <Text>Do you want to delete this device?</Text>
        <View
          style={[styles.actions]}
        >
          <Button
            onPress={onDelete}
            style={styles.btnDel}
            wrapperStyle={styles.btn}
            text="Delete"
          />
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
  btn: {

  },
  btnDel: {

  },
  btnCancle: {

  }
})

export default DeleteDeviceContent