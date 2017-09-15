#!/bin/bash

cd example_tmp

case "${TRAVIS_OS_NAME}" in
  osx)
    npm run configure:ios
    set -o pipefail && npm run build:ios | xcpretty -c -f `xcpretty-travis-formatter`
    npm run test:ios
    npm run test:ios -- --device-name "iPad Air"
  ;;
  linux)
    npm run configure:android
    npm run build:android
    npm run test:android
  ;;
esac
