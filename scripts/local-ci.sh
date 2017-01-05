#!/bin/bash

set -e

if [[ $@ == *"--skip-new"* ]]; then
  skip_new=true
else
  skip_new=false
fi

if [[ $@ == *"--use-old"* ]]; then
  use_old=true
else
  use_old=false
fi

proj_dir_old=example
proj_dir_new=example_tmp

react_native_version=$(cat $proj_dir_old/package.json | sed -n 's/"react-native": "\(\^|~\)*\(.*\)",*/\2/p')
library_name=$(node -p "require('./package.json').name")

files_to_copy=(
  .appiumhelperrc
  package.json
  index.{ios,android}.js
  android/app/build.gradle
  android/app/src/main/AndroidManifest.xml
  ios/example/Info.plist
  src
  scripts
  __tests__
)

isMacOS() {
  [ "$(uname)" == "Darwin" ]
}

###################
# BEFORE INSTALL  #
###################

# Check secure Twitter environment variables
[ -z "$TWITTER_KEY" ] && echo "Need to set TWITTER_KEY" && exit 1;
[ -z "$TWITTER_SECRET" ] && echo "Need to set TWITTER_SECRET" && exit 1;
[ -z "$TWITTER_PASS" ] && echo "Need to set TWITTER_PASS" && exit 1;
[ -z "$TWITTER_USER" ] && echo "Need to set TWITTER_USER" && exit 1;
# Skip iOS step if current os is not macOS
! isMacOS && echo "Current os is not macOS, setup for iOS will be skipped"
# Install react-native-cli if not exist
if ! type react-native > /dev/null; then
  npm install -g react-native-cli
fi

if ($skip_new && ! $use_old); then
  echo "Creating new example project skipped"
  # Go to new test project
  cd $proj_dir_new
elif (! $skip_new && ! $use_old); then
  echo "Creating new example project"
  # Remove old test project and tmp dir if exist
  rm -rf $proj_dir_new tmp
  # Init new test project in tmp directory
  mkdir tmp
  cd tmp
  react-native init $proj_dir_old --version $react_native_version
  # Remove __tests__ folder to avoid conflicts
  rm -rf $proj_dir_old/__tests__
  # Move new project from tmp dir and remove tmp dir
  cd ..
  mv tmp/$proj_dir_old $proj_dir_new
  rm -rf tmp
  # Copy necessary files from example project
  for i in ${files_to_copy[@]}; do
    if [ -e $proj_dir_old/$i ]; then
      cp -Rp $proj_dir_old/$i $proj_dir_new/$i
    fi
  done
  # Go to new test project
  cd $proj_dir_new
else
  echo "Using example folder for tests"
  # Go to old test project
  cd $proj_dir_old
fi

###################
# INSTALL         #
###################

# Install dependencies
npm install
# Link project
react-native unlink $library_name
react-native link

###################
# BEFORE BUILD    #
###################

# Run appium
appiumPID=$(ps -A | grep -v grep | grep appium | awk '{print $1}')
(pkill -9 -f appium || true)
npm run appium > /dev/null 2>&1 &

###################
# BUILD           #
###################

# Configure Twitter variables (android)
npm run configure:android
# Build Android app
npm run build:android

if isMacOS; then
  # Configure Twitter variables (iOS)
  npm run configure:ios
  # Build iOS app
  npm run build:ios
fi

###################
# TESTS           #
###################

# Run Android e2e tests
npm run test:android
# Run iOS e2e tests
if isMacOS; then
  npm run test:ios
fi
