import React, { memo, useMemo, useRef, useContext, useCallback, useState } from "react"
import { useObserver, MobXProviderContext } from 'mobx-react'
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { View, Text } from 'native-base'
import { Avatar } from 'react-native-elements'
import { useTranslation } from 'react-i18next'
import debounce from 'lodash.debounce'
import { Actions } from 'react-native-router-flux'

import CameraProfileIcon from '../../assets2/icons/camera-profile.svg'
import { normalize } from '../../../native-base-theme/variables/normalize'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import Input from '../../components/Input'
import DatePicker from '../../components/DatePicker'
import EditRoomIcon from '../../assets2/icons/edit-room.svg'
import { __appConstant } from '../../constants'
import ChangePassword from './components/changePassword'

const { TYPE_INPUT } = __appConstant
const fields = {
  firstname: "Firstname",
  lastname: "Lastname",
  nickname: "Nickname",
  email: "email",
  phonenumber: "phonenumber",
  birthday: "birthday"
}

const Profile = memo(() => {
  return useObserver(() => {
    const refs = {
      firstname: useRef(null),
      lastname: useRef(null),
      nickname: useRef(null),
      email: useRef(null),
      phonenumber: useRef(null),
      birthday: useRef(null)
    }

    const [editing, setEditing] = useState(false)

    const refScrollView = useRef(null)
    const refsDropdown = {
      changePassword: useRef(null)
    }

    const { store } = useContext(MobXProviderContext)

    const inputs = useMemo(() => [
      {
        type: TYPE_INPUT.Input,
        field: fields.firstname,
        label: 'app.pages.profile.firstname.name',
        keyboardType: 'default',
        ref: refs.firstname,
        visible: editing
      },
      {
        type: TYPE_INPUT.Input,
        field: fields.lastname,
        label: 'app.pages.profile.lastname.name',
        keyboardType: 'default',
        ref: refs.lastname,
        visible: editing
      },
      {
        type: TYPE_INPUT.Input,
        field: fields.nickname,
        label: 'app.pages.profile.nickname.name',
        keyboardType: 'email-address',
        ref: refs.nickname,
        visible: editing
      },
      {
        type: TYPE_INPUT.Input,
        field: fields.email,
        label: 'app.pages.profile.email.name',
        keyboardType: 'email-address',
        ref: refs.email,
        autoCompleteType: 'email',
        visible: true
      },
      {
        type: TYPE_INPUT.Input,
        field: fields.phonenumber,
        label: 'app.pages.profile.phonenumber.name',
        keyboardType: 'default',
        ref: refs.phonenumber,
        autoCompleteType: 'tel',
        visible: true
      },
      {
        type: TYPE_INPUT.DatePicker,
        field: fields.birthday,
        label: 'app.pages.profile.birthday.name',
        ref: refs.birthday,
        visible: true
      },
    ], [editing])

    const { t } = useTranslation()

    const toggleEditer = useCallback(() => {
      setEditing(p => !p)
    }, [])

    const toggleDropdown = useCallback(({ contentY, contentHeight, headerHeight }) => {
      refScrollView.current?.scrollTo({ y: (contentY + contentHeight - headerHeight) + (editing ? 300 : 0) }, true)
    }, [refScrollView, refsDropdown.changePassword, editing])

    const gotoAuthorization = useCallback(() => {
      Actions.auth()
    }, [])
    return (
      <View
        style={[styles.container]}
      >
        <View
          style={[styles.top, editing && styles.topEditing]}
        >
          {/* avatars: avatar, edit avatar */}
          <View
            style={[styles.topLeft, editing && styles.topLeftEditing]}
          >
            {editing && (
              <Avatar
                containerStyle={[styles.avatarCamera]}
                rounded
                Component={CameraProfileIcon}
                size={120}
              />
            )}
            <Avatar
              rounded
              size={editing ? 120 : 80}
            />
          </View>
          {/* infomation: fullname, nickname */}
          {!editing && (<View
            style={[styles.topCenter]}
          >
            <Text style={[styles.fullName]}>Owner</Text>
            <Text style={[styles.nickname]}>Lucky luke luke</Text>
          </View>)}
          {/* buttons: save, edit, back */}
          <View
            style={[styles.topRight, styles.center, editing && styles.topRightEditing]}
          >
            {editing && (
              <Button
                transparent
                onPress={toggleEditer}
                text={'<'}
              />
            )}
            {editing
              ? (
                <Button
                  transparent
                  text={t('app.common.save')}
                />
              )
              : (<Button
                transparent
                onPress={toggleEditer}
                left={<EditRoomIcon />}
              />)
            }
          </View>
        </View>
        {/* album */}
        <View
          style={[styles.mid1, styles.dropdownItem, styles.dropdown, styles.btnNext, { marginTop: 0 }]}
        >
          <TouchableOpacity
            style={[styles.btnAlbum]}
          >
            <Text>{t('app.pages.profile.album')}</Text>
            <Text>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={refScrollView}
        >
          {/* input infomation */}
          <View
            style={[styles.mid2]}
          >
            {Object.values(fields).map((field, idx) => {
              const input = inputs.find(i => i.field === field)
              switch (input.type) {
                case TYPE_INPUT.Input:
                  if (!input.visible) {
                    return null
                  }
                  return (
                    <Input
                      disabled={!editing}
                      ref={input.ref}
                      label={t(input.label)}
                      keyboardType={input.keyboardType}
                      key={idx}
                    />
                  )
                case TYPE_INPUT.DatePicker:
                  return (
                    <DatePicker
                      label={t(input.label)}
                    />
                  )
                default:
                  return null
              }
            })}
          </View>
          {/* Change password */}
          <View
            style={[styles.mid1, styles.dropdown]}
          >
            <Dropdown
              icon
              ref={refsDropdown.changePassword}
              onToggle={toggleDropdown}
              invisibleImage={<Text style={{ color: "#000000" }}>{'v'}</Text>}
              visibleImage={<Text style={{ color: "#000000" }}>{'>'}</Text>}
              headerStyle={{ ...styles.dropdownItem, ...styles.mid1 }}
              header={(
                <View>
                  <View
                    style={[styles.btnAlbum, styles.btnPer]}
                  >
                    <Text>{t('app.pages.profile.pass.change')}</Text>
                  </View>
                </View>
              )}
            >
              <ChangePassword />
            </Dropdown>
          </View>
          {/* share permission */}
          <View
            style={[styles.mid1, styles.dropdownItem, styles.dropdown, styles.btnNext]}
          >
            <TouchableOpacity
              onPress={debounce(gotoAuthorization, 300, { leading: true, trailing: false })}
              style={[styles.btnAlbum]}
            >
              <Text>{t('app.pages.profile.permission.share')}</Text>
              <Text>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={[styles.bottom]}
        >
          <Button
            onPress={store?.auth?.logout}
            transparent
            text={t('app.common.signout')}
          />
        </View>
      </View>
    )
  })
})

