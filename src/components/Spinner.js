import React, { forwardRef } from 'react'
import { useObserver } from 'mobx-react'
import { Spinner } from 'native-base'

function SpinnerSMH() {
  return useObserver(() => {
    return (
      <Spinner
        color='#1B81F6'
      />
    )
  })
}

const CustomSpinnerSMH = forwardRef(SpinnerSMH)
export default CustomSpinnerSMH