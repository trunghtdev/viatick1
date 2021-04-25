import React, { memo, useCallback, useState, useRef, useEffect, useContext } from 'react'
import { useObserver } from 'mobx-react'
import { View, Text, Form } from 'native-base'
import { StyleSheet } from "react-native";
import { Actions } from 'react-native-router-flux'

import { emailValidator, passwordValidator, phoneNumberValidator } from '../../utils'
import { normalize } from '../../../native-base-theme/variables/normalize'
import { useTranslation } from 'react-i18next'
import { __appConstant } from '../../constants'
import { useUserQuery } from '../../queries-hooks/useUserQuery'

import Input from '../../components/Input'
import PickerInput from '../../components/PickerInput'
import CheckBox from '../../components/Checkbox'
import Button from '../../components/Button'
import { AppContext } from '../app'

const { TYPE_INPUT } = __appConstant
const fields = {
  emailOrPhone: 'emailOrPhone',
  pass: 'password',
  repeatPass: 'repeatPass',
  countryOrRegion: 'countryOrRegion',
  email: "email",
  phonenumber: "phonenumber"
}

const SignUp = memo(() => {
  return useObserver(() => {
    const refs = {
      emailOrPhone: useRef(null),
      pass: useRef(null),
      repeatPass: useRef(null),
      countryOrRegion: useRef(null),
    }
    const { regist } = useUserQuery()

    const { notify } = useContext(AppContext)

    const { t } = useTranslation()

    const repeatPassValidator = useCallback((txt) => {
      let error = null,
        valid = true
      if (refs.pass.current?.value !== txt) {
        error = 'app.pages.signup.repeatPass.notMatch'
        valid = false
      }
      return {
        valid: !!valid,
        message: error
      }
    }, [refs])

    const [inputs, setInputs] = useState([
      {
        type: TYPE_INPUT.Input,
        field: fields.emailOrPhone,
        placeholder: "app.pages.signup.emailOrPhone.placeholder",
        keyboardType: 'email-address',
        ref: refs.emailOrPhone,
        validator: (value) => {
          if (!value.match(/^[0-9]*$/)) {
            return emailValidator(value)
          } else {
            return phoneNumberValidator(value)
          }
        }
      },
      {
        type: TYPE_INPUT.Input,
        field: fields.pass,
        placeholder: "app.pages.signup.pass.placeholder",
        keyboardType: 'default',
        secureTextEntry: true,
        ref: refs.pass,
        validator: passwordValidator
      },
      {
        type: TYPE_INPUT.Input,
        field: fields.repeatPass,
        placeholder: "app.pages.signup.repeatPass.placeholder",
        keyboardType: 'default',
        secureTextEntry: true,
        ref: refs.repeatPass,
        validator: repeatPassValidator
      },
      {
        type: TYPE_INPUT.PickerInput,
        field: fields.countryOrRegion,
        placeholder: "app.pages.signup.countryOrRegion.placeholder",
        keyboardType: 'default',
        ref: refs.countryOrRegion
      }
    ])

    // const [checkBoxTermAndLegal, setCheckBoxTermAndLegal] = useState(false)

    // const pressCheckBoxTermAndLegal = useCallback(() => {
    //   setCheckBoxTermAndLegal(p => !p)
    // }, [])

    const handlerContinue = useCallback(async () => {
      try {
        const convertInput = {}
        for (const input of inputs) {
          switch (input.field) {
            case fields.emailOrPhone:
              if (!input.ref.current.value.match(/^[0-9]*$/)) {
                convertInput[fields.email] = input.ref.current?.value.toLowerCase()
              } else {
                convertInput[fields.phonenumber] = input.ref.current?.value.toLowerCase()
              }
            case fields.pass:
              convertInput[fields.pass] = input.ref.current?.value
            default:
              break;
          }
        }
        await regist(convertInput)
        await notify({
          title: t('app.pages.signup.regist.title'),
          message: t('app.pages.signup.regist.message'),
          success: true
        })
        await Actions.login()
      } catch (err) {
        if (!!err.graphQLErrors) {
          for (const gqlErr of err.graphQLErrors) {
            notify({
              title: t('app.common.error.name'),
              error: t(gqlErr.message),
              error: true
            })
          }
        } else {
          notify({
            title: t('app.common.error.name'),
            error: t(err.message),
            error: true
          })
        }
      }
    }, [inputs, notify, refs])

    return (
      <View style={[styles.container]}>
        <View style={[styles.top, styles.center]}>
          <Text style={[styles.title]}>
            {t("app.pages.auth.signup")}
          </Text>
        </View>
        <View style={[styles.mid, styles.center]}>
          <Form>
            {Object.values(fields).map((field, idx) => {
              const input = inputs.find(i => i.field === field)
              if (!input) {
                return null
              }
              switch (input.type) {
                case TYPE_INPUT.Input:
                  return (
                    <Input
                      key={idx}
                      regular
                      ref={input.ref}
                      placeholder={t(input.placeholder)}
                      wrapperStyle={styles.wrapperInput}
                      keyboardType={input.keyboardType}
                      secureTextEntry={input.secureTextEntry}
                      validator={input.validator}
                    />
                  )
                case TYPE_INPUT.PickerInput:
                  return (
                    <PickerInput
                      key={idx}
                      regular
                      error={input.error && t(input.error)}
                      data={[
                        { label: "Vietname1", value: "456" },
                        { label: "Vietname2", value: "123" }
                      ]}
                      placeholder={t(input.placeholder)}
                      wrapperStyle={styles.wrapperPicker}
                    />
                  )

                default:
                  return null
              }
            })}
          </Form>
          <View style={[styles.termAndLegal, styles.center]}>
            <CheckBox />
            <Button
              style={[styles.center]}
              transparent
              text={(
                <>
                  <Text>
                    {t("app.common.agreeTo") + " "}
                  </Text>
                  {t('app.pages.signup.termAndLegal')}
                </>
              )}
            />
          </View>
        </View>
        <View style={[styles.bottom, styles.center]}>
          <Button
            onPress={handlerContinue}
            wrapperStyle={styles.btnContinue}
            text={t('app.common.continue')}
          />
        </View>
      </View>
    )
  })
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    flex: 1
  },
  mid: {
    flex: 2
  },
  bottom: {
    flex: 1,
    flexDirection: "row"
  },
  termAndLegal: {
    flexDirection: "row",
    marginTop: 20,
    maxWidth: "80%"
  },
  txtTermAndLegal: {
    marginLeft: 20,
  },
  btnContinue: {
    width: "80%"
  },
  txtTermAndLegalHighLight: {
    color: "#1B81F6"
  },
  title: {
    fontSize: normalize(36),
    fontWeight: 'bold'
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  wrapperInput: {
    width: "80%",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: normalize(15)
  },
  wrapperPicker: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: normalize(15)
  }
})

export default SignUp