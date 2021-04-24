import React, { forwardRef, useCallback, useMemo, useImperativeHandle, useState, useEffect } from 'react'
import { useObserver } from 'mobx-react'
import { StyleSheet, Animated, Easing } from 'react-native'
import { Text, View } from 'native-base'

import SuccessIcon from '../assets2/icons/success.svg'
import ErrorIcon from '../assets2/icons/error.svg'
import WarningIcon from '../assets2/icons/warning.svg'
import { normalize } from '../../native-base-theme/variables/normalize'
import useDimensions from 'react-native-use-dimensions'

Notification.propTypes = {
}

function Notification(props, ref) {
  return useObserver(() => {
    const { screen } = useDimensions()
    const ani = useMemo(() => new Animated.Value(0), [])
    const [notification, setNotification] = useState({
      message: "",
      title: ""
    })

    useImperativeHandle(ref, () => ({
      open: async () => {
        await ani.setValue(0)
        await Animated.timing(ani, {
          toValue: 1,
          duration: 700,
          easing: Easing.bounce,
          useNativeDriver: false
        }).start(({ finished }) => {
          if (finished) {
            ani.setValue(1)
            Animated.timing(ani, {
              toValue: 0,
              duration: 400,
              delay: 1500,
              useNativeDriver: false
            }).start()
          }
        })
      },
      setState: async (noti) => {
        await setNotification(noti)
      }
    }), [ani])

    return (
      <View
        style={[
          styles.container
        ]}
      >
        <Animated.View style={[
          styles.wrapper,
          styles.center,
          notification.success ? styles.success : null,
          notification.warning ? styles.warning : null,
          notification.error ? styles.error : null,
          {
            width: (screen.width / 100) * 90,
            transform: [{
              translateX: ani.interpolate({
                inputRange: [0, 1],
                outputRange: [screen.width, (screen.width / 100) * 10]
              })
            }]
          }
        ]}>
          {notification.success && (<SuccessIcon style={[styles.icon]} />)}
          {notification.warning && (<WarningIcon style={[styles.icon]} />)}
          {notification.error && (<ErrorIcon style={[styles.icon]} />)}
          <View style={[styles.content]}>
            <Text
              style={[styles.title, styles.text]}
            >
              {notification.title}
            </Text>
            <Text
              style={[styles.message, styles.text]}
            >
              {notification.message}
            </Text>
          </View>
        </Animated.View>
      </View>
    )
  })
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "50%",
    zIndex: 100000,
    width: "100%",
  },
  wrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRightWidth: 0,
    paddingRight: normalize(20),
    borderBottomStartRadius: normalize(20),
    borderTopStartRadius: normalize(20),
    backgroundColor: "#fff",
  },
  success: {
    borderColor: "#1B9359"
  },
  error: {
    borderColor: "#E51616"
  },
  warning: {
    borderColor: "#DFE30E"
  },
  title: {
    fontWeight: 'bold',
    fontSize: normalize(12),
    lineHeight: normalize(14)
  },
  message: {
    fontSize: normalize(10),
    lineHeight: normalize(12)
  },
  text: {
    textAlign: 'justify',
  },
  content: {
    flex: 1,
    paddingBottom: normalize(5),
    paddingTop: normalize(5),
    position: "relative",
    alignSelf: "center"
  },
  icon: {
    marginLeft: normalize(10),
    marginRight: normalize(10),
    marginTop: normalize(11),
    marginBottom: normalize(11),

    height: normalize(16),
    width: normalize(13)
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  }
})

export default forwardRef(Notification)