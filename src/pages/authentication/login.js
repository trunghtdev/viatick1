import React, { memo, useCallback, useRef, useContext, useMemo } from 'react'
import { useObserver } from 'mobx-react'
import { View, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { MobXProviderContext } from 'mobx-react'

import HomeIcon from '../../assets2/icons/home.svg'
import LockIcon from '../../assets2/icons/lock.svg'

import { useUserQuery } from '../../queries-hooks/useUserQuery'
import { __appConstant } from '../../constants'
import { normalize } from '../../../native-base-theme/variables/normalize'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { AppContext } from '../../pages/app'

const { TYPE_INPUT } = __appConstant
const fields = {
  account: "account",
  password: "password"
}

const Login = memo(() => {
  return useObserver(() => {
    const { login } = useUserQuery()
    const { store } = useContext(MobXProviderContext)
    const { notify } = useContext(AppContext)
    const refs = {
      username: useRef(null),
      pass: useRef(null),
    }
    const inputs = useMemo(() => [
      {
        type: TYPE_INPUT.Input,
        field: fields.account,
        label: 'app.pages.login.username.name',
        placeholder: "app.pages.login.username.placeholder",
        keyboardType: 'email-address',
        icon: <LockIcon style={styles.icon} />,
        ref: refs.username,
        autoCompleteType: 'username'
      },
      {
        type: TYPE_INPUT.Input,
        field: fields.password,
        label: 'app.pages.login.pass.name',
        placeholder: "app.pages.login.pass.placeholder",
        keyboardType: 'default',
        secureTextEntry: true,
        icon: <HomeIcon style={styles.icon} />,
        ref: refs.pass,
        autoCompleteType: 'password'
      },
    ], [])

    const { t } = useTranslation()

    const loginHandler = useCallback(async () => {
      try {
        const username = refs.username.current?.value
        const password = refs.pass.current?.value
        let errorUsername = null,
          errorPass = null

        if (!password) {
          errorPass = t('app.pages.login.pass.empty')
          refs.pass.current.setState(p => ({ value: password, error: errorPass }))
        }

        if (!username) {
          errorUsername = t('app.pages.login.username.empty')
          refs.username.current.setState(p => ({ value: username, error: errorUsername }))
        }

        if (!errorUsername && !errorPass) {
          const { data, errors } = await login(username.toLowerCase(), password)
          await notify({
            title: t('app.pages.login.name'),
            message: t('app.pages.login.success'),
            success: true
          })
          await store?.auth?.login(data?.login?.token)
        }
      } catch (err) {
        console.log({ err })
        if (!!err.graphQLErrors) {
          for (const gqlErr of err.graphQLErrors.concat(err.graphQLErrors)) {
            switch (gqlErr.code) {
              case '400':
                refs.username.current?.setState(p => ({ ...p, error: t('app.pages.login.username.notFound') }))
                break;
              case '403':
                notify({
                  title: t('app.common.error.name'),
                  message: t('app.pages.login.errors.isBlocked'),
                  error: true
                })
                break;
              case '402':
                refs.pass.current?.setState(p => ({ ...p, error: t('app.pages.login.pass.incorrect') }))
                break;
              default:
                notify({
                  title: t('app.common.error.name'),
                  message: t(gqlErr.message),
                  error: true
                })
                break;
            }
          }
        } else {
          notify({
            title: t('app.common.error.name'),
            message: t(err.message),
            error: true
          })
        }
      }
    }, [refs, notify])

    return (
      <View
        style={[styles.conatiner]}
      >
        <View
          style={[styles.top, styles.center]}
        >
          <Text
            style={[styles.title]}
          >
            {t('app.pages.login.name')}
          </Text>
        </View>
        <View
          style={[styles.bottom]}
        >
          {Object.values(fields).map((field, idx) => {
            const input = inputs.find(i => i.field === field)
            switch (input.type) {
              case TYPE_INPUT.Input:
                return (
                  <Input
                    ref={input.ref}
                    icon={input.icon}
                    regular
                    wrapperStyle={styles.styleInput}
                    // label={t(input.label)}
                    placeholder={t(input.placeholder)}
                    keyboardType={input.keyboardType}
                    secureTextEntry={input.secureTextEntry}
                    key={idx}
                  />
                )
              default:
                break;
            }
          })}
          <View style={[styles.otherBtn]}>
            <Button
              transparent
              text={t('app.pages.login.forgotPass')}
            />
          </View>
          <Button
            onPress={loginHandler}
            wrapperStyle={styles.btnLogin}
            text={t('app.pages.login.name')}
          />
        </View>
      </View>
    )
  })
})

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  top: {
    flex: 1
  },
  bottom: {
    flex: 2,
    width: "80%",
    alignSelf: 'center'
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  otherBtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  title: {
    fontSize: normalize(36),
    fontWeight: 'bold',
    lineHeight: normalize(42)
  },
  styleInput: {
    marginBottom: normalize(40)
  },
  icon: {
    marginLeft: 5
  },
  btnLogin: {
    marginTop: 40,
    width: '100%'
  }
})

export default Login