import React, { useCallback } from 'react'
import { View, Button, Text } from 'native-base'
import { StyleSheet, ViewPropTypes, TextPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'

ButtonSMH.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  wrapperStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  textStyle: PropTypes.any,
  bordered: PropTypes.bool,
  transparent: PropTypes.bool,
  left: PropTypes.element,
  right: PropTypes.element,
  top: PropTypes.element,
  bottom: PropTypes.element
}

function ButtonSMH(props) {
  const onPress = useCallback(() => {
    return props.onPress && props.onPress()
  }, [props.onPress])
  return (
    <View
      style={[styles.container, props.wrapperStyle]}
    >
      {props.top}
      <Button
        rounded
        primary
        vertical
        bordered={!!props.bordered}
        transparent={!!props.transparent}
        disabled={props.disabled}
        style={[styles.btn, props.style]}
        onPress={debounce(onPress, 300, { leading: true, trailing: false })}
      >
        {props.left}
        {props.text && (
          <Text
            numberOfLines={1}
            style={[props.textStyle]}
            uppercase={false}
          >
            {props.text}
          </Text>
        )}
        {props.right}
      </Button>
      {props.bottom}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
})

export default ButtonSMH