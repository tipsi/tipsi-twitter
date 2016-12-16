#!/bin/bash

sed -i.bak 's@<TWITTER_KEY>@'"$TWITTER_KEY"'@' index.android.js
sed -i.bak 's@<TWITTER_SECRET>@'"$TWITTER_SECRET"'@' index.android.js
rm -rf index.android.js.bak

