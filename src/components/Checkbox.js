import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
// import { CheckBox } from 'native-base'
import PropTypes from 'prop-types'
import CheckBox from '@react-native-community/checkbox'
import debounce from 'lodash.debounce'

CheckboxSMH.propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.string,
  onPress: PropTypes.func
}

function CheckboxSMH(props, ref) {
  const [state, setState] = useState({
    checked: true,
    error: null,
    success: null,
  })

  useImperativeHandle(ref, () => ({
    checked: state.checked,
    error: state.error,
    success: state.success,
    setState
  }), [state])

  const onPress = useCallback(async (val) => {
    console.log({ val })
    props.onPress && props.onPress(val)
    await setState({ checked: val })
  }, [props.onPress])

  return (
    <CheckBox
      value={state.checked}
      color={props.color}
      onValueChange={debounce(onPress, 300, { leading: true, trailing: false })}
    />
  )
}

const CustomCheckboxSMH = forwardRef(CheckboxSMH)

export default CustomCheckboxSMH