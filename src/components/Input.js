import React, { useCallback, useState, useImperativeHandle, forwardRef, memo } from 'react'
import { Input, Item, View, Label, Icon } from 'native-base'
import PropTypes from 'prop-types'
import { ViewPropTypes, StyleSheet } from 'react-native'
import { Text } from 'native-base'
import { normalize } from '../../native-base-theme/variables/normalize'
import { useTranslation } from 'react-i18next'

InputSMH.propTypes = {
  regular: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  wrapperStyle: ViewPropTypes.style,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChangeText: PropTypes.func,
  validator: PropTypes.func,
  icon: PropTypes.element,
  bottom: PropTypes.element,
  keyboardType: PropTypes.oneOf([
    // KeyboardType
    'default',
    'email-address',
    'numeric',
    'phone-pad',
    'number-pad',
    'decimal-pad',
    // KeyboardTypeIOS
    'ascii-capable',
    'numbers-and-punctuation',
    'url',
    'name-phone-pad',
    'twitter',
    'web-search',
    // KeyboardTypeAndroid
    'visible-password'
  ]),
}

InputSMH.defaultProps = {
  regular: false,
  secureTextEntry: false,
  wrapperStyle: null,
  placeholder: "",
  label: "",
  icon: null,
  onChangeText: null,
  validator: null,
  keyboardType: "default",
}

InputSMH.displayName = 'InputSMH'

function InputSMH({ regular, icon, secureTextEntry, disabled, onChangeText, wrapperStyle, placeholder, label, bottom, autoCompleteType, validator, keyboardType, style }, ref) {
  const [state, setState] = useState({
    value: "",
    error: false
  })
  const { t } = useTranslation()
  const onChangeTextCustom = useCallback((txt) => {
    if (!!validator) {
      const { valid, message } = validator(txt)
      if (!valid) {
        setState({ value: txt, error: message })
        return
      }
    }
    onChangeText && onChangeText(txt)
    setState({ value: txt })
  }, [onChangeText])

  useImperativeHandle(ref, () => ({
    value: state.value,
    error: state.error,
    setState: setState
  }), [state])

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <Item
        disabled={!!disabled}
        stackedLabel={!!label}
        style={[styles.item, bottom && styles.hasBottom, style]}
        regular={!!regular}
        error={!!state.error}
      >
        {!!label && (<Label style={[styles.label]}>{label}</Label>)}
        {!!icon && (icon)}
        <Input
          disabled={!!disabled}
          onChangeText={onChangeTextCustom}
          placeholder={placeholder}
          placeholderTextColor="rgba(0, 0, 0, 0.3)"
          returnKeyType="next"
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          secureTextEntry={!!secureTextEntry}
        />
      </Item>
      {!!state.error && (<Text style={[styles.txtError]}>{t(state.error)}</Text>)}
      {bottom}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {

  },
  hasBottom: {
    marginBottom: normalize(10)
  },
  label: {
    fontSize: normalize(13),
    color: '#C4C4C4'
  },
  item: {
    width: '100%'
  },
  txtError: {
    color: '#E51616',
    marginLeft: normalize(10)
  },
  icon: {
    width: 5,
    height: 5
  }
})

const CustomInputSMH = forwardRef(InputSMH)

export default CustomInputSMH