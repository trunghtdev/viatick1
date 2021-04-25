import React, { forwardRef, useCallback, useContext, useState } from 'react'
import { MobXProviderContext, useObserver } from 'mobx-react'
import { View, Text } from 'native-base'
import { StyleSheet, TouchableOpacity } from 'react-native'
import debounce from 'lodash.debounce'
import Orientation from 'react-native-orientation-locker'

import CameraIcon from '../../../assets2/icons/device-camera.svg'
import OnOffIcon from '../../../assets2/icons/on-off.svg'
import Picker from '../../../components/PickerInput'
import { Actions } from 'react-native-router-flux'

function DeviceItem({ wrapperStyle, device }, ref) {
  return useObserver(() => {
    const [tDevice, setTDevice] = useState(device)
    const { store } = useContext(MobXProviderContext)
    const onPress = useCallback(() => {
      Orientation.lockToLandscape()
      store?.global?.setDevice(tDevice)
      Actions.sensorTemp()
    }, [tDevice])
    return (
      <TouchableOpacity
        onPress={debounce(onPress, 100, { leading: true, trailing: false })}
        style={[styles.container, wrapperStyle]}
      >
        <View
          style={[styles.top, styles.flexStyle]}
        >
          <View
            style={[styles.topLeft, styles.flexStyle, styles.center]}
          >
            <CameraIcon style={styles.icon} />
          </View>
          <View
            style={[styles.topRight, styles.flexStyle]}
          >
            <OnOffIcon style={styles.iconOnOff} />
          </View>
        </View>

        <View
          style={[styles.mid, styles.flexStyle]}
        >
          <View
            style={[styles.midTop, styles.flexStyle]}
          >
            <Text style={[styles.nameDevice]}>{tDevice?.name}</Text>
          </View>
          <View
            style={[styles.midTop, styles.flexStyle]}
          >
            {/* <Picker
              style={styles.picker}
              wrapperStyle={styles.wrapperPicker}
              data={[
                { label: "Living room", value: "1" },
                { label: "Bed room", value: "2" },
                { label: "Bath room", value: "3" }
              ]}
            /> */}
          </View>
        </View>

        <View
          style={[styles.bottom, styles.flexStyle]}
        >
          <Text style={[styles.txtDate]}>Last updated : 12 : 12 am</Text>
        </View>
      </TouchableOpacity>
    )
  })
}

const styles = StyleSheet.create({
  container: {
    // width: normalize(163),
    // height: normalize(229),
    backgroundColor: '#fff',
    // shadow
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {
      width: 20,
      height: 0
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 10
  },
  wrapperPicker: {
    width: "100%"
  },
  picker: {
    // color: 'rgba(0, 0, 0, 0.5)'
  },
  top: {
    flexDirection: 'row'
  },
  topLeft: {

  },
  topRight: {
    justifyContent: "center",
    alignItems: "flex-end"
  },
  mid: {

  },
  midTop: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  midBottom: {

  },
  bottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20
  },
  txtDate: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontStyle: 'italic'
  },
  nameDevice: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10
  },
  center: {
    justifyContent: "center",
    alignItems: 'center'
  },
  flexStyle: {
    flex: 1
  },
  icon: {
    width: 54,
    height: 46,
    marginLeft: 10
  },
  iconOnOff: {
    width: 22,
    height: 20,
    marginRight: 10
  }
})
const DeviceItemCustom = forwardRef(DeviceItem)
export default DeviceItemCustom