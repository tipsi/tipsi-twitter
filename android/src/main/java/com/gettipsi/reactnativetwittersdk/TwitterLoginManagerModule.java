package com.gettipsi.reactnativetwittersdk;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.twitter.sdk.android.Twitter;
import com.twitter.sdk.android.core.TwitterAuthConfig;

import io.fabric.sdk.android.Fabric;

/**
 * This is a {@link NativeModule} that allows JS to use LoginManager of Facebook Android SDK.
 */
public class TwitterLoginManagerModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;
  private ReadableMap currentData;

  public TwitterLoginManagerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    if(currentData != null){
      initTwitter(currentData);
      currentData = null;
    }
  }

  //
  @Override
  public String getName() {
    return "TwitterLoginModule";
  }

  @ReactMethod
  public void init(final ReadableMap map) {
    if(reactContext == null || getCurrentActivity() == null){
      currentData = map;
    } else {
      initTwitter(map);
    }
  }

  private void initTwitter(final ReadableMap map){
    TwitterAuthConfig authConfig = new TwitterAuthConfig(map.getString("twitter_key"), map.getString("twitter_secret"));
    Fabric.with(getCurrentActivity(), new Twitter(authConfig));
  }
}