const styles = StyleSheet.create({
  btnNext: { paddingRight: normalize(20) },
  container: {
    flex: 1
  },
  headerDropdown: {
    height: "100%",
    width: "100%"
  },
  avatarCamera: {
    position: 'absolute',
    zIndex: 1
  },
  top: {
    flexDirection: 'row',
    borderBottomWidth: normalize(2.5),
    borderBottomColor: 'rgba(0, 0, 0, 0.05)'
  },
  topEditing: {
    flexDirection: 'column-reverse'
  },
  topLeftEditing: {
    padding: normalize(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  topLeft: {
    padding: normalize(20)
  },
  topRightEditing: {
    marginRight: 0,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  topRight: {
    marginRight: normalize(20)
  },
  topCenter: {
    flex: 1,
    justifyContent: "center"
  },
  mid2: {
    padding: normalize(10)
  },
  dropdownItem: {
    height: normalize(65)
  },
  mid1: {
    width: "100%",
    backgroundColor: '#fff',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.9,
    shadowRadius: 0,
    elevation: 5,
  },
  dropdown: {
    marginTop: normalize(10),
    marginBottom: normalize(10)
  },
  btnPer: {
    height: "100%"
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'flex-start'

  },
  btnAlbum: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: normalize(10),
    paddingRight: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  fullName: {
    marginBottom: normalize(10)
  },
  nickname: {
    fontWeight: 'bold',
    fontSize: normalize(14)
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Profile