package com.gettipsi.reactnativetwittersdk;


import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by dmitriy on 12/9/16
 */

public class TwitterReactPackage implements ReactPackage {

  private final String twitter_key;
  private final String twitter_secret;

  public TwitterReactPackage(final String twitter_key, final String twitter_secret) {
    this.twitter_key = twitter_key;
    this.twitter_secret = twitter_secret;
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return Arrays.<NativeModule>asList(new TwitterLoginManagerModule(reactContext));
  }

  @Override
  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(new TwitterLoginButtonManager(reactContext, twitter_key, twitter_secret));
  }
}
