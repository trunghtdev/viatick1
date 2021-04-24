module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      },
    ],
    ["module-resolver", {
      extensions: [".js", ".jsx", ".es", ".es6", ".mjs"],
      root: [`./src`]
    }]
  ]
}
