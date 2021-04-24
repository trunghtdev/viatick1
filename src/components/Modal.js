import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { useObserver } from 'mobx-react'
import { Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import debounce from 'lodash.debounce'
import { View } from 'native-base'

function ModalSMH({ children, transparent, containerStyle }, ref) {
  return useObserver(() => {
    const [open, setOpen] = useState(false)
    const toggle = useCallback(() => {
      setOpen(p => !p)
    }, [])

    useImperativeHandle(ref, () => ({
      toggle
    }), [])

    return (
      <Modal
        animationType='slide'
        statusBarTranslucent
        transparent={transparent}
        visible={open}
      >
        <TouchableWithoutFeedback
          onPressIn={debounce(toggle, 300, { leading: true, trailing: false })}
        >
          <View
            style={[styles.container, containerStyle]}
          >
            {children}
          </View>
        </TouchableWithoutFeedback >
      </Modal>
    )
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(196, 196, 196, 0.3)'
  }
})

const CustomModalSMH = forwardRef(ModalSMH)

export default CustomModalSMH