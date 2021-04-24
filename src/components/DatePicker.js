import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { DatePicker, Label, Item, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import { useObserver } from 'mobx-react'
import { useTranslation } from 'react-i18next'


import { normalize } from '../../native-base-theme/variables/normalize'

function DatePickerSMH({ placeholder, regular, style, label, defaultValue }, ref) {
  return useObserver(() => {
    const refDatePicker = useRef(null)

    const [state, setState] = useState({
      error: false,
      success: false,
      value: null
    })
    const { i18n } = useTranslation()

    const changeDate = useCallback((date) => {
      setState(p => ({ ...p, value: date }))
    }, [])

    const pressItem = useCallback(() => {
      refDatePicker.current.showDatePicker()
    }, [refDatePicker])

    useImperativeHandle(ref, () => ({
      value: state.value,
      error: state.error,
      setState: setState
    }), [state])

    return (
      <Item
        onPress={pressItem}
        stackedLabel={!!label}
        style={[styles.item, style]}
        regular={!!regular}
        error={!!state.error}
      >
        {!!label && (<Label style={[styles.label]}>{label}</Label>)}
        <DatePicker
          ref={refDatePicker}
          onDateChange={changeDate}
          defaultDate={defaultValue || (new Date())}
          placeHolderText={placeholder}
          animationType='slide'
          locale={i18n.language}
          textStyle={[styles.txt]}
          placeHolderTextStyle={[styles.placeHolderText]}
        />
        {!!state.error && (<Text style={[styles.txtError]}>{t(state.error)}</Text>)}
      </Item>
    )
  })
}

const styles = StyleSheet.create({
  wrapper: {

  },
  placeHolderText: {
  },
  txt: {
  },
  label: {
    fontSize: normalize(13),
    color: '#C4C4C4'
  },
  item: {
    width: '100%',
    justifyContent: "center",
    alignItems: "flex-start"
  },
  txtError: {
    color: '#E51616',
    marginLeft: normalize(10)
  },
  icon: {
    width: 5,
    height: 5
  }
})

const CustomDatePickerSMH = forwardRef(DatePickerSMH)

export default CustomDatePickerSMH