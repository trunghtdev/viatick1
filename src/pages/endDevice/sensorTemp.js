import React, { memo, useEffect, useState, useCallback, useContext, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import Menu, { MenuItem } from 'react-native-material-menu';
import { LineChart } from 'react-native-chart-kit'
import { MobXProviderContext, useObserver } from 'mobx-react'
import { TouchableOpacity, Text, ScrollView, BackHandler } from 'react-native';
import Orientation from 'react-native-orientation-locker'
import useDimensions from 'react-native-use-dimensions';

import { useDeviceQuery } from '../../queries-hooks/useDeviceQuery'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import DeleteDeviceContent from './components/deleteContent'
import UpdateDeviceContent from './components/updateContent'

const SensorWater = memo(() => {
  return useObserver(() => {
    const { screen: { height: heightScreen } } = useDimensions()
    const refModalUpdate = useRef(null)
    const refModalDelete = useRef(null)
    const { store } = useContext(MobXProviderContext)
    const [attribute, setAttribute] = useState({ code: "Attribute Name", name: "Attribute Name" })

    const [dataRender] = useState([0])


    const chartConfig = {
      backgroundGradientFrom: "#ffffff",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#ffffff",
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    }
    const data = {
      datasets: [
        {
          data: dataRender,
          // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: [attribute.name] // optional
    }
    const menu = useRef();
    const hideMenu = () => menu.current.hide();
    const showMenu = () => menu.current.show();

    useEffect(() => {
      Orientation.lockToLandscape()
      return () => {
        Orientation.lockToPortrait()
      }
    }, [])

    useEffect(() => {
      const onBackHandler = () => {
        Orientation.lockToPortrait()
      }
      BackHandler.addEventListener('hardwareBackPress', onBackHandler)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackHandler)
      }
    }, [])

    return (
      <ScrollView alwaysBounceVertical>
        <View style={[styles.container]}>
          {/* <View style={[styles.container]}> */}
          {/* delete */}
          <Modal
            transparent
            containerStyle={styles.modal}
            ref={refModalDelete}
          >
            <DeleteDeviceContent
              toggle={refModalDelete.current?.toggle}
            />
          </Modal>
          {/* update */}
          <Modal
            transparent
            containerStyle={styles.modal}
            ref={refModalUpdate}
          >
            <UpdateDeviceContent
              toggle={refModalUpdate.current?.toggle}
            />
          </Modal>
          <View style={[styles.left]}>
            <View style={[styles.dateWrapper]}>
              <Text>Name: {store?.global?.device?.name}</Text>
              <Text>Model: {store?.global?.model?.name}</Text>
              <Text>Mac: {store?.global?.model?.mac}</Text>
            </View>
            <View style={[styles.dateWrapper]}>
              <Button onPress={refModalUpdate.current?.toggle} text="Update" wrapperStyle={styles.btnAction} />
              <Button onPress={refModalDelete.current?.toggle} text="Delete" wrapperStyle={styles.btnAction} style={styles.btnDelete} />
            </View>
          </View>
          <View style={[styles.right]}>
            <View style={[styles.actions]}>
              <Menu
                ref={menu}
                button={(
                  <TouchableOpacity style={[styles.btn]} onPress={() => showMenu()}>
                    <Text>{attribute.name}</Text>
                  </TouchableOpacity>
                )}
              >
                {store?.objects?.attributes?.map((attr, idx) => {
                  return (
                    <MenuItem key={idx} onPress={() => {
                      hideMenu()
                      setAttribute(attr)
                    }}>
                      {attr?.name}
                    </MenuItem>
                  )
                })}
              </Menu>
            </View>
            <View style={[styles.wrapperChart]} >
              <LineChart
                withDots={false}
                withInnerLines={false}
                // withOuterLines={false}
                withVerticalLabels={false}
                data={data}
                width={heightScreen - 80}
                height={300}
                chartConfig={chartConfig}
                bezier
              />
            </View>
          </View>
          {/* </View> */}
        </View>
      </ScrollView>
    )
  })
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  left: {
    flex: 1,
    flexDirection: 'row'
  },
  right: {
    flex: 1.5
  },
  date: {
    flex: 1
  },
  dateWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  dateText: {
    width: 50
  },
  actions: {
    flexDirection: "row-reverse"
  },
  btn: {
    padding: 10,
    paddingLeft: 0
  },
  btnAction: {
    margin: 5,
  },
  btnDelete: {
    backgroundColor: 'red'
  },
  wrapperChart: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    alignContent: 'center'
  }
})

export default SensorWater