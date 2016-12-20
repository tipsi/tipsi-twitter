#!/bin/bash

set -e

isIOS() {
  [ "$(uname)" == "Darwin" ]
}

###################
# BEFORE INSTALL  #
###################

# Check is OSX
! isIOS && echo "Current os is not OSX, setup for iOS will be skipped"
# Go to example project
cd example
# Remove module dependency
#rm -rf node_modules/tipsi-twitter

# Check secure Twitter environment variables
[ -z "$TWITTER_KEY" ] && echo "Need to set TWITTER_KEY" && exit 1;
[ -z "$TWITTER_SECRET" ] && echo "Need to set TWITTER_SECRET" && exit 1;
[ -z "$TWITTER_PASS" ] && echo "Need to set TWITTER_PASS" && exit 1;
[ -z "$TWITTER_USER" ] && echo "Need to set TWITTER_USER" && exit 1;


###################
# INSTALL         #
###################

# Install dependencies
npm install

###################
# BEFORE BUILD    #
###################

# Run appium
appiumPID=$(ps -A | grep -v grep | grep appium | awk '{print $1}')
if [ -z $appiumPID ]; then
  npm run appium > /dev/null 2>&1 &
else
  echo "appium is already running, restart appium"
  kill -9 $appiumPID
  npm run appium > /dev/null 2>&1 &
fi

###################
# BUILD           #
###################

# Configure Twitter variables
npm run configure
# Build Android app
npm run build:android
# Build iOS app
#isIOS && npm run build:ios

###################
# TESTS           #
###################

# Run Android e2e tests
npm run test:android
# Run iOS e2e tests
#if isIOS
#  then npm run test:ios
#fi
