#!/bin/bash

sed -i.bak 's@<TWITTER_KEY>@'"$TWITTER_KEY"'@' index.android.js
sed -i.bak 's@<TWITTER_SECRET>@'"$TWITTER_SECRET"'@' index.android.js
rm -rf index.android.js.bak

sed -i.bak 's@<FABRIC_APIKEY>@'"$FABRIC_APIKEY"'@' android/app/src/main/AndroidManifest.xml
rm -rf android/app/src/main/AndroidManifest.xml.bak

