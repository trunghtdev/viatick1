import React, { memo, useCallback } from 'react'
import { View, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import { useObserver } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { Actions } from 'react-native-router-flux'

import FooterHomeIcon from '../assets2/icons/footer-home.svg'
import FooterSunIcon from '../assets2/icons/footer-sun.svg'
import FooterUserIcon from '../assets2/icons/footer-user.svg'

import { normalize } from '../../native-base-theme/variables/normalize'
import Button from '../components2/Button'

const Footer = (props) => {
  return useObserver(() => {
    const { t } = useTranslation()
    const gotoSmart = useCallback(() => {
      Actions.smart()
    }, [])
    const gotoHome = useCallback(() => {
      Actions.home()
    }, [])
    const gotoProfile = useCallback(() => {
      Actions.profile()
    }, [])
    return (
      <View
        style={[styles.container]}
      >
        <Button
          transparent
          onPress={gotoHome}
          style={styles.btn}
          wrapperStyle={styles.wrapperBtn}
          left={<FooterHomeIcon style={styles.icon} />}
          bottom={<Text>{t('app.pages.home.name')}</Text>}
        />

        <Button
          transparent
          onPress={gotoSmart}
          style={styles.btn}
          wrapperStyle={styles.wrapperBtn}
          left={<FooterSunIcon style={styles.icon} />}
          bottom={<Text>{t('app.pages.home.smart')}</Text>}
        />

        <Button
          transparent
          onPress={gotoProfile}
          style={styles.btn}
          wrapperStyle={styles.wrapperBtn}
          left={<FooterUserIcon style={styles.icon} />}
          bottom={<Text>{t('app.pages.home.profile')}</Text>}
        />
      </View>
    )
  })
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: normalize(60),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  wrapperBtn: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  btn: {
    borderRadius: 0,
  },
  icon: {
    width: 4,
    height: 4
  }
})

export default Footer