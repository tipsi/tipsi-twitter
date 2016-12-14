package com.gettipsi.reactnativetwittersdk;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.twitter.sdk.android.Twitter;
import com.twitter.sdk.android.core.TwitterAuthConfig;

import io.fabric.sdk.android.Fabric;

import android.util.Log;

/**
 * This is a {@link NativeModule} that allows JS to use LoginManager of Facebook Android SDK.
 */
public class TwitterLoginManagerModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

  private final ReactApplicationContext reactContext;
  private ReadableMap currentData;

  public TwitterLoginManagerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    reactContext.addLifecycleEventListener(this);
    Log.d("TwitterLoginModule", "constructor");
    Log.v("TwitterLoginModule", "constructor: reactContext:" + Boolean.toString(reactContext == null));
    Log.v("TwitterLoginModule", "constructor: getCurrentActivity:" + Boolean.toString(getCurrentActivity() == null));
  }

  //
  @Override
  public String getName() {
    return "TwitterLoginModule";
  }

  @ReactMethod
  public void init(final ReadableMap map) {
    Log.d("TwitterLoginModule", "init");
    Log.v("TwitterLoginModule", "init: reactContext:" + Boolean.toString(reactContext == null));
    Log.v("TwitterLoginModule", "init: getCurrentActivity:" + Boolean.toString(getCurrentActivity() == null));
    if(getCurrentActivity() == null){
      currentData = map;
    } else {
      initTwitter(map);
    }
  }

  @Override
  public void onHostResume() {
    Log.d("TwitterLoginModule", "onHostResume");
    Log.v("TwitterLoginModule", "onHostResume: reactContext:" + Boolean.toString(reactContext == null));
    Log.v("TwitterLoginModule", "onHostResume: getCurrentActivity:" + Boolean.toString(getCurrentActivity() == null));
    if(currentData != null){
      initTwitter(currentData);
    }
  }

  @Override
  public void onHostPause() {
  }

  @Override
  public void onHostDestroy() {
  }

  private void initTwitter(final ReadableMap map){
    TwitterAuthConfig authConfig = new TwitterAuthConfig(map.getString("twitter_key"), map.getString("twitter_secret"));
    Fabric.with(getCurrentActivity(), new Twitter(authConfig));
  }
}
