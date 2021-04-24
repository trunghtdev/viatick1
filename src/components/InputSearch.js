import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { useObserver } from 'mobx-react'
import { View, Text } from 'native-base'
import { StyleSheet, TextInput } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'

import Button from './Button'
import { normalize } from '../../native-base-theme/variables/normalize'

function InputSearchSMH({ data: dataReceived }, ref) {
  return useObserver(() => {
    const [itemSelected, setItemSelected] = useState(null)
    const [txtSearch, setTxtSearch] = useState("")
    const [data, setData] = useState([])

    const searching = useCallback(async (txt) => {
      await setTxtSearch(txt)
      await setData(d => {
        let searchStr = txt.toLowerCase()
          .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
          .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
          .replace(/ì|í|ị|ỉ|ĩ/g, "i")
          .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
          .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
          .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
          .replace(/đ/g, "d")
          .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "")
          .replace(/\u02C6|\u0306|\u031B/g, "")
        return dataReceived.filter(d1 => d1.title.toLowerCase().search(searchStr) > -1)
      })
    }, [dataReceived])

    const selectItem = useCallback((item) => {
      setItemSelected(item)
    }, [])

    useEffect(() => {
      setData(dataReceived || [])
    }, [dataReceived])

    useImperativeHandle(ref, () => ({
      itemSelected
    }), [itemSelected])

    return (
      <View
        style={[styles.container]}
      >
        <Autocomplete
          data={data}
          inputContainerStyle={{ borderWidth: 0, borderRadius: 0 }}
          renderTextInput={(propsNext) => {
            delete propsNext.style
            return (
              <TextInput
                {...propsNext}
                style={[styles.input]}
              />
            )
          }}
          hideResults={!txtSearch}
          placeholder={"Select available devices"}
          onChangeText={searching}
          listStyle={styles.listStyle}
          listContainerStyle={styles.listContainerStyle}
          renderItem={({ index, item }) => {
            return (
              <Button
                transparent
                style={styles.item}
                textStyle={styles.itemTxt}
                wrapperStyle={styles.itemContainer}
                text={item.title}
              />
            )
          }}
        />
      </View>
    )
  })
}

const styles = StyleSheet.create({
  input: {
    borderRadius: normalize(10),
    borderWidth: normalize(2.5),
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    height: normalize(40),
    // paddingLeft: 3
  },
  container: {
    flex: 1,
    zIndex: 1
  },
  item: {
    alignItems: 'flex-start'
  },
  itemTxt: {
    color: '#000000'
  },
  itemContainer: {
    // width: "100%",
    height: normalize(40),
    justifyContent: "center",
    paddingLeft: normalize(10)
  },
  listContainerStyle: {
    // width: '100%',
    borderWidth: normalize(2.5),
    borderRadius: normalize(10),
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    top: normalize(3)
  },
  listStyle: {
    borderWidth: normalize(0),
    borderRadius: normalize(10),
    padding: 0,
    margin: 0
  }
})

const CustomInputSeachSMH = forwardRef(InputSearchSMH)

export default CustomInputSeachSMH