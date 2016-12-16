#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    sed -i.bak 's@<TWITTER_KEY>@'"$TWITTER_KEY"'@' index.ios.js
    sed -i.bak 's@<TWITTER_SECRET>@'"$TWITTER_SECRET"'@' index.ios.js
    rm -rf index.ios.js.bak

    /usr/libexec/PlistBuddy -x -c "Set :Fabric:APIKey $FABRIC_APIKEY" ./ios/example/Info.plist
  ;;
  linux)
    sed -i.bak 's@<TWITTER_KEY>@'"$TWITTER_KEY"'@' index.android.js
    sed -i.bak 's@<TWITTER_SECRET>@'"$TWITTER_SECRET"'@' index.android.js
    rm -rf index.android.js.bak
  ;;
esac
