#!/bin/bash
MODULE_NAME="tipsi-twitter"
cp -rf example/node_modules/$MODULE_NAME/{ios,src} ./
cp -rf example/node_modules/$MODULE_NAME/android/{src,build.gradle} ./android
