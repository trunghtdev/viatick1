import React, { useCallback, useEffect, useState } from 'react'
import { Item, View } from 'native-base'
import { ViewPropTypes, StyleSheet, TextPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { Picker } from '@react-native-picker/picker'

import { normalize } from '../../native-base-theme/variables/normalize'

PickerInputSMH.propTypes = {
  regular: PropTypes.bool,
  wrapperStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  textStyle: PropTypes.any,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any).isRequired
}

function PickerInputSMH(props) {
  const [state, setState] = useState({
    value: undefined,
    error: null,
    success: null
  })

  const changeValue = useCallback((itemValue, itemIndex) => {
    setState({ value: itemValue })
  }, [])

  useEffect(() => {
    if (!!props.style) {
      delete props.style.color
    }
  }, [props.style])

  return (
    <View
      style={[
        styles.container,
        props.regular && styles.regular || {},
        props.wrapperStyle || {}
      ]}
    >
      <Picker
        // style={{backgroundColor: "red"}}
        selectedValue={state.value}
        onValueChange={changeValue}
        mode='dropdown'
        style={props.style || {}}
        itemStyle={props.textStyle || {}}
      >
        {props.data.map((trans, idx) => {
          return (
            <Picker.Item key={idx} label={trans.label} value={trans.value} />
          )
        })}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  regular: {
    borderWidth: normalize(2.5),
    borderRadius: normalize(7),
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  container: {
    // padding: normalize(10)
  }
})

export default PickerInputSMH