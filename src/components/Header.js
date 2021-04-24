import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'native-base'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { normalize } from '../../native-base-theme/variables/normalize'
import { useLocalStore, useObserver } from 'mobx-react'
import { useTranslation } from 'react-i18next'

import Logo from '../assets2/icons/logo.svg'
import Down from '../assets2/icons/down.svg'

function Header() {
  return useObserver(() => {
    // const store = useLocalStore()
    const { t, i18n } = useTranslation()

    const [listLanguage, setListLanguage] = useState([
      { key: 'en', name: 'english' },
      { key: 'vi', name: 'vietnamese' }
    ])

    const [selectedLng, setSelectedLng] = useState(null)

    const menu = useRef()

    const hideMenu = () => menu.current.hide()
    const showMenu = () => menu.current.show()

    const handleSelectLng = useCallback(async (lng) => {
      await hideMenu()
      await setSelectedLng(lng)
      setTimeout(async () => {
        await i18n.changeLanguage(lng.key)
      }, 200)
    }, [])

    useEffect(() => {
      const lng = listLanguage.find(l => l.key === i18n.language)
      setSelectedLng(lng)
    }, [i18n.language])

    return (
      <View style={[styles.container]}>
        <View style={[styles.left]}>
          <Logo style={styles.logo} />
          <View style={[styles.textLogo]}>
            <Text style={[styles.text]}>Logo</Text>
            <Text style={[styles.text]}>SmartHome</Text>
          </View>
        </View>
        <View style={[styles.right]}>
          {/* Menu */}
          <Menu
            ref={menu}
            button={
              <TouchableOpacity
                style={[styles.btnMenu]}
                onPress={() => showMenu()}
              >
                <Text
                  style={[styles.textBtnMenu, styles.text]}
                >
                  {selectedLng
                    ? t(`app.common.lng.${selectedLng.name}`) + ` (${selectedLng.key.toLocaleUpperCase()}) `
                    : null}
                </Text>
                <Down />
              </TouchableOpacity>
            }
          >
            {listLanguage.map(lng => {
              return (
                <>
                  <MenuItem
                    onPress={() => handleSelectLng(lng)}
                    key={lng.key}
                  >
                    {t(`app.common.lng.${lng.name}`) + ` (${lng.key.toLocaleUpperCase()}) `}
                  </MenuItem>
                  <MenuDivider />
                </>
              )
            })}
          </Menu>
        </View>
      </View>
    )
  })
}

const styles = StyleSheet.create({
  container: {
    height: normalize(65),
    width: '100%',
    flexDirection: "row",
    backgroundColor: "#fff",
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 10,
  },
  right: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  left: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: normalize(10),
    flexDirection: "row"
  },
  logo: {
    height: normalize(32.37),
    width: normalize(26)
  },
  text: {
    fontSize: normalize(14),
    color: "rgba(0,0,0,0.5)"
  },
  btnMenu: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: normalize(10)
  },
  textLogo: {
    marginLeft: normalize(10)
  },
  textBtnMenu: {
  }
})

export default Header