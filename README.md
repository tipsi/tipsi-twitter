# tipsi-twitter

[![build status](https://img.shields.io/travis/tipsi/tipsi-twitter/master.svg?style=flat-square)](https://travis-ci.org/tipsi/tipsi-twitter)

React Native component for auth with twitter

## Requirements

### iOS

* Xcode 8+
* iOS 8.0+
* [CocoaPods](https://cocoapods.org) 1.1.1+

### Android

* Minimum SDK 16

## Installation

Run `npm install --save tipsi-twitter` to add the package to your app's dependencies.

### iOS

#### react-native cli

Run `react-native link tipsi-twitter` so your project is linked against your Xcode project and all CocoaPods dependencies are installed.

#### CocoaPods

1. Setup your `Podfile` like the included [example/ios/Podfile](example/ios/Podfile) then run `pod install`.
2. Open your project in Xcode workspace.
3. Drag the following folder into your project:
  * `node_modules/tipsi-twitter/ios/TPSTwitterModule/`

#### Manual

1. Open your project in Xcode, right click on Libraries and click `Add Files to "Your Project Name"`.
2. Look under `node_modules/tipsi-twitter/ios` and add `TPSTwitterModule.xcodeproj`.
3. Add `libTPSTwitterModule.a` to `Build Phases` -> `Link Binary With Libraries`.
4. Click on `TPSTwitterModule.xcodeproj` in Libraries and go the Build Settings tab. Double click the text to the right of `Header Search Paths` and verify that it has `$(SRCROOT)/../../react-native/React` as well as `${SRCROOT}/../../../ios/Pods/Headers/Public` - if they aren't, then add them. This is so Xcode is able to find the headers that the `TPSTwitterModule` source files are referring to by pointing to the header files installed within the `react-native` `node_modules` directory.
5. Whenever you want to use it within React code now you can:
  * `import TwitterAuth from 'tipsi-twitter'`

### Android

#### react-native cli

Run react-native link tipsi-twitter so your project is linked against your Android project

#### Manual

1. In your app build.gradle add:
```gradle
...
dependencies {
 ...
 compile project(':tipsi-twitter')
 compile "com.facebook.react:react-native:+"  // From node_modules
}
```
2. In your settings.gradle add:
```gradle
...
include ':tipsi-twitter'
project(':tipsi-twitter').projectDir = new File(rootProject.projectDir, '../node_modules/tipsi-twitter/android')
```

3. In your AndroidManifest.xml add:
```xml
    <application
    ...
        <meta-data
            android:name="io.fabric.ApiKey"
            android:value="YOUR_FABRIC_API_KEY" />
    </application>
```

## Usage

```js
import React, { Component } from 'react'
import { View, Button } from 'react-native'
import TwitterAuth from 'tipsi-twitter'

TwitterAuth.init({
  twitter_key: '<TWITTER_KEY>',
  twitter_secret: '<TWITTER_SECRET>',
})

class TwitterLogin extends Component {
  handleTwitterLoginFinished = async () => {
    try {
      const result = await TwitterAuth.login()
      console.log('User id:', result.userId)
    } catch (error) {
      console.log('Login error:', error)
    }
  }

  render() {
    return (
      <View>
        <Button
          title="Twitter Login Button"
          onPress={this.handleTwitterLoginFinished}
        />
      </View>
    )
  }
}
```

### Result

A `result` object will be returned after successful Twitter auth.

An object with the following keys:

* `authToken` _String_ - Twitter token for auth in your app.
* `authTokenSecret` _String_ - Twitter secret for auth in your app.
* `userID` _String_ - Twitter user id.
* `userName` _String_ - Twitter user name.

## Tests

#### Local CI

To run `example` app e2e tests for all platforms you can use `npm run ci` command. Before running this command you need to specify `TWITTER_KEY`, `TWITTER_SECRET` and `TWITTER_EMAIL`, `TWITTER_USER`, `TWITTER_PASS` environment variables:

```bash
TWITTER_KEY=<...> TWITTER_SECRET=<...> TWITTER_EMAIL=<...> TWITTER_USER=<...> TWITTER_PASS=<...> npm run ci
```

#### Manual

1. Go to example folder `cd example`
2. Install CocoaPods dependencies (iOS only) `pod install --project-directory=ios`
3. Install npm dependencies `npm install`
4. Configure project before build `TWITTER_KEY=<...> TWITTER_SECRET=<...> npm run configure`
5. Build project:
  * `npm run build:ios` - for iOS
  * `npm run build:android` - for Android
  * `npm run build` - for both iOS and Android
6. Open Appium in other tab `npm run appium`
7. Run tests:
  * `TWITTER_EMAIL=<...> TWITTER_USER=<...> TWITTER_PASS=<...> npm run test:ios` - for iOS
  * `TWITTER_EMAIL=<...> TWITTER_USER=<...> TWITTER_PASS=<...> npm run test:android` - for Android
  * `TWITTER_EMAIL=<...> TWITTER_USER=<...> TWITTER_PASS=<...> npm run test` - for both iOS and Android

#### Troubleshooting

You might encounter the following error while trying to run tests:

`An unknown server-side error occurred while processing the command. Original error: Command \'/bin/bash Scripts/bootstrap.sh -d\' exited with code 1`

This can be fixed by installing `Carthage`:

```bash
brew install carthage
```

## Example

To see more of the `tipsi-twitter` in action, check out the source at [example](https://github.com/tipsi/tipsi-twitter/tree/master/example) folder.

## License

tipsi-twitter is available under the MIT license. See the [LICENSE](https://github.com/tipsi/tipsi-twitter/tree/master/LICENSE) file for more info.
