#!/bin/bash
MODULE_NAME=$(node -p "require('./package.json').name")
cp -rf example/node_modules/$MODULE_NAME/{ios,src} ./
cp -rf example/node_modules/$MODULE_NAME/android/{src,build.gradle} ./android
