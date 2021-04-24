module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "jest": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "airbnb",
    '@react-native-community'
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "experimentalDecorators": true
    },
    "ecmaVersion": 10,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
    "eslint-plugin-react-hooks"
  ],
  "rules": {
    "semi": [2, "never", {
      "beforeStatementContinuationChars": "never"
    }],
    "import/no-extraneous-dependencies": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "jsx-quotes": "off",
    "comma-dangle": "off",
    "no-console": "off",
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "import/no-unresolved": "off",
    "quotes": "off",
    "no-unused-vars": "off",
    "consistent-return": "off",
    "arrow-body-style": "off",
    "no-extra-boolean-cast": "off",
    "react/no-array-index-key": "off",
    "no-unused-expressions": "off",
    "react/jsx-props-no-spreading": "off",
    "no-trailing-spaces": "off",
    "no-nested-ternary": "off",
    "no-useless-catch": "off",
    "max-len": [2, {
      "code": 150,
      "tabWidth": 2,
      "comments": 350
    }],
    "object-curly-newline": "off",
    "jsx-a11y/tabindex-no-positive": "off",
    "no-return-assign": "off",
    "arrow-parens": "off",
    "no-restricted-syntax": "off",
    "lines-between-class-members": "off",
    "no-useless-constructor": "off",
    "no-underscore-dangle": "off",
    "react/no-unused-state": "off",
    "space-before-function-paren": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "max-lines": [2, {
      "max": 350,
      "skipComments": true
    }]
  }
}
