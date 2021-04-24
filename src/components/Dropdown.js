/* eslint-disable react/require-default-props */
import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback, useRef } from 'react'

import {
  View,
  InteractionManager,
  Animated,
  StyleSheet,
  ViewPropTypes
} from 'react-native'
import PropTypes from 'prop-types'

import Button from './Button'

Dropdown.propTypes = {
  backgroundColor: PropTypes.string,
  titleBackground: PropTypes.string,
  contentBackground: PropTypes.string,
  underlineColor: PropTypes.string,
  onToggle: PropTypes.func,
  headerStyle: ViewPropTypes.style
}

function Dropdown(propsReceived, ref) {
  const props = {
    backgroundColor: 'transparent',
    titleBackground: 'transparent',
    contentBackground: 'transparent',
    underlineColor: '#d3d3d3',
    visibleImage: false,
    invisibleImage: false,
    ...propsReceived,
  }

  const [visible, setVisible] = useState(false)

  const [animated, setAnimated] = useState()

  const [state, setState] = useState({
    isMounted: false,
    headerheight: 0,
    contentHeight: 0,
    headerHeight: 5,
    contentX: 0,
    contentY: 0,
  })

  const toggle = useCallback(async () => {
    await setVisible(p => !p)
    props.onToggle && props.onToggle(state)
  }, [props.onToggle, state])

  useImperativeHandle(ref, () => ({
    toggle,
    visible
  }), [toggle, visible])

  useEffect(() => {
    setAnimated(
      new Animated.Value(
        visible
          ? state.headerHeight + state.contentHeight
          : state.headerHeight,
      ),
    )
  }, [
    props.alwaysOpen,
    state.contentHeight,
    visible,
    state.headerHeight,
  ])

  const runAnimation = () => {
    let initialValue = visible
      ? state.headerHeight + state.contentHeight
      : state.headerHeight
    let finalValue = visible
      ? state.headerHeight
      : state.contentHeight + state.headerHeight

    if (props.alwaysOpen) {
      finalValue = state.headerHeight + state.contentHeight
      initialValue = state.headerHeight + state.contentHeight
    }
    toggle()
    animated.setValue(initialValue)
    Animated.spring(animated, {
      toValue: finalValue,
      useNativeDriver: false,
    }).start()
  }

  const onAnimLayout = evt => {
    const headerHeight = evt.nativeEvent.layout.height
    if (!state.isMounted && !visible) {
      setAnimated(new Animated.Value(headerHeight + state.contentHeight))
      setState(prev => ({
        ...prev,
        isMounted: true,
        headerHeight,
      }))
      return
    } else if (!state.isMounted) {
      InteractionManager.runAfterInteractions(() => {
        setAnimated(new Animated.Value(headerHeight + state.contentHeight))
      })
    }
    setState(prev => ({ ...prev, headerHeight, isMounted: true }))
  }

  const onLayout = evt => {
    const { height: contentHeight, x: contentX, y: contentY } = evt.nativeEvent.layout
    console.log({ contentHeight })
    setState(prev => ({ ...prev, contentHeight, contentX, contentY }))
  }

  const onPressOpenListHouse = () => {
    runAnimation()
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: animated,
          backgroundColor: props.backgroundColor,
        },
        props.style,
      ]}>
      <View activeOpacity={0.5}>
        <View
          style={[
            {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            },
            props.headerStyle
          ]}
          onLayout={onAnimLayout}
        >
          {props.header}
          <View style={[styles.dropdown, { zIndex: 1 }]}>

            {props.left}
            {props.icon && (
              <Button
                transparent
                disabled={props.alwaysOpen}
                onPress={onPressOpenListHouse}
                left={visible || props.alwaysOpen
                  ? props.invisibleImage
                  : props.visibleImage}
              />
            )}
          </View>
        </View>
      </View>
      <View onLayout={onLayout} style={[styles.contentChild]}>
        {props.children}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  icons: {
    height: '100%',
  },
  dropdown: {
    position: 'absolute',
    right: 16,
    display: 'flex',
    flexDirection: 'row'
  },
  underline: {
    width: '100%',
    height: 1,
    position: 'absolute',
    top: 0,
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentChild: {
    // marginLeft: 10,
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  contentTxt: {
    color: 'black',
    marginLeft: 8,
    fontSize: 12,
  },
  contentFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 12,
  },
})

const CustomDropdown = forwardRef(Dropdown)

export default CustomDropdown
