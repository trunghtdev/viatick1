# README

## Project Structure

```text
.
├── __tests__                           # tests script
├── android                             # source android
├── ios                                 # source ios
├── native-base-theme                   # config styles
    ├── components                      # components "native-base"
        ├── ...
    ├── variables                       # variable "native-base"
        ├── commonColor.js
        ├── material.js
        ├── platform.js
├── src                                 # main source
    ├── assets                          
        ├── icons
        ├── images
    ├── components
        ├── ...
        ├── index.js
    ├── configs                         # configs i18n, routers
        ├── i18n
        ├── router
        ├── index.js
    ├── constants                       # constants vars
        ├── index.js
    ├── pages                           # screens
        ├── ...
    ├── query                           # queries handlers
        ├── ...
        ├── index.js
    ├── styles                          # main styles
        ├── ...
    ├── tools                           # orther tools: apollo, authen, ble
        ├── apollo
        ├── authen
        ├── ble
        ├── index.js
    ├── utils                           
        ├── hooks
        ├── performTimeConsumingTask
        ├── validations
        ├── index.js
├── .buckconfig
├── .eslintrc.js
├── .flowconfig
├── .gitattributes
├── .gitignore
├── .prettierrc.js
├── .watchmanconfig
├── App.js
├── app.js
├── babel.config.js
├── index.html
├── index.js
├── jsconfig.json
├── metro.config.js
├── package.json
├── react-native.config.js
├── require.js
├── shim.js

```

## Scripts

- Pre-commit checking included.

### Development

- Run android

```bash
npm run android
```

- Run ios

```bash
npm run ios
```

- Normal start

```bash
npm start
```

### Build APK

-  Generate a keystore

```bash
keytool -genkey -v -keystore emn.keystore -alias emn -keyalg RSA -keysize 2048 -validity 10000
```

*Enter your keystore password: password123*

*Re-enter new password: password123*

*What is your first and last name? [unknown]: Dani Williams*

*What is the name of your organizational unit? [unknown]: Sample Company*

*What is the name of your organization? [unknown]: Sample*

*What is the name of your city or Locality? [unknown]: XYZ*

*What is the name of your State or Province? [unknown]: ABC*

*What is the two-letter country code for this unit? [unknown]: XX*



-  Adding Keystore to your project: copy the file emn.keystore and paste it under the **android/app** directory in your React Native project folder.

-  Release APK Generation
   
```bash
cd android
```

**Windows**
```bash
gradlew assembleRelease
```

**Linux**
```bash
./gradlew assembleRelease
```