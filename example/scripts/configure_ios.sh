#!/bin/bash

sed -i.bak 's@<TWITTER_KEY>@'"$TWITTER_KEY"'@' ./src/Root.js
sed -i.bak 's@<TWITTER_SECRET>@'"$TWITTER_SECRET"'@' ./src/Root.js
rm -rf ./src/Root.js.bak

/usr/libexec/PlistBuddy -x -c "Set :CFBundleURLTypes:0:CFBundleURLSchemes:0 twitterkit-$TWITTER_KEY" ./ios/example/Info.plist
