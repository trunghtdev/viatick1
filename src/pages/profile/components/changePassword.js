import React, { forwardRef, useMemo, useRef } from 'react'
import { useObserver } from 'mobx-react'
import { View } from 'native-base'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import ProcessPassWeak from '../../../assets2/images/process-pass-weak.svg'
import { normalize } from '../../../../native-base-theme/variables/normalize'
import Input from '../../../components/Input'
import { __appConstant } from '../../../constants'

const { TYPE_INPUT } = __appConstant
const fields = {
  currentPassword: "currentPassword",
  newPassword: "newPassword",
  repeatNewPassword: "repeatNewPassword",
}
function ChangePassword() {
  return useObserver(() => {
    const refs = {
      currentPassword: useRef(null),
      newPassword: useRef(null),
      repeatNewPassword: useRef(null)
    }

    const { t } = useTranslation()

    const inputs = useMemo(() => [
      {
        type: TYPE_INPUT.Input,
        field: fields.currentPassword,
        label: 'app.pages.profile.pass.name',
        keyboardType: 'default',
        secureTextEntry: true,
        ref: refs.currentPassword,
        autoCompleteType: 'password'
      },
      {
        type: TYPE_INPUT.Input,
        field: fields.newPassword,
        label: 'app.pages.profile.newPass.name',
        keyboardType: 'default',
        secureTextEntry: true,
        ref: refs.newPassword,
        autoCompleteType: 'password',
        bottom: (<ProcessPassWeak />)
      },
      {
        type: TYPE_INPUT.Input,
        field: fields.repeatNewPassword,
        label: 'app.pages.profile.repeatNewPassword.name',
        keyboardType: 'default',
        secureTextEntry: true,
        ref: refs.repeatNewPassword,
        autoCompleteType: 'password'
      },
    ], [])

    return (
      <View
        style={[styles.container]}
      >
        {Object.keys(fields).map((field, idx) => {
          const input = inputs.find(i => i.field === field)
          switch (input.type) {
            case TYPE_INPUT.Input:
              return (<Input
                ref={input.ref}
                label={t(input.label)}
                keyboardType={input.keyboardType}
                autoCompleteType={input.autoCompleteType}
                secureTextEntry={input.secureTextEntry}
                bottom={input.bottom}
                key={idx}
              />)

            default:
              return null
          }
        })}
      </View>
    )
  })
}

const styles = StyleSheet.create({
  container: {
    padding: normalize(20),
    // paddingBottom: 0,
    // pBottom: normalize(10)
  }
})

const CustomChangePassword = forwardRef(ChangePassword)

export default CustomChangePassword