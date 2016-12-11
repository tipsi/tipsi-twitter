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

  public TwitterLoginManagerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "TwitterLoginModule";
  }

  @ReactMethod
  public void init(final ReadableMap map) {
    TwitterAuthConfig authConfig = new TwitterAuthConfig(map.getString("TWITTER_KEY"), map.getString("TWITTER_SECRET"));
    Fabric.with(reactContext.getCurrentActivity(), new Twitter(authConfig));
  }
}
