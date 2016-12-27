#!/bin/bash

sed -i.bak 's@<TWITTER_KEY>@'"$TWITTER_KEY"'@' ./src/Root.js
sed -i.bak 's@<TWITTER_SECRET>@'"$TWITTER_SECRET"'@' ./src/Root.js
rm -rf ./src/Root.js.bak

/usr/libexec/PlistBuddy -x -c "Set :Fabric:APIKey $FABRIC_APIKEY" ./ios/example/Info.plist
