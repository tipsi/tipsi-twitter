#!/bin/bash

sed -i.bak 's@<TWITTER_KEY>@'"$TWITTER_KEY"'@' ./src/Root.js
sed -i.bak 's@<TWITTER_SECRET>@'"$TWITTER_SECRET"'@' ./src/Root.js
rm -rf ./src/Root.js.bak

sed -i.bak 's@<FABRIC_APIKEY>@'"$FABRIC_APIKEY"'@' android/app/src/main/AndroidManifest.xml
rm -rf android/app/src/main/AndroidManifest.xml.bak
