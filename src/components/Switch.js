import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { useObserver } from 'mobx-react'
import { Switch } from 'native-base'

function SwitchSMH(props, ref) {
  return useObserver(() => {
    const [state, setState] = useState({
      value: false,
      error: null,
      success: null
    })

    useImperativeHandle(ref, () => ({
      value: state.value,
      setState
    }), [])

    const changeValue = useCallback((val) => {
      setState({ value: val })
    }, [])

    return (
      <Switch
        value={state.value}
        thumbColor='#fff'
        trackColor={{ true: '#13D327', false: "rgba(0, 0, 0, 0.24)" }}
        onValueChange={changeValue}
      />
    )
  })
}

const CustomSwitchSMH = forwardRef(SwitchSMH)

export default CustomSwitchSMH