#!/bin/bash

sed -i.bak 's@<TWITTER_KEY>@'"$TWITTER_KEY"'@' android/app/src/main/java/com/example/MainApplication.java
sed -i.bak 's@<TWITTER_SECRET>@'"$TWITTER_SECRET"'@' android/app/src/main/java/com/example/MainApplication.java
rm -rf android/app/src/main/java/com/example/MainApplication.java.bak

/usr/libexec/PlistBuddy -x -c "Set :Fabric:APIKey $FABRIC_APIKEY" ./ios/example/Info.plist
