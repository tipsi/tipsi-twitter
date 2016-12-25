#!/bin/bash

fabric_key=$1
path_to_info_plist_file="../example/ios/example/Info.plist"

if [[ -n "$fabric_key" ]]; then
	/usr/libexec/PlistBuddy -x -c "Set :Fabric:APIKey $fabric_key" "$path_to_info_plist_file"
	the_updated_crashlytics_api_key=`/usr/libexec/PlistBuddy -c "Print :Fabric:APIKey" "$path_to_info_plist_file"`
	echo "Fabric API Key set to: $the_updated_crashlytics_api_key"
else
  echo "missing api key"
fi
