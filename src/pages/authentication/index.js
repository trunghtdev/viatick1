import React, { memo, useCallback, useEffect, useContext } from 'react'
import { useObserver, MobXProviderContext } from 'mobx-react'
import { View, Text } from 'native-base'
import { StyleSheet, BackHandler } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Actions } from 'react-native-router-flux'
// import { LoginManager, AccessToken } from 'react-native-fbsdk'

import Button from '../../components/Button'
import { normalize } from '../../../native-base-theme/variables/normalize'

const Authentication = memo(() => {
  return useObserver(() => {
    const { t } = useTranslation()

    const { store } = useContext(MobXProviderContext)

    const loginWithFB = useCallback(() => {
      /*
        step1. RUN "keytool -list -printcert -jarfile app-debug.apk"
              to get hash key (sha1)
        step2. convert sha1 key to base64
        step3. add key converted to facebook console
      */

      // LoginManager.logInWithPermissions(["public_profile"]).then(
      //   function (result) {
      //     if (result.isCancelled) {
      //       console.log("Login cancelled");
      //     } else {
      //       AccessToken.getCurrentAccessToken().then(
      //         (data) => {
      //           console.log(data.accessToken.toString())
      //         }
      //       )
      //     }
      //   },
      //   function (error) {
      //     console.log("Login fail with error: " + error);
      //   }
      // );
    }, [])

    const usingEmailOrPhone = useCallback(() => {
      Actions.signUp()
    }, [])

    const gotoLogin = useCallback(() => {
      Actions.login()
    }, [])

    const selectServer = useCallback(() => {
      store.connection.setServer(null)
    }, [])

    return (
      <View style={[styles.container]}>
        {/* <Notification /> */}
        <View style={[styles.top]}>
          <Text style={[styles.title]}>
            {t("app.pages.auth.signup")}
          </Text>
        </View>
        <View style={[styles.mid]}>
          <Button
            onPress={loginWithFB}
            wrapperStyle={styles.btnWithFB}
            textStyle={styles.txtBtnWithFB}
            text={t("app.pages.auth.withFacebook")}
          />
          <Button
            bordered
            onPress={usingEmailOrPhone}
            wrapperStyle={styles.btnEmailOrPhone}
            textStyle={styles.txtBtnEmailOrPhone}
            text={t("app.pages.auth.emailOrPhone")}
          />
        </View>
        <View style={[styles.bottom]}>
          <View style={[styles.otherPlatform]}>
            {/* <Button style={styles.btnPlatform} transparent left={<Twitter />} />
            <Button style={styles.btnPlatform} transparent left={<Linkedin />} />
            <Button style={styles.btnPlatform} transparent left={<GooglePlus />} /> */}
          </View>
          <View style={[styles.haveAccount]}>
            <Text>
              {t("app.pages.auth.haveAccount")}
            </Text>
            <Button
              onPress={gotoLogin}
              transparent
              text={t("app.pages.auth.login")}
            />
          </View>
        </View>
      </View>
    )
  })
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: normalize(36),
    fontWeight: 'bold'
  },
  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bottom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mid: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnWithFB: {
  },
  txtBtnWithFB: {
    fontSize: normalize(16),
    marginLeft: "10%",
    marginRight: "10%"
  },
  btnEmailOrPhone: {
    marginTop: normalize(50),
    marginLeft: normalize(20),
    marginRight: normalize(20),
  },
  txtBtnEmailOrPhone: {
    fontSize: normalize(16)
  },
  otherPlatform: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnPlatform: {
    marginLeft: 10,
    marginRight: 10
  },
  haveAccount: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnServer: {
    // width: "100"
  },
  selectServer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center'
  }
})

export default Authentication