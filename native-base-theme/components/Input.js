// @flow

import variable from './../variables/platform';
import { fonts } from '../variables/material'

export default (variables /* : * */ = variable) => {
  const inputTheme = {
    '.multiline': {
      height: null
    },
    fontFamily: fonts.sofiaPro,
    height: variables.inputHeightBase,
    color: variables.inputColor,
    paddingLeft: 0,
    paddingRight: 5,
    flex: 1,
    fontSize: variables.inputFontSize
  };

  return inputTheme;
};
