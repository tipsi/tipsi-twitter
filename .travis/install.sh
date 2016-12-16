#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    cd example
    npm install
    pod install --project-directory=ios
  ;;
  linux)
    rm -rf node_modules
    npm install
    cd example
    rm -rf example/node_modules
    npm install
  ;;
esac
