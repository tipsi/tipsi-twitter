#!/bin/bash

sed -i.bak 's@<TWITTER_KEY>@'"$TWITTER_KEY"'@' ./src/Root.js
sed -i.bak 's@<TWITTER_SECRET>@'"$TWITTER_SECRET"'@' ./src/Root.js
rm -rf ./src/Root.js.bak

/usr/libexec/PlistBuddy -c "Add :Fabric dict" ./ios/example/Info.plist
/usr/libexec/PlistBuddy -c "Add :Fabric:APIKey string" ./ios/example/Info.plist
/usr/libexec/PlistBuddy -c "Add :Fabric:Kits array" ./ios/example/Info.plist
/usr/libexec/PlistBuddy -c "Add :Fabric:Kits: dict" ./ios/example/Info.plist
/usr/libexec/PlistBuddy -c "Add :Fabric:Kits:0:KitName string Twitter" ./ios/example/Info.plist
/usr/libexec/PlistBuddy -c "Add :Fabric:Kits:0:KitInfo dict" ./ios/example/Info.plist

/usr/libexec/PlistBuddy -x -c "Set :Fabric:APIKey $FABRIC_APIKEY" ./ios/example/Info.plist
